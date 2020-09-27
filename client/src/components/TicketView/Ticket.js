import React from 'react';
import './Ticket.scss';
import ticketImg from '../../assets/ticket.svg';

const Ticket = (props) => {
    const {summary, key} = props.ticket

    return (
        <div className={props.selected ? 'ticket' : 'ticket--alt'} onClick={props.clickListener}>
            <img src={ticketImg} className='ticket__image'/>
            <div>
                <h4 className='ticket__desc'>{summary}</h4>
                <p>{key}</p>
            </div>
        </div>
    )
}

export default Ticket;