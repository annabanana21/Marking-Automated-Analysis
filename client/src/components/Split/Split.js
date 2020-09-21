import React, {useContext, useState} from 'react';
import {RepoContext} from '../../store/RepoContext';
import Profile from '../Profile/Profile';
import UserView from '../UserView/UserView';

import './Split.scss'


const Split = (props) => {
    const { repoState} = useContext(RepoContext);
    const [current, setCurrent] = useState(true)

    return (
        <section className='split'>
            <div className='split__box'>
                <h4 className='split__tab' onClick={() => setCurrent(true)}>People</h4>
                <h4 className='split__tab' onClick={() => setCurrent(false)}>Tickets</h4>
            </div>
            <div className='split__content'>
            {
                current && <UserView />
            }
            {
                !current && <h4>Ticket Space</h4>
            }
            </div>
            
        </section>
    )
}

export default Split;