import React, {useState} from 'react';
import './Repo.scss';
import folder from '../../assets/folder.svg'

const Repo = (props) => {

    let [colored, changeColor] = useState(false)

    const focus = (e, item) => {
        changeColor(!colored)
        props.repoFocus(e, item)
    }

    const {date, item} = props;

    return (
        <div className={!colored ? "repo__card" : "repo__card--alt"} onClick={(e) => focus(e,item)}>
            <img className='repo__folder' src={folder} alt="repository icon"/>
            <div className="repo__owner-box">
                <div className='repo__top'>
                    <h4 className={!colored ? "repo__title" : "repo__title--alt"}>{item.name}</h4>
                    <h5 className={!colored ? "repo__owner" : "repo__owner--alt"}>{item.owner.login}</h5>
                </div>
                <p className="repo__date">{"Last updated: "+date}</p>
                
            </div>
        </div>
    )

}

export default Repo;