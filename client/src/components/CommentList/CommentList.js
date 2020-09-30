import React, {useState, useContext} from 'react';
import {RepoContext} from '../../store/RepoContext';
import './CommentList.scss';

const CommentList = (props) => {
    const { repoState } = useContext(RepoContext);
    const {commentList, title} = props;



    return (
        <div className='comments' onClick={(e) => e.stopPropagation()}>
        <div className='comments__top'>
            <h5 className='comments__title'>{title}</h5>
            <p className='comments__title'>{commentList.length}</p>
        </div>
            <div className='comments__box' >
                { commentList.map(comment => {
                    return <p className='comments__row' key={comment.id}>{comment.body}</p>
                })}
            </div>
        </div>
    )


}

export default CommentList;