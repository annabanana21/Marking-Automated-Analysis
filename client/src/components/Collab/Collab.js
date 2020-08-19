import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Collab.scss';
import {RepoContext} from '../../store/RepoContext';
import {AccountContext} from '../../store/AccountContext';
import axios from 'axios';
import dynamicTime from '../../functions/daysAgo';

const Collab = (props) => {
    const { repoState, repoDispatch} = useContext(RepoContext);
    const { state, dispatch } = useContext(AccountContext);
    const [page, setPage] = useState(1);

    console.log(repoState)
    console.log(state)

    const commitPagination = () => {
        
    }

    const getData = () => {
        axios.all(
            [
                axios.post("http://localhost:8080/marking/commits", {
                    owner: repoState.current.owner.login,
                    key: state.user.data.access_token,
                    repoName: repoState.current.name
                }),
                axios.get(repoState.current.branches_url.replace("{/branch}", '')+`?access_token=${state.user.data.access_token}`)
            ]
        )
        .then(resArray => {
            console.log(resArray)
            repoDispatch({
                type: "COMMITS",
                payload: { commits: resArray[0].data, branches: resArray[1].data }
              });
        })
    }

    useEffect(()=> {
        getData();
    }, [])

    return (
        <section className="collab">
            <div className='collab__cont'>
                <div className='collab__square'>
                    <div className="collab__box">
                        <div className="collab__infograph">Total Commits:</div>
                        <p className="collab__heading">{repoState.commits.length}</p>
                    </div>
                    <div className="collab__box">
                        <div className="collab__infograph">Last Updated:</div>
                        <p className="collab__heading">{dynamicTime(repoState.current.updated_at)[0]}</p>
                        <p className="collab__heading--small">{dynamicTime(repoState.current.updated_at)[1]}</p>
                    </div>
                    <div className="collab__box"></div>
                    <div className="collab__box"></div>
                </div>
                <div className="collab__active">
                    <h5 className='collab__text'>GitHub Analysis</h5>
                    <Link to={props.path}><div className="collab__button">START</div></Link>
                </div>
            </div>
        </section>
    )
}

export default Collab;