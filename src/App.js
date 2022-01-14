import React from 'react';
import './App.css';
import Login from "./components/login/login.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from './components/stock/dashboard';
import Edit from './components/stock/edit';
import Add from './components/stock/add';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { logins: [], redirect: null };
  }

  setRedirect(url) {
    this.setState({ logins: [], redirect: url }).bind(this);
  }

  render() {
    return <>
      <h1 className="text-center mt-3 lead display-4">G-Stock</h1>
      <BrowserRouter>
        <Switch>
        <Route path="/login" component={Login}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/edit" component={Edit}/>
          <Route path="/add" component={Add}/>
          <Route path="/" component={Login}/>
        </Switch>
      </BrowserRouter>
    </>
  }

}

export default App;
