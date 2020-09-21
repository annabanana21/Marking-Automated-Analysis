import React, {useContext} from 'react';
import {RepoContext} from '../../store/RepoContext';
import Profile from '../Profile/Profile';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import ProfileDrop from '../Profile/ProfileDrop';

const UserView = (props) => {
    const { repoState} = useContext(RepoContext);


    const showMap = (map) => {
        let people = []
        let ind = 0
        for (let [key, value] of map) {
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
                </Droppable>)
            ind++
        }

        return people
    }

    return (
        <DragDropContext>
        <section className='split'>
            
            {showMap(repoState.analysis)}
            
        </section>
        </DragDropContext>
    )
}

export default UserView;