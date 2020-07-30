import React, { createContext, useReducer } from 'react';
import './App.css';
import Finder from './components/Finder/Finder';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { initialState, reducer } from "./store/reducer";


export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
    <Router>
      <Switch>
        <Route path="/repos" component={Finder}/>
        <Route path="/" component={Login}/>
      </Switch>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
