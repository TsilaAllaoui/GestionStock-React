import { contains, get } from 'jquery';
import React from 'react';
import './App.css';
import Login from "./components/login/login.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from './components/stock/dashboard';
import Searchbar from './components/stock/searchbar';
import Stock from './components/stock/stock';


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
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard/>
          </Route>
          <Route path="/searchbar">
            <Searchbar/>
          </Route>
          <Route path="/">
            <Login/>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  }

}

export default App;
