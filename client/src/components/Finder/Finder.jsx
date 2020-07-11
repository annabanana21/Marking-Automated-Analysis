import React from 'react';
import './Finder.scss';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Finder extends React.Component {

    state = {
        valid: false,
        contributers: [],
        commits: []
    }

    repoFinder = () => {
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

    render() {
        console.log(this.state.contributers);
        return (
            <section className='start'>
                <form noValidate autoComplete="off">
                <TextField id="standard-basic" label="Repo URL" />
                <Button variant="contained" onClick={this.repoFinder}>
                    Find
                </Button>
                </form>
                {
                    this.state.contributers.map(person => {
                        return (
                            <div>
                                <img src={person.pic}/>
                                <h3>{person.name}</h3>
                                <h5>{person.share}</h5>
                            </div>
                        )
                    })
                }
            </section>
        )
    }
}

export default Finder;