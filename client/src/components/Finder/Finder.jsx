import React, {useContext, useState, useEffect} from 'react';
import './Finder.scss';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {AccountContext} from '../../store/AccountContext';
import {RepoContext} from '../../store/RepoContext';
import 'semantic-ui-css/semantic.min.css'
import GridRow from '../Grid/Grid';

const Finder = (props) => {
    const { state, dispatch } = useContext(AccountContext);
    const { repoState, repoDispatch} = useContext(RepoContext);

    const repoFinder = () => {
        let form = document.getElementById('standard-basic');
        const formatted = form.value.split('/');
        let base = "https://api.github.com/repos/"+formatted[3]+"/"+formatted[4];
        axios.all(
            [
                axios.get(base),
                axios.get(base+"/contributors"),
                axios.get(base+"/pulls?state=all"),
            ]
        ).then(results => {
            console.log(results);
            this.setState({contributers: results[1].data.map(person => {
                return {
                name: person.login,
                pic: person.avatar_url,
                share: person.contributions,
                comments: []
            }
            })})
        })
    }

    const showRepos = () => {
        const {access_token, scope, token_type} = state.user.data;
        axios.get(`https://api.github.com/user/repos?access_token=${access_token}&scope=repo&type=all`).then(results => {
            //setRepo(results.data.sort((a,b) => (new Date(a.pushed_at).getTime() - new Date(b.pushed_at).getTime() < 0) ? 1 : -1));
            repoDispatch({
                type: "CREATE",
                payload: { repoList: results.data.sort((a,b) => (new Date(a.pushed_at).getTime() - new Date(b.pushed_at).getTime() < 0) ? 1 : -1)}
              });
        })
    }

    const repoFocus = (repo) => {

    }

    const formatRepos = () => {
       return repoState.repoList.map(item => {
           let date = new Date(item.pushed_at).toDateString();
           console.log(date)
           return (
            <div className="start__card" onClick={() => repoFocus(item)}>
                <div className="start__owner-box">
                    <h4 className='start__title'>{item.name}</h4>
                    <h5 className="start__owner">{item.owner.login}</h5>
                </div>
                <div className='start__content'>
                    <p className='start__owner'>{"Last updated: "+date}</p>
                </div>
            </div>)
       })
    }

    useEffect(() => {
        showRepos()
    }, [])

    console.log(repoState)

    return (
        <section className='start'>
            <div className="start__box">
                {repoState.repoList.length > 0 && formatRepos()}
            </div>
        </section>
    )
}

export default Finder;