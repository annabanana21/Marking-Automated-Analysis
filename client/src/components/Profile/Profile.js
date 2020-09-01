import React, {useState, useEffect, useContext} from 'react';
import {AccountContext} from '../../store/AccountContext';
import {RepoContext} from '../../store/RepoContext';
import './Profile.scss'
import pic from '../../assets/folder.svg';

const Profile = (props) => {
    const { repoState, repoDispatch} = useContext(RepoContext);
    
    let {name, collaborator} = props;
    let profile = repoState.collaborators.find(person => person.login === name);

    // useEffect(() => {

    // }, [])

    return (
        <div className='user' >
                <img src={profile ? profile.avatar_url : pic} className='user__pic'/>
                <div className='user__box'>
                    <h4 className='user__name'>{name}</h4>
                    <div className='user__data'>
                        <div className='user__short'>
                            <h5>{collaborator.commits}</h5>
                            <p>commits</p>
                        </div>
                        <div>
                            <h5>{collaborator.pullRequests ? collaborator.pullRequests : 0}</h5>
                            <p>pull requests</p>
                        </div>
                    </div>
                </div>
        </div>
    )


}

export default Profile;