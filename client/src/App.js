import React, { createContext, useReducer } from 'react';
import './App.css';
import Finder from './components/Finder/Finder';
import Login from './components/Login/Login';
import Collab from './components/Collab/Collab';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountProvider from './store/AccountContext';  
import RepoProvider from './store/RepoContext';
import RepoPage from './pages/RepoPage/RepoPage';
import Analysis from './components/Analysis/Analysis';

function App() {

  return (
    <AccountProvider>
      <RepoProvider>
      <Router>
        <Switch>
          <Route path={"/repos/:repoId/analysis"} component={Analysis}/>
          <Route path="/repos/:repoId" component={RepoPage}/>
          <Route path="/repos" component={Finder}/>
          <Route path="/" component={Analysis}/>
        </Switch>
      </Router>
      </RepoProvider>
    </AccountProvider>
  );
}

export default App;
