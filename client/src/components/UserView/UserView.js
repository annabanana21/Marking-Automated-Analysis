import React, {useContext, useState, useEffect} from 'react';
import {RepoContext} from '../../store/RepoContext';
import Profile from '../Profile/Profile';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import ProfileDrop from '../Profile/ProfileDrop';

const UserView = (props) => {
    const { repoState} = useContext(RepoContext);
    const [isMerging, setMerging] = useState(false);
    const [regular, setRegular] = useState([]);
    const [mergeList, setMergeList] = useState([]);

    useEffect(() => {
        // Creates a regular profile list or Draggable list depending on merge mode
        // Only creates either list once
        if ((isMerging && mergeList.length === 0) || (!isMerging && regular.length === 0)) {
            let people = []
            let ind = 0
            for (let [key, value] of repoState.analysis[0]) {
                isMerging ?
                people.push(
                    <Droppable droppableId={`${key}1`}>
                    { (provided) => (
                        <ProfileDrop innerRef={provided.innerRef} {...provided.droppableProps}>
                            <Draggable draggableId={`${key}2`} index={ind}>
                                {(provided) => (
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    >
                                    <Profile key={key} collaborator={value} name={key}></Profile>
                                    </div>
                                )}
                            </Draggable>
                            {provided.placeholder}
                        </ProfileDrop>
                    )
                    }
                    </Droppable>) : 
                    people.push(
                        <Profile key={key} collaborator={value} name={key}></Profile>
                    )
                ind++
            }

            isMerging ? setMergeList(people) : setRegular(people)
        }
    }, [isMerging])


    return (
        <DragDropContext>
        <section className='split'>
            {/*<button onClick={() => setMerging(!isMerging)}>Merge Profiles</button>*/}
            {isMerging ? mergeList : regular}
        </section>
        </DragDropContext>
    )
}

export default UserView;