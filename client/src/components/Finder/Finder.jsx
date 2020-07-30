import React, {useContext} from 'react';
import './Finder.scss';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {AuthContext} from '../../App';

const Finder = (props) => {
    const { state, dispatch } = useContext(AuthContext);

    // componentDidMount() {
    //     axios.get("https://api.github.com/user/repos").then(res => {
    //         console.log(res)
    //     })
    // }

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

    console.log(state)

    return (
        <section className='start'>
            <form noValidate autoComplete="off">
            <TextField id="standard-basic" label="Repo URL" />
            <Button variant="contained" onClick={repoFinder}>
                Find
            </Button>
            </form>
        </section>
    )
}

export default Finder;