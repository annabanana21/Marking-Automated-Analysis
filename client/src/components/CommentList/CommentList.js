import React, {useState, useContext} from 'react';
import {RepoContext} from '../../store/RepoContext';
import './CommentList.scss';

const CommentList = (props) => {
    const { repoState } = useContext(RepoContext);
    const [showAll, setShowing] = useState(false)
    const {commentList, title} = props;



    return (
        <div className='comments' onClick={(e) => e.stopPropagation()}>
            <h5 className='comments__title' onClick={() => setShowing(!showAll)}>{title}</h5>
            <div className='comments__box' style={{padding: showAll ? "0" : "0"}}>
                { showAll && commentList.map(comment => {
                    return <p className='comments__row' key={comment.id}>{comment.body}</p>
                })}
            </div>
        </div>
    )


}

export default CommentList;