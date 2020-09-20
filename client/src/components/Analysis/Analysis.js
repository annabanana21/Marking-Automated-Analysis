import React, {useState, useEffect, useContext} from 'react';
import {AccountContext} from '../../store/AccountContext';
import {RepoContext} from '../../store/RepoContext';
import axios from 'axios';
import repoAnalysis from '../../functions/repoAnalysis';
import './Analysis.scss'
import Profile from '../Profile/Profile';
import Split from '../Split/Split';

const Analysis = () => {
    const { state, dispatch } = useContext(AccountContext);
    const { repoState, repoDispatch} = useContext(RepoContext);
    const [collabs, setCollabs] = useState(null);
    
    console.log(repoState)

    useEffect(() => {

        axios.all([
            axios.post(`${process.env.REACT_APP_BACKEND}marking/analysis`, {
                owner: repoState.current.owner.login,
                key: state.user.data.access_token,
                repoName: repoState.current.name
            }),
            axios.post(`${process.env.REACT_APP_BACKEND}marking/board/${repoState.boardId}`, {
                clientId: state.jiraData.clientId,
                access_token: state.jiraData.access_token
            })
        ])
        .then(res => {
            console.log(res)
            repoDispatch({
                type: "ANALYSIS",
                payload: { analysis: repoAnalysis({pulls: res[0].data, commits: repoState.commits, tickets: res[1].data.issues})}
              })
              setCollabs(true);
        })
    
    }, [])


    if (!collabs) {
        return false
    }
    
    return (
        <section className='any'>
            <h2 className='any__title'>Participation Breakdown</h2>
            <Split />
        </section>
    )


}

export default Analysis;