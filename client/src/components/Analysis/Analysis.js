import React, {useState, useEffect, useContext} from 'react';
import {AccountContext} from '../../store/AccountContext';
import {RepoContext} from '../../store/RepoContext';
import axios from 'axios';
import repoAnalysis from '../../functions/repoAnalysis';
import './Analysis.scss'

const Analysis = () => {
    const { state, dispatch } = useContext(AccountContext);
    const { repoState, repoDispatch} = useContext(RepoContext);
    const [collabs, setCollabs] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.post("http://localhost:8080/marking/analysis", {
            owner: repoState.current.owner.login,
            key: state.user.data.access_token,
            repoName: repoState.current.name
        }).then(res => {
            console.log(repoAnalysis({pulls: res.data, commits: repoState.commits}))
            let {access_token, clientId} = state.jiraData;
            axios.post("http://localhost:8080/jira/boards", {
                cloud: clientId,
                key: access_token
            }).then(results => {
                console.log(results)
            })
        })
        
    }, [])


    return (
        <section className='any'>
            <h2 className='any__title'>Participation Breakdown</h2>
        </section>
    )


}

export default Analysis;