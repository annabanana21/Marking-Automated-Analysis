import React, {useState, useEffect, useContext} from 'react';
import {AccountContext} from '../../store/AccountContext';
import {RepoContext} from '../../store/RepoContext';
import axios from 'axios';
import repoAnalysis from '../../functions/repoAnalysis';
import './Analysis.scss'
import Profile from '../Profile/Profile';

const Analysis = () => {
    const { state, dispatch } = useContext(AccountContext);
    const { repoState, repoDispatch} = useContext(RepoContext);
    const [collabs, setCollabs] = useState(null);
    


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
            setCollabs(repoAnalysis({pulls: res[0].data, commits: repoState.commits, tickets: res[1].data.issues}))
        })
    
    }, [])

    useEffect(() => {
       console.log(collabs)
    }, [collabs])


    if (!collabs) {
        return false
    }
    console.log(collabs)
    return (
        <section className='any'>
            <h2 className='any__title'>Participation Breakdown</h2>
            {
                [...collabs].map(collaborator => {
                    return <Profile collaborator={collaborator[1]} name={collaborator[0]}/>
                })
            }
        </section>
    )


}

export default Analysis;