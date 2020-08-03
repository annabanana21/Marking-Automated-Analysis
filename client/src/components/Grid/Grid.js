import React from 'react';
import 'semantic-ui-css/semantic.min.css'

const GridRow = (props) => {

    const createColumn = (obj) => {
        return (
            <div className="column">
                <h3>{obj.owner.login}</h3>
            </div>
        )
    }

    return (
        <div className="row">
            {props.repos.forEach(repo => {
                createColumn(repo)
            })}
        </div>
    )
}

export default GridRow;