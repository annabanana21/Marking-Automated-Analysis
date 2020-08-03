import React, {createContext, useReducer} from 'react';
import {initialState, reducerRepo} from './reducer/repoReducer';

export const RepoContext = createContext();

const RepoProvider = (props) => {

    const [repoState, repoDispatch] = useReducer(reducerRepo, initialState);

    return (
        <RepoContext.Provider
        value={{
            repoState,
            repoDispatch
        }}
        >
            {props.children}
        </RepoContext.Provider>
    )
}

export default RepoProvider;