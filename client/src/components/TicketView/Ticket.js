import React from 'react';
import './Ticket.scss';
import ticketImg from '../../assets/ticket.svg';
import github from '../../assets/github.svg'

const Ticket = (props) => {
    const {summary, key, associated} = props.ticket

    return (
        <div className={props.selected ? 'ticket' : 'ticket--alt'} onClick={props.clickListener}>
            <img src={ticketImg} className='ticket__image'/>
            <div>
                <h4 className='ticket__desc'>{summary}</h4>
                <p>{key}</p>
                {props.selected && associated.map(pull => {
                    return (
                        <div className='ticket__repo'>
                            <img src={github} className='ticket__icon'/>
                            <a href={pull.pull.html_url} target="_blank">{pull.pull.title}</a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Ticket;