import React, { forwardRef, Component } from "react";
import * as actionTypes from "../../../store/actions/actionTypes";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
class CorDraw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      corData: [
        {
          startDate: 1,
          lRobotsSpeed1: 200,
          lRobotsSpeed2: 200,
          rRobotsSpeed1: 200,
          rRobotsSpeed2: 200,
          rColor1: "65534",
          rColor2: "0",
          rColor3: "0",
          lColor1: "0",
          lColor2: "0",
          lColor3: "0",
          // smoke: 1,
          blinker: 5
        },
        {
          startDate: 2,
          lRobotsSpeed1: 200,
          lRobotsSpeed2: 200,
          rRobotsSpeed1: 200,
          rRobotsSpeed2: 200,
          rColor1: "0",
          rColor2: "0",
          rColor3: "0",
          lColor1: "0",
          lColor2: "6000",
          lColor3: "0",
          // smoke: 1,
          blinker: 5
        },
        {
          startDate: 3,
          lRobotsSpeed1: 200,
          lRobotsSpeed2: 200,
          rRobotsSpeed1: 200,
          rRobotsSpeed2: 200,
          rColor1: "0",
          rColor2: "0",
          rColor3: "0",
          lColor1: "0",
          lColor2: "6000",
          lColor3: "0",
          // smoke: 1,
          blinker: 5
        },
        {
          startDate: 4,
          lRobotsSpeed1: 200,
          lRobotsSpeed2: 200,
          rRobotsSpeed1: 200,
          rRobotsSpeed2: 200,
          rColor1: "0",
          rColor2: "0",
          rColor3: "0",
          lColor1: "0",
          lColor2: "6000",
          lColor3: "0",
          // smoke: 1,
          blinker: 5
        },
        {
          startDate: 5,
          lRobotsSpeed1: 200,
          lRobotsSpeed2: 200,
          rRobotsSpeed1: 200,
          rRobotsSpeed2: 200,
          rColor1: "0",
          rColor2: "0",
          rColor3: "0",
          lColor1: "0",
          lColor2: "0",
          lColor3: "0",
          // smoke: 1,
          blinker: 5
        }

      ],
      columns: [
        { title: "Başlangıç", field: "startDate", type: "numeric" },
        { title: "Sağ Üst Hareket", field: "rRobotsSpeed1", type: "numeric" },
        { title: "Sağ Alt Hareket", field: "rRobotsSpeed2", type: "numeric" },
        { title: "Sol Üst Hareket", field: "lRobotsSpeed1", type: "numeric" },
        { title: "Sol Alt Hareket", field: "lRobotsSpeed2", type: "numeric" },
        {
          title: "Sağ Robot Kırmızı",
          field: "rColor1",
          lookup: { "65534": "Aktif", "0": "Pasif" }

        },
        {
          title: "Sağ Robot Yeşil",
          field: "rColor2",
          lookup: { "65534": "Aktif", "0": "Pasif" }

        },
        {
          title: "Sağ Robot Mavi",
          field: "rColor3",
          lookup: { "65534": "Aktif", "0": "Pasif" }

        },
        {
          title: "Sol Robot Kırmızı",
          field: "lColor1",
          lookup: { "65534": "Aktif", "0": "Pasif" }

        },
        {
          title: "Sol Robot Yeşil",
          field: "lColor2",
          lookup: { "65534": "Aktif", "0": "Pasif" }

        },
        {
          title: "Sol Robot Mavi",
          field: "lColor3",
          lookup: { "65534": "Aktif", "0": "Pasif" }

        },
        {
          title: "Flaşör",
          field: "blinker",
          type: "numeric"
        },
        {
          title: "Sis Isıtıcı",
          field: "smokeHeater",
          lookup: { 1: "Aktif", 0: "Pasif" }
        },
        {
          title: "Sis",
          field: "smoke",
          lookup: { 1: "Aktif", 0: "Pasif" }
        },
      ]
    };
  }
  onCsvData = () => { };
  milisToMinutesAndSeconds = mil => {
    let minutes = Math.floor(mil / 60000);
    let seconds = ((mil % 60000) / 1000).toFixed(0);
    let secondsOfSum = Math.floor(Number(minutes) * 60 + Number(seconds));
    return secondsOfSum;
  };

  componentDidMount() {
    let corDataArray = [];
    let timeOfSum = this.milisToMinutesAndSeconds(this.props.durationStamps);
    for (let i = 0; i < timeOfSum; i++) {
      corDataArray.push({
        startDate: i,
        rRobotsSpeed1: 300,
        rRobotsSpeed2: 300,
        lRobotsSpeed1: 40,
        lRobotsSpeed2: 500,
        rColor1: "65534",
        rColor2: "65534",
        rColor3: "65534",
        lColor1: "0",
        lColor2: "0",
        lColor3: "0",
        blinker: 0,
        smokeHeater: 1,
        smoke: 0
      }
      )
    }
    // corDataArray.push({
    //   startDate: timeOfSum,
    //   rRobotsSpeed1: 40,
    //   rRobotsSpeed2: 300,
    //   lRobotsSpeed1: 500,
    //   lRobotsSpeed2: 590,
    //   rColor1: "0",
    //   rColor2: "0",
    //   rColor3: "0",
    //   lColor1: "0",
    //   lColor2: "0",
    //   lColor3: "0",
    //   blinker: 0,
    //   smokeHeater: "65534",
    //   smoke: "65534"
    // })
    console.log(corDataArray)
    this.setState({ data: corDataArray })
  }


  render() {
    this.props.setCsvData(this.state.data);
    console.log(this.state.data)
    return (
      <MaterialTable
        icons={tableIcons}
        title="Koregrafini Oluştur"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                this.setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  this.setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                this.setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { prevState, data };
                });
              }, 600);
            })
        }}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    durationStamps: state.durationStamps,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCsvData: csvData => dispatch({ type: actionTypes.CSV_DATA, csvData })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CorDraw);
