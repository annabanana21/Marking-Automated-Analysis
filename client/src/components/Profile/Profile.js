import React, {useState, useContext} from 'react';
import {RepoContext} from '../../store/RepoContext';
import './Profile.scss'
import pic from '../../assets/web-programming.svg';
import CommentList from '../CommentList/CommentList';

const Profile = (props) => {
    const { repoState} = useContext(RepoContext);
    const [expand, setExpand] = useState(false);
 
    let {name, collaborator, innerRef} = props;

    
    let profile = repoState.collaborators.find(person => person.login === name);

    return (
        <div className='user' onClick={() => setExpand(!expand)}>
                <div className='user__hold'>
                    <img src={profile ? profile.avatar_url : pic} className='user__pic' alt='user avatar'/>
                    <div className='user__box'>
                        <h4 className='user__name'>{name}</h4>
                        <div className='user__data'>
                            <div className='user__short'>
                                <h5 className='user__number'>{collaborator.commits ? collaborator.commits : 0}</h5>
                                <p className='user__sub'>commits</p>
                            </div>
                            <div className='user__short'>
                                <h5 className='user__number'>{collaborator.pullRequests ? collaborator.pullRequests.length : 0}</h5>
                                <p className='user__sub'>pull requests</p>
                            </div>
                            <div className='user__short'>
                                <h5 className='user__number'>{collaborator.tickets ? collaborator.tickets.length : 0}</h5>
                                <p className='user__sub'>tickets</p>
                            </div>
                        </div>
                        {expand ? <p className='user__show--clicked'>Show Less ^ </p> : <p className='user__show'>Show More v </p>}
                    </div>
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