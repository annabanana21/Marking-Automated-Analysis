import React, {useContext, useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import './Collab.scss';
import {RepoContext} from '../../store/RepoContext';
import {AccountContext} from '../../store/AccountContext';
import axios from 'axios';
import dynamicTime from '../../functions/daysAgo';
import ReactLoading from 'react-loading';

const Collab = (props) => {
    const { repoState, repoDispatch} = useContext(RepoContext);
    const { state} = useContext(AccountContext);
    const [boards, setBoards] = useState([]);
    const [load, setLoading] = useState(true);
    const [show, showModal] = useState(false);
    const [start, setStart] = useState(false);


    const addBoard = (event) => {
        event.preventDefault();
        repoDispatch({
            type: "BOARD",
            payload: {boardId: event.target.boards.value}
        });
        setStart(true);
    }


    useEffect(()=> {
        setLoading(true);
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
            setBoards(resArray[3].data)

            setTimeout(() => {
                setLoading(false)
            }, 500)
        })
    }, [repoState.current])

    useEffect(()=> {
    }, [load, show, start])


    if (start) {
        return <Redirect to={`/repos/${repoState.current.id}/analysis`}/>
    }

    return (
        <section className="collab">
            { load ? <ReactLoading type={"bubbles"} color={"#20A4F3"} height={100} width={200} /> : 
            <>
            <div className='collab__group'>
                <h3 className="collab__heading">{repoState.commits.length}</h3>
                <h4 className='collab__title'>Total Commits</h4>
            </div>
            <div className='collab__group'>
                <h3 className="collab__heading">{dynamicTime(repoState.current.updated_at)[0]}</h3>
                <h4 className="collab__title">{dynamicTime(repoState.current.updated_at)[1]}</h4>
            </div>

            <div className="collab__active">
                <h5 className='collab__text'>GitHub Analysis</h5>
                <div className="collab__button" onClick={() => showModal(!show)}>START</div>
            </div>
            {show && 
                (<div className='collab__form'>
                    <p className='collab__board'>Add a Jira Board</p>
                    <form onSubmit={addBoard} className='collab__cont'>
                        <select name="boards" id="boards" className='collab__select'>
                            {boards.map(board => <option value={board.name}>{board.name}</option>)}
                        </select>
                        <button type='submit' className='collab__submit'>Configure</button>
                    </form>
                </div>)}
            </>
            }
        </section>
    )
}

export default Collab;