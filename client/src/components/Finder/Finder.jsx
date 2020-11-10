import React, {useContext, useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import './Finder.scss';
import axios from 'axios';
import {AccountContext} from '../../store/AccountContext';
import {RepoContext} from '../../store/RepoContext';
import 'semantic-ui-css/semantic.min.css'
import Repo from '../Repo/Repo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Collab from '../Collab/Collab';

const Finder = (props) => {
    const { state } = useContext(AccountContext);
    const { repoState, repoDispatch} = useContext(RepoContext);
    const [multiSelect, isSelected] = useState(false);
    const [repoSelected, selectRepos] = useState([]);

    const [featured, setFeatured] = useState(null);

    // const repoFocus = (e,repo) => {
    //     if (multiSelect) {
    //         selectRepos([...repoSelected, repo])
    //     } else {
    //         const { history: { push } } = props;
    //         e.preventDefault();
    //         //Updates repo context to include focused repository
    //         repoDispatch({
    //             type: "UPDATE",
    //             payload: { repo: repo }
    //         });
    //         //Re-directs to url specified by repo ID
    //         push(props.match.path+"/"+repo.id)
    //     }
    // }
    
    const repoFocus = (repoInfo) => {
        setFeatured(repoInfo);
        repoDispatch({
            type: "UPDATE",
            payload: { repo: repoInfo }
        });
    };

    const formatRepos = () => {
        const shortened = repoState.repoList.slice(0,4);
       return shortened.map(item => {
           let date = new Date(item.pushed_at).toDateString();
           return (
                <Repo key={item.id} repoFocus={repoFocus} item={item} date={date}/>
            )
       })
    }

    useEffect(() => {
        const {access_token, user} = state.user.data;
        
        axios.post(`${process.env.REACT_APP_BACKEND}marking/repos`, {
            key: access_token, 
            owner: user.login
        }).then(results => {
            repoDispatch({
                type: "CREATE",
                payload: { repoList: results.data.sort((a,b) => (new Date(a.pushed_at).getTime() - new Date(b.pushed_at).getTime() < 0) ? 1 : -1)}
              });
        })
    }, [])

    console.log(featured);

    return (
        <section className='start'>
            <div className='start__display'>
                <h2 className='start__title'>Welcome,</h2>
                <h3 className='start__user'>{state.user.data.user.login}</h3>
                <div className="start__box">
                    <form className='start__form'>
                        <FontAwesomeIcon icon={faSearch} className='search__glass' size='lg'/>
                        <input className='start__search' name='search' placeholder='Search repo by name'/>
                    </form>
                    {repoState.repoList.length > 0 && formatRepos()}
                </div>
            </div>
            
            {featured && (
                <Collab />
            )}
           
        </section>
    )
}

export default withRouter(Finder);