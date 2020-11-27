import React, {useContext, useEffect, useState} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import './Finder.scss';
import axios from 'axios';
import {AccountContext} from '../../store/AccountContext';
import {RepoContext} from '../../store/RepoContext';
import 'semantic-ui-css/semantic.min.css'
import Repo from '../Repo/Repo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Collab from '../Collab/Collab';
import useLogger from '../../functions/isLogged';

const Finder = (props) => {
    const { state } = useContext(AccountContext);
    const { repoState, repoDispatch} = useContext(RepoContext);
    // const [multiSelect, isSelected] = useState(false);
    // const [repoSelected, selectRepos] = useState([]);
    const [ displayed, setDisplay ] = useState([]);
    const logger = useLogger();
    const [featured, setFeatured] = useState(null);

    // const repoFocus = (e,repo) => {
    //     if (multiSelect) {
    //         selectRepos([...repoSelected, repo])
    //     } else {
    //         e.preventDefault();
    //         //Updates repo context to include focused repository
    //         repoDispatch({
    //             type: "UPDATE",
    //             payload: { repo: repo }
    //         });
    //     }
    // }
    
    const repoFocus = (repoInfo) => {
        setFeatured(repoInfo);
        repoDispatch({
            type: "UPDATE",
            payload: { repo: repoInfo }
        });
    };

    const formatRepos = (val) => {
        let searched;
        if (val) {
            searched = repoState.repoList.filter(item => item.name && item.name.toLowerCase().includes(val.toLowerCase()));
            if (searched.length > 3) {
                searched = searched.slice(0, 4);
            } 
        } else {
            searched = repoState.repoList.slice(0,4);
        }
        setDisplay(searched.map(item => {
            let date = new Date(item.pushed_at).toDateString();
            return (
                    <Repo key={item.id} repoFocus={repoFocus} item={item} date={date}/>
                )
        }));
    }

    useEffect(() => {
        if (state.user) {
            const {access_token, user} = state.user.data;
            formatRepos(null);
            axios.post(`${process.env.REACT_APP_BACKEND}marking/repos`, {
                key: access_token, 
                owner: user.login
            }).then(results => {
                repoDispatch({
                    type: "CREATE",
                    payload: { repoList: results.data.sort((a,b) => (new Date(a.pushed_at).getTime() - new Date(b.pushed_at).getTime() < 0) ? 1 : -1)}
                  });
            })
        }
    }, [])

    const searchRepo = (event) => {
        event.preventDefault();
        const searchResult = event.target.search && event.target.search.value;
        formatRepos(searchResult);
    }

    if (logger && typeof logger === "string") {
        return <Redirect to={`${logger}`}/>
    }
    else if (!state.user) {
        return null;
    }
     else {
        return (
            <section className='start'>
                <div className='start__display'>
                    <h2 className='start__title'>Welcome,</h2>
                    <h3 className='start__user'>{state.user.data.user.login}</h3>
                    <div className="start__box">
                        <form className='start__form' onSubmit={searchRepo}>
                            <FontAwesomeIcon icon={faSearch} className='start__glass' size='lg'/>
                            <input className='start__search' name='search' placeholder='Search repo by name'/>
                        </form>
                        {repoState.repoList.length > 0 && displayed}
                    </div>
                </div>
                {featured && (
                    <Collab />
                )}
            </section>
        )
    }
}

export default withRouter(Finder);