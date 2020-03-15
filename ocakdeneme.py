# from mutagen.mp3 import MP3
import pandas as pd
import numpy as np
from datetime import timedelta
from pandas.util.testing import rands
from datetime import timedelta
import datetime
import time
import RPi.GPIO as GPIO
from time import sleep
import Adafruit_PCA9685
import os
import sys
import termios
import tty
import pigpio
from _thread import start_new_thread
import board
import busio
import adafruit_pca9685
i2c = busio.I2C(board.SCL, board.SDA)
hat = adafruit_pca9685.PCA9685(i2c)
hat.frequency = 60
led_channe0 = hat.channels[4]
led_channe1 = hat.channels[5]
led_channe2 = hat.channels[6]
led_channe3 = hat.channels[7]
led_channe4 = hat.channels[8]
led_channe5 = hat.channels[9]
led_channe12 = hat.channels[12]
led_channe13 = hat.channels[13]


GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(18, GPIO.OUT)
GPIO.setup(17, GPIO.OUT)
RED_PIN = 4
GREEN_PIN = 22
BLUE_PIN = 27
STEPS = 1

pwm = Adafruit_PCA9685.PCA9685()
bright = 255
r = 255.0
g = 0.0
b = 0.0
brightChanged = False
abort = False
state = True
pi = pigpio.pi()
print(pi.connected)


def set_servo_pulse(channel, pulse):
    pulse_length = 1000000    # 1,000,000 us per second
    pulse_length //= 60       # 60 Hz
    print('{0}us per period'.format(pulse_length))
    pulse_length //= 4096     # 12 bits of resolution
    print('{0}us per bit'.format(pulse_length))
    pulse *= 1000
    pulse //= pulse_length
    pwm.set_pwm(channel, 0, pulse)


def setLights(pin, brightness):
    realBrightness = int(int(brightness) * (float(bright) / 255.0))
    pi.set_PWM_dutycycle(pin, realBrightness)


def getCh():
    fd = sys.stdin.fileno()
    old_settings = termios.tcgetattr(fd)

    try:
        tty.setraw(fd)
        ch = sys.stdin.read(1)
    finally:
        termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)

    return ch


pwm.set_pwm_freq(60)

tumsure = 100

sarki_suresi = datetime.timedelta(seconds=tumsure)
sure = pd.timedelta_range(start='0 s', end=sarki_suresi, freq='01s')
sure = pd.DataFrame(dict(A=sure))
uzunluk = sure.__len__()
servo_aci_kon = pd.DataFrame(np.random.randint(
    200, 600, size=(uzunluk, 4)), columns=list("BCDE"))
rgbled = pd.DataFrame(np.random.randint(
    0, 65535, size=(uzunluk, 6)), columns=list('FGHIJK'))
flash = pd.DataFrame(np.random.randint(
    0, 10, size=(uzunluk, 1)), columns=list('U'))
datamp3 = pd.concat([sure, servo_aci_kon, rgbled, flash], axis=1)
nowTrackTime = datetime.datetime.now() + sarki_suresi
# datamp3.to_csv('randomm')


def calmaBaslat(gelencsv, sarki_suresi):
    trackTime = timedelta(seconds=sarki_suresi)
    nowTrackTime = datetime.datetime.now() + trackTime
    i = 0
    print('çalma başladı')
    datamp3 = pd.read_json(gelencsv)


# print(datamp3)
# print(trackTime.microseconds)
# print(nowTrackTime.microsecond)
    while sarki_suresi > i:
        initialTrackSeconds = datamp3.A[i]
        firstSecond = pd.to_timedelta(datamp3.A[i], unit='s')
        secondSeconds = pd.to_timedelta(datamp3.A[i+1], unit='s')
        print(firstSecond)
        kalan_sure = nowTrackTime - datetime.datetime.now()
        sure = trackTime - kalan_sure
        fixBlinkTime = secondSeconds - firstSecond
        blink = datamp3.K[i]
        led1 = datamp3.D[i]
        print("if kontrol")
        print(initialTrackSeconds)
        print(sure.seconds)
        print("sure.seconds: ", sure.seconds)
        print("initialTrackSeconds: ", initialTrackSeconds)
        if sure.seconds == initialTrackSeconds:
            print("datamp3.A[i]", datamp3.A[i])
            pwm.set_pwm(1, 0, int(datamp3.C[i]))
            print(datamp3.B[i])
            pwm.set_pwm(0, 0, int(datamp3.B[i]))
            print(datamp3.C[i])
            pwm.set_pwm(2, 0, int(datamp3.D[i]))
            pwm.set_pwm(3, 0, int(datamp3.E[i]))
            led_channe0 . duty_cycle = int(datamp3.F[i])
            led_channe1 . duty_cycle = int(datamp3.G[i])
            led_channe2 . duty_cycle = int(datamp3.H[i])
            led_channe3 . duty_cycle = int(datamp3.I[i])
            led_channe4 . duty_cycle = int(datamp3.J[i])
            led_channe5 . duty_cycle = int(datamp3.K[i])
            led_channe12 . duty_cycle = int(datamp3.L[i])
            led_channe13 . duty_cycle = int(datamp3.M[i])
            if(datamp3.L[i] == 1):
                print('ısıtıcı çalıştı')
                GPIO.output(18, GPIO.HIGH)
            else:
                GPIO.output(18, GPIO.LOW)
            if(datamp3.M[i] == 1):
                print('pompa çalıştı')
                GPIO.output(17, GPIO.HIGH)
            else:
                GPIO.output(17, GPIO.LOW)
            print("blink: ", blink)
            line = 1
            if (int(blink) > 0):
                blinkTime = blink+2
                fixBlinkTime = (1/blinkTime)
                while blinkTime >= line:
                    print("led kapat")
                    led_channe0 . duty_cycle = 0
                    led_channe1 . duty_cycle = 0
                    led_channe2 . duty_cycle = 0
                    led_channe3 . duty_cycle = 0
                    led_channe4 . duty_cycle = 0
                    led_channe5 . duty_cycle = 0
                    print("fixBlinktime: ", fixBlinkTime)
                    sleep(fixBlinkTime)
                    print("led ac")
                    led_channe0 . duty_cycle = int(datamp3.F[i])
                    led_channe1 . duty_cycle = int(datamp3.G[i])
                    led_channe2 . duty_cycle = int(datamp3.H[i])
                    led_channe3 . duty_cycle = int(datamp3.I[i])
                    led_channe4 . duty_cycle = int(datamp3.J[i])
                    led_channe5 . duty_cycle = int(datamp3.K[i])
                    sleep(fixBlinkTime)
                    line = line+1
                print("led kapat")
                sleep(1/2)
                blink = 0
            elif (int(blink) == 0):
                print("sure.microseconds: ", sure.microseconds)
                print("kalan_sure.microseconds: ", kalan_sure.microseconds)
                print("uyuma:", (kalan_sure.microseconds - sure.microseconds)/1000000)
                sleep((kalan_sure.microseconds - sure.microseconds)/1000000)
            i = i+1
            print("sure.microseconds: ", sure.seconds)
            print("initialTrackSeconds: ", initialTrackSeconds)
        elif sure.seconds < initialTrackSeconds:
            i = i
            print(i)
            print("data biraz ileride")
            sleep(0.001)
        elif (int(sure.seconds) > int(initialTrackSeconds)):
            if(int(blink) > 0):
                print("blink var")
                print(i)
                i = i+1
            else:
                i = int(i+((kalan_sure.microseconds - sure.microseconds)/1000000))
            print(sure.seconds)
            print("data biraz geride")
            sleep(0.001)

    print("gecmıs olsun")
    time.sleep(0.5)
