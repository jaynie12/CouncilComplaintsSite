import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CaseForm from "./components/caseForm";


class App extends Component {
  render() {
    return (
      <div>
        <CaseForm />
      </div>
    );
  }
}

export default App;