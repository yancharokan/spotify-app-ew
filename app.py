import asyncio

from aiohttp import web
import sys
import socketio
import pandas as pd
import ocakdeneme
import base64

sio = socketio.AsyncServer(async_mode='aiohttp',cors_allowed_origins="*")
app = web.Application()

sio.attach(app)


async def background_task():
    """Example of how to send server generated events to clients."""
    count = 0
    while True:
        await sio.sleep(10)
        count += 1
        await sio.emit('my_response', {'data': 'Server generated event'})


async def index(request):
    with open('app.html') as f:
        return web.Response(text=f.read(), content_type='text/html')


@sio.event
async def my_event(asd, message):
    print("mesaj",message)
    await sio.emit('my_response', {'data': message['data']})


@sio.event
async def csv_is_comming(asd,in1):
    print("csv is commig")
    print(in1["base"])
    asd = base64.b64decode(in1["base"])
    #p rint(pd.read_csv(in1))
    ocakdeneme.calmaBaslat(asd,in1["time"])
    await sio.emit('my_response', in1)


@sio.event
async def connect(sid, environ):
    print("gönüllerin efendisi hoşgelmiş")
    await sio.emit('my_response', {'data': 'Connected', 'count': 0}, room=sid)


@sio.event
def disconnect(sid):
    print('Client disconnected')


app.router.add_get('/', index)


if __name__ == '__main__':
    sio.start_background_task(background_task)

    web.run_app(app)

