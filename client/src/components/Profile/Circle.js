import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const Circle = (props) => {
    const {userStat, userPercent} = props;
    return (
        <div className='user__short'>
            <CircularProgressbar className= 'user__circle' value={userPercent} text={`${userStat}`} styles={buildStyles({

                textSize: '24px',

                // Colors
                pathColor: `#7B40F2`,
                textColor: '7B40F2',
                trailColor: '#F0EFF3',
                backgroundColor: '#3e98c7',
              })}/>
            <p className='user__sub'>commits</p>
        </div>
    )
}

export default Circle;