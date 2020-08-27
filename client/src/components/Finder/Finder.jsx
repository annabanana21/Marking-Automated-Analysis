import React, {useContext, useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './Finder.scss';
import axios from 'axios';
import {AccountContext} from '../../store/AccountContext';
import {RepoContext} from '../../store/RepoContext';
import 'semantic-ui-css/semantic.min.css'
import Repo from '../Repo/Repo';

const Finder = (props) => {
    const { state, dispatch } = useContext(AccountContext);
    const { repoState, repoDispatch} = useContext(RepoContext);
    const [multiSelect, isSelected] = useState(false);
    const [repoSelected, selectRepos] = useState([]);

    console.log(state)

    const showRepos = () => {
        const {access_token, scope, token_type, user} = state.user.data;
        
        axios.post("http://localhost:8080/marking/repos", {
            key: access_token, 
            owner: user.login
        }).then(results => {
            console.log(results.data)
            repoDispatch({
                type: "CREATE",
                payload: { repoList: results.data.sort((a,b) => (new Date(a.pushed_at).getTime() - new Date(b.pushed_at).getTime() < 0) ? 1 : -1)}
              });
        })
    }

    const repoFocus = (e,repo) => {
        if (multiSelect) {
            selectRepos([...repoSelected, repo])
        } else {
            const { history: { push } } = props;
            e.preventDefault();
            //Updates repo context to include focused repository
            repoDispatch({
                type: "UPDATE",
                payload: { repo: repo }
            });
            //Re-directs to url specified by repo ID
            push(props.match.path+"/"+repo.id)
        }
    }



    const formatRepos = () => {
       return repoState.repoList.map(item => {
           let date = new Date(item.pushed_at).toDateString();
           console.log(date)
           return (
                <Repo repoFocus={repoFocus} item={item} date={date}/>
            )
       })
    }

    useEffect(() => {
        showRepos()
    }, [])

    useEffect(() => {

    }, [multiSelect])

    console.log(repoSelected)

    let button = <div className='start__button--alt' onClick={() => isSelected(!multiSelect)}>Multi Select</div>
    if (multiSelect) {
        button = <div className='start__button' onClick={() => isSelected(!multiSelect)}>Multi Select</div>
    }

    return (
        <section className='start'>
            <div className='start__instruct'>
                {button}
            </div>
            <div className="start__box">
                {repoState.repoList.length > 0 && formatRepos()}
            </div>
        </section>
    )
}

export default withRouter(Finder);