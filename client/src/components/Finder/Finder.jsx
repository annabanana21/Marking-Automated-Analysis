import React, {useContext, useState, useEffect} from 'react';
import './Finder.scss';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {AccountContext} from '../../store/AccountContext';
import {Grid} from 'semantic-ui-react';
import GridRow from '../Grid/Grid';

const Finder = (props) => {
    const { state, dispatch } = useContext(AccountContext);
    const { repoList, setRepo} = useState("");

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
            setRepo(results.data)
        })
    }

    const formatRepos = () => {

    }

    showRepos()

    console.log(state)
    return (
        <section className='start'>
            <Grid columns={3} divided>

            </Grid>
        </section>
    )
}

export default Finder;