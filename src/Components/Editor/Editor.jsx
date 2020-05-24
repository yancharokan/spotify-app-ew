import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { Grid } from "grommet";
import { makeStyles } from "@material-ui/styles";
import { toaster } from "evergreen-ui";
import Button from "@material-ui/core/Button";
import axios from "axios"
import TextField from '@material-ui/core/TextField';
import Icon from "@material-ui/core/Icon";
import ExportCSV from "../Coreography/ExportCSV/ExportCSV";
import socketIo from "socket.io-client";
import CorDraw from "../Coreography/CorDraw";
import Box from "@material-ui/core/Box";
import { Typography, CardHeader, Card, CardContent, CardActions } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "Koreografi.csv",
      excelData: [],
      initialTime: null,
      goCoreography: false,
      finishTime: null,
      seconds: [],
      socket: null,
      data: [],
      onCloseEveryThing: [
        {
          rRobotsSpeed1: 40,
          rRobotsSpeed2: 40,
          lRobotsSpeed1: 40,
          lRobotsSpeed2: 40,
          rColor1: "0",
          rColor2: "0",
          rColor3: "0",
          lColor1: "0",
          lColor2: "0",
          lColor3: "0",
          blinker: 0,
          smokeHeater: 0,
          smoke: 0
        }
      ],
    };
  }
  onClickAddOdaName = () => {
    let userData = {
      email: this.props.user.email,
      odaName: this.odaName
    };
    axios({
      url: "http://localhost:5000/odaIdentify",
      method: "POST",
      data: userData
    }).then(response => {
      console.log("response: ", response.data.odaName)
      if (response.data.odaName) {
        this.setState({ goCoreography: true })
      }
    });
  }
  addOdaName(e) {
    this.odaName = e.target.value;
  }
  changeStart(e) {
    this.setState({
      initialTime: e.target.value
    });
  }
  changeEnd(e) {
    this.setState({
      finishTime: e.target.value
    });
  }
  componentDidMount() {
    var connectionStrings = {
      "force new connection": true,
      "reconnectionAttempts": "Infiniy",
      "timeout": 10000,
      "transports": ["websocket"]
    };
    var socketio_url = 'http://localhost:5000'
    this.odaName = { name: "Corlu" }
    this.state.socket = socketIo.connect(socketio_url, connectionStrings);
    this.state.socket.emit("Odaya Katıl", this.odaName);
  }

  getData = result => {
    this.setState({ data: result.data });
  };
  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }
  onCsvExcel = () => {
    const dataForExcel = [];
    if (this.props.csvData.length !== 0) {
      this.props.csvData.forEach(element => {
        dataForExcel.push({
          "A": element.startDate,
          "B": element.rRobotsSpeed1,
          "C": element.rRobotsSpeed2,
          "D": element.lRobotsSpeed1,
          "E": element.lRobotsSpeed2,
          "F": element.rColor1,
          "G": element.rColor2,
          "H": element.rColor3,
          "I": element.lColor2,
          "J": element.lColor3,
          "K": element.blinker,
          "L": element.smokeHeater,
          "M": element.smoke,
        });
      });
      // dataForExcel.push({
      //   "Şarkı Süresi": this.milisToMinutesAndSeconds(
      //     this.props.durationStamps
      //   ),
      //   "Çalan Şarkı İsmi": this.props.currently_playing
      // });
      this.setState({
        excelData: dataForExcel
      });
    }
    let stringCSV = JSON.stringify(this.state.excelData);
    const encodedString = { "base": new Buffer(stringCSV).toString('base64'), "time": this.milisToMinutesAndSeconds(this.props.durationStamps) }
    this.state.socket.emit(
      "csv_is_comming",
      encodedString
    );
    console.log(encodedString)
  };
  onCloseEveryComponent = () => {
    console.log(this.props.csvData)
    this.props.csvData.forEach(element => {
      return element.startDate = 0,
        element.rRobotsSpeed1 = 40,
        element.rRobotsSpeed2 = 40,
        element.lRobotsSpeed1 = 40,
        element.lRobotsSpeed2 = 40,
        element.rColor1 = "0",
        element.rColor2 = "0",
        element.rColor3 = "0",
        element.lColor2 = "0",
        element.lColor3 = "0",
        element.blinker = 0,
        element.smokeHeater = 0,
        element.smoke = 0
    })
    console.log(this.state.csvData)
  }

  milisToMinutesAndSeconds = mil => {
    let minutes = Math.floor(mil / 60000);
    let seconds = ((mil % 60000) / 1000).toFixed(0);
    let secondsOfSum = Math.floor(Number(minutes) * 60 + Number(seconds));
    return secondsOfSum;
  };

  secondsTable = () => {
    let timeOfSum = this.milisToMinutesAndSeconds(this.props.durationStamps);
    let tableSec = [];
    for (let i = 0; i <= timeOfSum; i++) {
      tableSec.push(i);
    }
    this.setState({ seconds: tableSec });
  };

  render() {
    console.log(this.state.goCoreography)
    let timeOfSum = this.milisToMinutesAndSeconds(this.props.durationStamps);
    let currentTime = this.milisToMinutesAndSeconds(this.props.position_stamp);
    if (!timeOfSum) {
      toaster.danger("Lütfen Spotify Uygulamasından EW uygulamasını seçiniz.");
    }
    return (
      <Grid container>
        {this.state.goCoreography === false &&
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <Card>
              <CardHeader>
                <Typography variant="h5"> Cihazınıza isim veriniz.</Typography>
              </CardHeader>
              <CardContent>
                <TextField onChange={e => this.addOdaName(e)}
                  id="standard-search"
                  label="Cihazınıza isim veriniz."
                  type="search" />
              </CardContent>
              <CardActions style={{ justifyContent: 'flex-end' }}>
                <Button onClick={this.onClickAddOdaName} variant="contained" color="primary">
                  Kaydet
                </Button>
              </CardActions>
            </Card>
          </Box>
        }
        {this.state.goCoreography && timeOfSum &&
          <div>
            <Grid item lg={3} md={12} xl={9} xs={12}>
              <Card style={{ textAlign: "center" }}>
                <Typography center variant="h5">
                  Şarkı süresi {timeOfSum} saniye
                  </Typography>
              </Card>
            </Grid>
            <Grid item lg={3} md={12} xl={9} xs={12}>
              <CorDraw />
            </Grid>
            <Button
              className={useStyles.button}
              variant="contained"
              color="primary"
              onClick={this.onCsvExcel}
            >
              HİSSET
            </Button>
            <Button
              className={useStyles.button}
              variant="contained"
              color="primary"
              onClick={this.onCloseEveryComponent}
            >
              KAPAT
              </Button>
            <div style={{ textAlign: "right" }}>
              <Button
                className={useStyles.button}
                variant="contained"
                color="primary"
                endIcon={<Icon>Yolla</Icon>}
              >
                <ExportCSV
                  csvData={this.state.excelData}
                  fileName={this.state.fileName}
                />
              </Button>
            </div>
          </div>
        }
      </Grid>
    );
  }
}



const mapStateToProps = state => {
  return {
    position_stamp: state.position_stamp,
    durationStamps: state.durationStamps,
    currently_playing: state.currently_playing,
    csvData: state.csvData,
    user: state.current_user,
    onCloseCsvData: state.onCloseCsvData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setPositionStamp: position_stamp =>
      dispatch({ type: actionTypes.NOW_POSITION_STAMP, position_stamp }),
    setOnCloseCsvData: onCloseCsvData =>
      dispatch({ type: actionTypes.ON_CLOSE_CSV_DATA, onCloseCsvData }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
