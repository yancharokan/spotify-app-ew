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
import { Button } from "@material-ui/core";

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
      data: [
        {
          startDate: 1,
          endDate: 10,
          lRobotsSpeed: 39,
          rRobotsSpeed: 59,
          rColor: "#CD5C5C",
          lColor: "#00FF00",
          smoke: 1,
          blinker: 0
        },
        {
          startDate: 10,
          endDate: 50,
          lRobotsSpeed: 12,
          rRobotsSpeed: 59,
          rColor: "#00FFFF",
          lColor: "#00FF00",
          smoke: 1,
          blinker: 0
        }
      ],
      columns: [
        { title: "Başlangıç", field: "startDate", type: "numeric" },
        { title: "Bitiş", field: "endDate", type: "numeric" },
        {
          title: "Sol Işık Robotu Hızı",
          field: "lRobotsSpeed",
          type: "numeric"
        },
        {
          title: "Sağ Işık Robotu Hızı",
          field: "rRobotsSpeed",
          type: "numeric"
        },
        {
          title: "Sağ Robot Renk",
          field: "rColor",
          lookup: {
            "#CD5C5C": "turuncu",
            "#FF0000": "kırmızı",
            "#FFFF00": "sarı",
            "#00FFFF": "turkuaz",
            "#00FF00": "lime"
          }
        },
        {
          title: "Sol Robot Renk",
          field: "lColor",
          lookup: {
            "#CD5C5C": "turuncu",
            "#FF0000": "kırmızı",
            "#FFFF00": "sarı",
            "#00FFFF": "turkuaz",
            "#00FF00": "lime"
          }
        },
        {
          title: "Sis",
          field: "smoke",
          lookup: { 1: "Aktif", 0: "Pasif" }
        },
        {
          title: "Flaşör",
          field: "blinker",
          lookup: { 1: "Aktif", 0: "Pasif" }
        }
      ]
    };
  }
  onCsvData = () => {};

  render() {
    this.props.setCsvData(this.state.data);

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
const mapDispatchToProps = dispatch => {
  return {
    setCsvData: csvData => dispatch({ type: actionTypes.CSV_DATA, csvData })
  };
};
export default connect(null, mapDispatchToProps)(CorDraw);
