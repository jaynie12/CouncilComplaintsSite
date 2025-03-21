import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import CaseForm from "./caseForm";
import BarChartComponent from "./caseCountChart";
import CaseAnalysisForm from "./analysisByFilter";
import DataAnalysisPage from "./caseStatusChart";
import { Table } from "./Table";
import CustomButton from "./staffHomePage";
import LoginFormik from "./staffLogin";

class App extends Component {
  render() {
    return (
      <div>
        <h1>View and Manage cases</h1>
        <LoginFormik/>
      </div>
    );
  }
}

export default App;