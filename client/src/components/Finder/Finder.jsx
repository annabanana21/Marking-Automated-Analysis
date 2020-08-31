import React, {useContext, useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './Finder.scss';
import axios from 'axios';
import {AccountContext} from '../../store/AccountContext';
import {RepoContext} from '../../store/RepoContext';
import 'semantic-ui-css/semantic.min.css'
import Repo from '../Repo/Repo';
import JiraAuth from '../JiraAuth/JiraAuth';

const Finder = (props) => {
    const { state, dispatch } = useContext(AccountContext);
    const { repoState, repoDispatch} = useContext(RepoContext);
    const [multiSelect, isSelected] = useState(false);
    const [repoSelected, selectRepos] = useState([]);

    const [expand, setExpand] = useState(false);

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
        let shortened = repoState.repoList
        if (!expand) {
            shortened = repoState.repoList.slice(0,3);
        }
       return shortened.map(item => {
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

    useEffect(() => {
        let box = document.querySelector(".start__expand")
        if(expand) {
            box.style.height = "80vh"
            box.style.overflow = "scroll";
        } else {
            box.style.height = "fit-content";
            box.style.overflow = "auto";
        }
    }, [expand])

    console.log(repoSelected)

    let button = <div className='start__button--alt' onClick={() => isSelected(!multiSelect)}>Multi Select</div>
    if (multiSelect) {
        button = <div className='start__button' onClick={() => isSelected(!multiSelect)}>Multi Select</div>
    }

    let controlButton = <button onClick={() => {setExpand(true)}}>Show All</button>
    if (expand) {
        controlButton = <button onClick={() => {setExpand(false)}}>Show Less</button>
    }

    return (
        <section className='start'>
        <h2>Welcome {state.user.data.user.login}!</h2>
        <div className="start__box">
            <h4>Most Recent</h4>
        
            <div className="start__expand">
            {repoState.repoList.length > 0 && formatRepos()}
            </div>
            {controlButton}
            </div>
        </section>
    )
}

export default withRouter(Finder);