
import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import {AccountContext} from '../../store/AccountContext';
import './Login.scss';
import axios from "axios";
import poster from '../../assets/home.png';

const Login = () => {

    const { state, dispatch } = useContext(AccountContext);
    const [data, setData] = useState({ errorMessage: "", isLoading: false });

    console.log(state)
    const { client_id, redirect_uri } = state;

    useEffect(() => {
        // After requesting Github access, Github redirects back to your app with a code parameter
        const url = window.location.href;
        const hasCode = url.includes("?code=");
        console.log(url, hasCode)
    
        // If Github API returns the code parameter
        if (hasCode) {
          const newUrl = url.split("?code=");
          window.history.pushState({}, null, newUrl[0]);
          setData({ ...data, isLoading: true });
    
          const requestData = {
            client_id: state.client_id,
            redirect_uri: state.redirect_uri,
            client_secret: state.client_secret,
            code: newUrl[1]
          };
    
          const proxy_url = state.proxy_url;
          console.log(proxy_url) 
          // Use code parameter and other parameters to make POST request to proxy_server
          axios.post(proxy_url, requestData)
            .then(data => {
              console.log(data)
              dispatch({
                type: "LOGIN",
                payload: { user: data, isLoggedIn: true }
              });
            })
            .catch(error => {
              console.log(error)
              setData({
                isLoading: false,
                errorMessage: "Sorry! Login failed"
              });
            });
        }
      }, [state, dispatch, data]);
    
      if (state.isLoggedIn) {
        return <Redirect to="/jira" />;
      }

      let access = ["user", "repo"]
    
      return (
          <section className="log">
            <div className='log__bar'>
             <h2 className='log__logo'>automark</h2>
             <Link to='/start'><div className='log__in'>Sign Up</div></Link>
            </div>
            <div className='log__box'>
            <div className='log__blurb'>
              <h1 className='log__title'>Let automation do the work for you.</h1>
              <p>With automark analyze student repositories, efficiently install workspaces, and run user-driven tests.</p>
              <span>{data.errorMessage}</span>
              <div className="login-container">
                  <>
                    {
                      // Link to request GitHub access
                    }
                    <a
                      className="log__link"
                      href={`https://github.com/login/oauth/authorize?scope=${access}&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                      onClick={() => {
                        setData({ ...data, errorMessage: "" });
                      }}
                    >
                      <div className='log__in'>Login with GitHub</div>
                    </a>
                  </>
              </div>
            </div>
            <img className='log__img' src={poster}/>
            </div>
          </section>
      );
}

export default Login;