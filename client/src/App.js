import React from 'react';
import './App.css';
import Finder from './components/Finder/Finder';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountProvider from './store/AccountContext';  
import RepoProvider from './store/RepoContext';
import RepoPage from './pages/RepoPage/RepoPage';
import Analysis from './components/Analysis/Analysis';
import JiraAuth from './components/JiraAuth/JiraAuth';
import SignUp from './components/SignUp/SignUp';

function App() {



  return (
    <AccountProvider>
      <RepoProvider>
      <Router>
        <Switch>
          <Route path='/jira' component={JiraAuth}/>
          <Route path={"/repos/:repoId/analysis"} component={Analysis}/>
          <Route path="/repos/:repoId" component={RepoPage}/>
          <Route path="/repos" component={Finder}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/login' component={SignUp}/>
          <Route path="/" component={Login}/>
        </Switch>
      </Router>
      </RepoProvider>
    </AccountProvider>
  );
}

export default App;
