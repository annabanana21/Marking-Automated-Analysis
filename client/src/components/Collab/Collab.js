import React, {useContext, useState, useEffect} from 'react';
import {Link,  Redirect} from 'react-router-dom';
import './Collab.scss';
import {RepoContext} from '../../store/RepoContext';
import {AccountContext} from '../../store/AccountContext';
import axios from 'axios';
import dynamicTime from '../../functions/daysAgo';

const Collab = (props) => {
    const { repoState, repoDispatch} = useContext(RepoContext);
    const { state, dispatch } = useContext(AccountContext);
    const [boards, setBoards] = useState([]);
    const [load, setLoading] = useState(true);
    const [show, showModal] = useState(false);
    const [start, setStart] = useState(false);

    console.log(repoState)
    console.log(state)

    const getData = () => {
        axios.all(
            [
                axios.post(`${process.env.REACT_APP_BACKEND}marking/commits`, {
                    owner: repoState.current.owner.login,
                    key: state.user.data.access_token,
                    repoName: repoState.current.name
                }),
                axios.get(repoState.current.branches_url.replace("{/branch}", '')+`?access_token=${state.user.data.access_token}`),
                axios.get(repoState.current.collaborators_url.replace("{/collaborator}", '')+`?access_token=${state.user.data.access_token}`),
                axios.post(`${process.env.REACT_APP_BACKEND}marking/boards`, {
                    clientId: state.jiraData.clientId,
                    access_token: state.jiraData.access_token
                })
            ]
        )
        .then(resArray => {
            repoDispatch({
                type: "COMMITS",
                payload: { commits: resArray[0].data, branches: resArray[1].data, collaborators: resArray[2].data}
              });
            console.log(resArray[2].data)
            setBoards(resArray[3].data)
            setLoading(false)
        })
    }

    const addBoard = (event) => {
        event.preventDefault();
        repoDispatch({
            type: "BOARD",
            payload: {boardId: event.target.boards.value}
        });
        setStart(true)
    }


    useEffect(()=> {
        getData();
    }, [])

    useEffect(()=> {
    }, [load, show, start])

    if (load) {
        return <div>Loading...</div>
    }

    if (start) {
        return <Redirect to={props.path}/>

    }

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
                    <div className="collab__button" onClick={() => showModal(!show)}>START</div>
                </div>
            </div>
            {show && 
                (<div>
                    <p>Add a Jira Board</p>
                    <form onSubmit={addBoard}>
                        <select name="boards" id="boards">
                            {boards.map(board => <option value={board.name}>{board.name}</option>)}
                        </select>
                        <button type='submit'>Configure Board</button>
                    </form>
                </div>)}
        </section>
    )
}

export default Collab;