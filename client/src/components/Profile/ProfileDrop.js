import React from 'react';


const ProfileDrop = (props) => {
    
    return (
        <div ref={props.innerRef} style={{border: "2px solid black"}}>
            {props.children}    
        </div>
    )


}

export default ProfileDrop;