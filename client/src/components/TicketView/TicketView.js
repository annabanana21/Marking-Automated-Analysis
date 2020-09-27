import React, {useContext, useState, useEffect} from 'react';
import {RepoContext} from '../../store/RepoContext';
import Ticket from './Ticket';


const TicketView = (props) => {
    const { repoState} = useContext(RepoContext);
    const [selected, select] = useState(0);

    useEffect(() => {
        console.log(selected)
    }, [selected])
    

    return (
        <section className='tickets'>
            {repoState.analysis[1].map((ticket, index) => {
                return <Ticket ticket={ticket} selected={selected === index ? true : false} clickListener={() => select(index)}/>
            })}
        </section>
    )
}

export default TicketView;