import React from 'react';
import {Grid} from 'semantic-ui-react'

const GridRow = (props) => {

    const createColumn = (obj) => {
        return (
            <Grid.Column>
            </Grid.Column>)
    }

    return (
        <Grid.Row>
            {props.repos.forEach(repo => {
                createColumn(repo)
            })}
        </Grid.Row>
    )

}

export default GridColumns;