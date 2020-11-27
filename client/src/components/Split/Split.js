import React, {useContext, useState} from 'react';
import {RepoContext} from '../../store/RepoContext';
import TicketView from '../TicketView/TicketView';
import UserView from '../UserView/UserView';
import './Split.scss'

const Split = (props) => {
    const { repoState} = useContext(RepoContext);
    const [current, setCurrent] = useState(true);

    console.log(`Repo analysis: ${repoState.analysis}`);

    return (
        <section className='split'>
            <div className='split__box'>
                <h4 className={current ? 'split__tab' : 'split__tab--dark'} onClick={() => setCurrent(true)}>People</h4>
                <h4 className={!current ? 'split__tab' : 'split__tab--dark'} onClick={() => setCurrent(false)}>Tickets</h4>
            </div>
            <div className='split__content'>
            {
                current && <UserView />
            }
            {
                !current && <TicketView />
            }
            </div>
            
        </section>
    )
}

export default Split;