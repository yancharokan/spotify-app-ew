import React from "react";
import { CSVLink } from "react-csv";
import { TextAlignCenter } from "grommet-icons";

const ExportCSV = ({ csvData, fileName }) => {
  return (
    <CSVLink
      separator=";"
      style={{ align: TextAlignCenter, color: "white" }}
      data={csvData}
      filename={fileName}
    >
      CSV
    </CSVLink>
  );
};
export default ExportCSV;
