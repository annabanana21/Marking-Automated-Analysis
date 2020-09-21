import React, {useState, useContext} from 'react';
import {RepoContext} from '../../store/RepoContext';
import './Profile.scss'
import pic from '../../assets/folder.svg';

const Profile = (props) => {
    const { repoState} = useContext(RepoContext);
    const [expand, setExpand] = useState(false);
 
    let {name, collaborator, innerRef} = props;

    
    let profile = repoState.collaborators.find(person => person.login === name);

    return (
        <div className='user'  >
                <img src={profile ? profile.avatar_url : pic} className='user__pic' alt='user avatar'/>
                <div className='user__box'>
                    <h4 className='user__name'>{name}</h4>
                    <div className='user__data'>
                        <div className='user__short'>
                            <h5>{collaborator.commits ? collaborator.commits : 0}</h5>
                            <p>commits</p>
                        </div>
                        <div>
                            <h5>{collaborator.pullRequests ? collaborator.pullRequests.length : 0}</h5>
                            <p>pull requests</p>
                        </div>
                        <div>
                            <h5>{collaborator.tickets ? collaborator.tickets.length : 0}</h5>
                            <p>tickets</p>
                        </div>
                    </div>
                </div>
                {expand && <h1>show more</h1>}
        </div>
    )


}

export default Profile;