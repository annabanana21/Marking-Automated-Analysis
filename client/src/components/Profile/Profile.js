import React, {useState, useContext} from 'react';
import {RepoContext} from '../../store/RepoContext';
import './Profile.scss'
import pic from '../../assets/programming.svg';
import CommentList from '../CommentList/CommentList';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Circle from './Circle';

const Profile = (props) => {
    const { repoState} = useContext(RepoContext);
    const [expand, setExpand] = useState(false);
 
    let {name, collaborator, innerRef} = props;

    let userCommits = collaborator.commits ? collaborator.commits : 0;
    let userPercent = Math.round(userCommits/154*100);

    let userPulls = collaborator.pullRequests ? collaborator.pullRequests.length : 0;
    let pullPercent = Math.round(userPulls/27*100);

    let userTickets = collaborator.tickets ? collaborator.tickets.length : 0;
    let ticketPercent = Math.round(userTickets/28*100);
    
    let profile = repoState.collaborators.find(person => person.login === name);

    return (
        <div className='user' onClick={() => setExpand(!expand)}>
                <div className='user__hold'>
                    <img src={pic} className='user__pic' alt='user avatar'/>
                    <h4 className='user__name'>{name}</h4>
                    <div className='user__box'>
                        <div className='user__data'>
                            <Circle userStat={userCommits} userPercent={userPercent}/>
                            <Circle userStat={userPulls} userPercent={pullPercent}/>
                            <Circle userStat={userTickets} userPercent={ticketPercent}/>
                        </div>
                        </div>
                        {expand ? <p className='user__show--clicked'>Show Less ^ </p> : <p className='user__show'>Show More v </p>}
                </div>
                {expand && (
                    <div className='user__more'>
                    { collaborator.comments && <CommentList title="GitHub Comments" commentList={collaborator.comments}/> }
                    { collaborator.reviewComments && <CommentList title="GitHub Review Comments" commentList={collaborator.reviewComments}/> }
                    </div>
                )}
        </div>
    )


}

export default Profile;