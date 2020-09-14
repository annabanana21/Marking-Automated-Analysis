import React, {useState, useEffect, useContext} from 'react';
import {RepoContext} from '../../store/RepoContext';
import Profile from '../Profile/Profile';
import './Split.scss'

const Split = (props) => {
    const { repoState, repoDispatch} = useContext(RepoContext);

    console.log(repoState.analysis)

    const showMap = (map) => {
        let people = []

        for (let [key, value] of map) {
            people.push(<Profile collaborator={value} name={key}/>)
        }

        return people
    }

    return (
        <section className='split'>
            <div className='split__box'>
                <h4 className='split__tab'>People</h4>
                <h4 className='split__tab'>Tickets</h4>
            </div>
            <div className='split__content'>
            {
                showMap(repoState.analysis)
            }
            </div>
            
        </section>
    )
}

export default Split;