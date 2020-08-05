import React, {useContext} from 'react';
import './Title.scss';
import {RepoContext} from '../../store/RepoContext';

const Title = () => {
    const { repoState, repoDispatch} = useContext(RepoContext);
    return (
        <div className="title">
            <h3 className="title__name">{repoState.current.name}</h3>
        </div>
    )
}

export default Title;