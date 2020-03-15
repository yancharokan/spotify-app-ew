import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { Grid } from "grommet";
import { makeStyles } from "@material-ui/styles";
import { toaster } from "evergreen-ui";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ExportCSV from "../Coreography/ExportCSV/ExportCSV";
import socketIo from "socket.io-client";
import Papa from "papaparse";
import gotCSV from "../../got.csv";
import * as d3 from "d3";
import CorDraw from "../Coreography/CorDraw";
import { Typography, CardHeader, Card, CardContent } from "@material-ui/core";
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
      finishTime: null,
      seconds: [],
      socket: null,
      data: []
    };
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
    this.state.socket = socketIo.connect("http://0.0.0.0:8080/");
    this.state.socket.on("my_response", data => { });
  }

  fetchCsv() {
    return fetch(require("../../got.csv")).then(function (response) {
      let reader = response.body.getReader();
      let decoder = new TextDecoder("utf-8");

      return reader.read().then(function (result) {
        return decoder.decode(result.value);
      });
    });
  }

  getData = result => {
    this.setState({ data: result.data });
  };

  async getCsvData() {
    let csvData = await this.fetchCsv();

    Papa.parse(csvData, {
      complete: this.getData
    });
  }
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
          "L": element.smokePump,
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



  // onPressCSV = () => {
  //   d3.csv(gotCSV).then(function(d, error) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log(typeof d);
  //     }
  //   });
  //   const dataForExcel = [];
  //   let idCardBase64 = "";
  //   if (this.props.csvData.length !== 0) {
  //     this.props.csvData.forEach(element => {
  //       console.log(element.startDate);
  //       dataForExcel.push({
  //         "Şarkı Süresi": this.milisToMinutesAndSeconds(
  //           this.props.durationStamps
  //         ),
  //         "Başlama Zamanı": element.startDate,
  //         "Bitiş Zamanı": element.endDate,
  //         "Sağ Robot Hızı": element.rRobotsSpeed
  //       });
  //     });

  //     this.setState({
  //       excelData: dataForExcel
  //     });
  //     this.state.socket.emit(
  //       "csv_is_comming",
  //       // d3.csv(gotCSV).then(function(d, error) {
  //       //   if (error) {
  //       //     console.log(error);
  //       //   } else {
  //       //     console.log(typeof d);
  //       //   }
  //       // })
  //       this.getBase64(gotCSV, result => {
  //         idCardBase64 = result;
  //       })
  //     );
  //   }

  //   //  else {
  //   //   toaster.danger(this.state.platformMessage.errorMessage);
  //   // }
  // };

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
    let timeOfSum = this.milisToMinutesAndSeconds(this.props.durationStamps);
    let currentTime = this.milisToMinutesAndSeconds(this.props.position_stamp);
    if (!timeOfSum) {
      toaster.danger("Lütfen Spotify Uygulamasından EW uygulamasını seçiniz.");
    }
    // const createTable = lap => {
    //   let table = [];
    //   for (let i = 0; i <= lap; i++) {
    //     table.push(
    //       <Tab plain={true} title={"" + i + "-"}>
    //         <Grid
    //           areas={[
    //             { name: "oan", start: [1, 1], end: [1, 1] },
    //             { name: "onceki", start: [0, 1], end: [0, 1] },
    //             { name: "sonraki", start: [2, 1], end: [2, 1] }
    //           ]}
    //           columns={["1/3", "1/3", "1/3"]}
    //           rows={["", "auto"]}
    //           gap="small"
    //         >
    //           <Box
    //             gridArea="oan"
    //             background="brand"
    //             margin="medium"
    //             pad="medium"
    //           >
    //             <Coreography></Coreography>
    //           </Box>
    //           <Box
    //             gridArea="onceki"
    //             background="brand"
    //             margin="medium"
    //             pad="medium"
    //           >
    //             <Text>{i - 1}</Text>
    //           </Box>
    //           <Box
    //             gridArea="sonraki"
    //             background="brand"
    //             margin="medium"
    //             pad="medium"
    //           >
    //             <Text>{i + 1}</Text>
    //           </Box>
    //         </Grid>
    //       </Tab>
    //     );
    //   }
    //   return table;
    // };

    // if (timeOfSum) {
    //   maincost = (
    //     <Grommet theme={grommet} full>
    //       <Box fill={true}>
    //         <Tabs
    //           flex
    //           alignSelf="center"
    //           background="brand"
    //           activeIndex={currentTime}
    //           onActive={i =>
    //             this.props.selectGoTime(
    //               "e",
    //               (1 - (timeOfSum - i) / timeOfSum) * 100
    //             )
    //           }
    //           onClick={this.secondsTable}
    //         >
    //           {createTable(timeOfSum)}
    //         </Tabs>
    //       </Box>
    //     </Grommet>
    //   );
    // }
    // console.log(this.state.endTime);
    // console.log(this.state.startTime);
    return (
      <Grid container spacing={2}>
        {timeOfSum && (
          <Grid >
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
          </Grid>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    position_stamp: state.position_stamp,
    durationStamps: state.durationStamps,
    currently_playing: state.currently_playing,
    csvData: state.csvData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setPositionStamp: position_stamp =>
      dispatch({ type: actionTypes.NOW_POSITION_STAMP, position_stamp })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
