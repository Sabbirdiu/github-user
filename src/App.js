import React from "react";
import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Route path="/" exact={true} >
        <Dashboard></Dashboard>
      </Route>
      <Route path='/login' >
        <Login></Login>
      </Route>
    </Router>
  );
}

export default App;
