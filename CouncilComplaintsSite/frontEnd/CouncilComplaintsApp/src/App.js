import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AddCaseForm from './components/AddCaseForm';

import AddTodoForm from './components/AddTodoForm';


const App = () => {

  return (

    <Router>

      <Switch>

        <Route exact path="/case-list" component={CasesList} />

        <Route path="/add-case" component={AddTodoForm} />

        {/* Add more routes as needed */}

      </Switch>

    </Router>

  );

};


export default App;