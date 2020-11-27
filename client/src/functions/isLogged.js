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
                setJiraStatus(false);
            } else {
                try {
                    // Call Jira API to check for success.
                    const result = await axios.post(`${process.env.REACT_APP_BACKEND}marking/boards`, {
                        clientId: state.jiraData.clientId,
                        access_token: state.jiraData.access_token
                    })
                    setJiraStatus(true);
                  } catch (err) {
                      dispatch({
                        type: "LOGOUTJIRA",
                        payload: null
                    })
                      setJiraStatus(false);
                  }
            }
        
            if (!state && !state.user && !state.user.data) {
                setGitStatus(false);
            } else {
                try {
                    // Call Github API to check for success.
                    const user = JSON.parse(localStorage.getItem("user"));
                    const userData = user && user.data && user.data.access_token;
                    const result = await axios.get(`https://api.github.com/user?access_token=${userData}`);
                    setGitStatus(true);
                  } catch (err) {
                      dispatch({
                          type: "LOGOUT",
                          payload: null
                      })
                      setGitStatus(false);
                  }
            }
        }
        findStatus();
    });

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