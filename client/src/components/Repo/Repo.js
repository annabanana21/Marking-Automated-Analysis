import React, {useState} from 'react';
import './Repo.scss';

const Repo = (props) => {

    let [colored, changeColor] = useState(false)

    const focus = (e, item) => {
        changeColor(!colored)
        props.repoFocus(e, item)
    }

    const {date, item} = props;

    return (
        <div className={!colored ? "repo__card" : "repo__card--alt"} onClick={(e) => focus(e,item)}>
            <div className="repo__owner-box">
                <h4 className={!colored ? "repo__title" : "repo__title--alt"}>{item.name}</h4>
                <h5 className={!colored ? "repo__owner" : "repo__owner--alt"}>{item.owner.login}</h5>
            </div>
            <div className={!colored ? "repo__content" : "repo__content--alt"}>
                <p className={!colored ? "repo__owner" : "repo__owner--alt"}>{"Last updated: "+date}</p>
            </div>
        </div>
    )

}

export default Repo;