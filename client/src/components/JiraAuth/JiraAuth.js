import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import {AccountContext} from '../../store/AccountContext';
import './JiraAuth.scss';
import axios from "axios";

const JiraAuth = () => {

    const { state, dispatch } = useContext(AccountContext);
    const [data, setData] = useState({ errorMessage: "", isLoading: false });

    console.log(state)
    

    useEffect(() => {
        console.log("hello")
        // After requesting Github access, Github redirects back to your app with a code parameter
        const url = window.location.href;
        const hasCode = url.includes("?code=");
        console.log(url, hasCode)
    
        // If Github API returns the code parameter
        if (hasCode) {
          const newUrl = url.split("?code=");
          window.history.pushState({}, null, newUrl[0]);
          setData({ ...data, isLoading: true });

          let actualCode = newUrl[1].split("&state=");
    
            console.log(actualCode)
          // Use code parameter and other parameters to make POST request to proxy_server
          axios.post("http://localhost:8080/jira/auth", {code: actualCode[0]})
            .then(data => {
              console.log(data)
              dispatch({
                type: "LOGINJIRA",
                payload: { isLoggedInJira: true, data: {access_token: data.data.access_token, clientId: data.data.clientId} }
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
      }, [data, dispatch]);
    
      if (state.isLoggedInJira) {
        return <Redirect to="/repos" />;
      }
    
      return (
          <section className="jira">
            <div>
              <h2>Configure Jira</h2>
              <p>Does your GitHub repository have an associated Jira board? Configure your Jira account to combine the analytics.</p>
              <span>{data.errorMessage}</span>
              <div className="login-container">
                {data.isLoading ? (
                  <div className="loader-container">
                    <div className="loader"></div>
                  </div>
                ) : (
                  <>
                    {
                      // Link to request GitHub access
                    }
                    <a
                      className="login-link"
                      href={`http://localhost:8080/jira/auth`}
                      onClick={() => {
                        setData({ ...data, errorMessage: "" });
                      }}
                    >
                      <span>Login with Jira</span>
                    </a>
                  </>
                )}
              </div>
            </div>
          </section>
      );
}

export default JiraAuth;