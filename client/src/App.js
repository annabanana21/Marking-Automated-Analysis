import React, { createContext, useReducer } from 'react';
import './App.css';
import Finder from './components/Finder/Finder';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountProvider from './store/AccountContext';  

function App() {

  return (
    <AccountProvider>
    <Router>
      <Switch>
        <Route path="/repos" component={Finder}/>
        <Route path="/" component={Login}/>
      </Switch>
    </Router>
    </AccountProvider>
  );
}

export default App;
