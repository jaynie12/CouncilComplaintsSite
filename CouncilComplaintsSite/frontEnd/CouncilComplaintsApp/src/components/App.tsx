import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import CaseForm from "./caseForm";
import BarChartComponent from "./caseCountChart";
import CaseAnalysisForm from "./analysisByFilter";
import DataAnalysisPage from "./caseStatusChart";
import { Table } from "./Table";
import CustomButton from "./staffHomePage";
import LoginFormik from "./staffLogin";

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <h1>View and Manage cases</h1>
//         <LoginFormik/>
//       </div>
//     );
//   }
// }

// export default App;


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Chalkstone Council</h1>

        {/* Routes */}
        <Routes>
          <Route path="/raise-issue" element={<CaseForm />} />
          <Route path="/staff-home" element={<LoginFormik />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
