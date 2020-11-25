import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import {AccountContext} from '../store/AccountContext';

function useLogger() {
    const [ gitStatus, setGitStatus ] = useState(null);
    const [ jiraStatus, setJiraStatus ] = useState(null);
    const { state, dispatch } = useContext(AccountContext);

    useEffect(() => {
        async function findStatus() {
            if (!state && !state.jiraData) {
                console.log("Never logged into Jira!")
            } else {
                try {
                    // Call Jira API to check for success.
                    const result = await axios.post(`${process.env.REACT_APP_BACKEND}marking/boards`, {
                        clientId: state.jiraData.clientId,
                        access_token: state.jiraData.access_token
                    })
                    setJiraStatus(true);
                  } catch (err) {
                      console.log("Logged out of Jira");
                      dispatch({
                        type: "LOGOUTJIRA",
                        payload: null
                    })
                      setJiraStatus(false);
                  }
            }
        
            if (!state && !state.user && !state.user.data) {
                console.log("Never logged into Github or cleared application memory!");
            } else {
                try {
                    // Call Github API to check for success.
                    const result = await axios.get(`https://api.github.com/user?access_token=${state.user.data.access_token}`);
                    setGitStatus(true);
                  } catch (err) {
                      console.log("Logged out of Github");
                      dispatch({
                          type: "LOGOUT",
                          payload: null
                      })
                      setGitStatus(false);
                  }
            }
        }
        findStatus();
    })

    if (gitStatus === null && jiraStatus === null) {
        return null;
    } else if ((gitStatus === false && jiraStatus === false) || gitStatus === false) {
        return '/'
    } else if (jiraStatus === false ) {
        return '/jira'
    } else {
        return true
    }
};

export default useLogger;