import React, {useState, useContext} from 'react';
import {RepoContext} from '../../store/RepoContext';
import './CommentList.scss';

const CommentList = (props) => {
    const { repoState } = useContext(RepoContext);
    const [showAll, setShowing] = useState(false)
    const {commentList, title} = props;

    return (
        <div className='comments' onClick={(e) => e.stopPropagation()}>
            <h5 className='comments__title'>{title}</h5>
            {commentList.map(comment => {
                return <p>{comment}</p>
            })}
        </div>
    )


}

export default CommentList;