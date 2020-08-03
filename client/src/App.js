import React, { createContext, useReducer } from 'react';
import './App.css';
import Finder from './components/Finder/Finder';
import Login from './components/Login/Login';
import Collab from './components/Collab/Collab';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountProvider from './store/AccountContext';  
import RepoProvider from './store/RepoContext';

function App() {

  return (
    <AccountProvider>
      <RepoProvider>
      <Router>
        <Switch>
          <Route path="/repos/:repoId" component={Collab}/>
          <Route path="/repos" component={Finder}/>
          <Route path="/" component={Login}/>
        </Switch>
      </Router>
      </RepoProvider>
    </AccountProvider>
  );
}

export default App;
