import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { Box, Tab, Tabs, Text, Grommet, Grid } from "grommet";
import Coreography from "../Coreography/Coreography";
import { makeStyles } from "@material-ui/styles";
import { grommet } from "grommet/themes";
import TextField from "@material-ui/core/TextField";
import { toaster } from "evergreen-ui";
import { Typography, CardHeader, Card, CardContent } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: []
    };
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
    let timeOfSum = this.milisToMinutesAndSeconds(this.props.durationStamps);
    let currentTime = this.milisToMinutesAndSeconds(this.props.pozition_stamp);
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
    console.log(timeOfSum);
    return (
      <div>
        <Grid container spacing={4}>
          {timeOfSum && (
            <Grid item lg={12} md={6} xl={3} xs={12}>
              <Grid item lg={3} md={12} xl={9} xs={12}>
                <TextField
                  id="outlined-number"
                  label="Başlangıç"
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                  variant="outlined"
                />
              

              <Grid item lg={3} md={12} xl={9} xs={12}>
                <Typography>Şarkı süresi {timeOfSum} saniye</Typography>
              </Grid>

              <Grid item lg={3} md={12} xl={9} xs={12}>
                <TextField
                  id="outlined-number"
                  label="Bitiş"
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              </Grid>
              <Coreography />
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pozition_stamp: state.pozition_stamp,
    durationStamps: state.durationStamps
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setPozitionStamp: pozition_stamp =>
      dispatch({ type: actionTypes.NOW_POZITION_STAMP, pozition_stamp })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
