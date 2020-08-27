import React, {useState, useEffect, useContext} from 'react';
import {AccountContext} from '../../store/AccountContext';
import {RepoContext} from '../../store/RepoContext';
import repoAnalysis from '../../functions/repoAnalysis';
import './Analysis.scss'

const Analysis = () => {
    const { state, dispatch } = useContext(AccountContext);
    const { repoState, repoDispatch} = useContext(RepoContext);
    const [collabs, setCollabs] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log(repoState)
        
    }, [])

    const organizeCommits = () => {
        let workers = {};
        repoState.commits.forEach(commit => {
            if (commit.author) {
                let user = commit.author.login
                if (!workers[user]) {
                    workers[user] = {
                        commits: 1
                    }
                } else {
                    workers[user].commits++
                }
            } 
        })

        return workers;
    }

    // if (!collabs) {
    //     return <div>Loading..</div>

    // {
    //     collab1: {
    //         commits: 0,
    //         comments: 0,
    //         pullRequests: 0,
    //         pullsApproved: 0,
    //     }
    // }
    // }


    return (
        <section className='any'>
            <h2 className='any__title'>Participation Breakdown</h2>

        </section>
    )


}

export default Analysis;