import React, {createContext, useState} from 'react';
import { initialState, reducer } from "./reducer";

export default AccountContext = createContext();

export const AccountProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AccountContext.AccountProvider
        value={{
            state,
            dispatch
        }}
        >
            {props.children}
        </AccountContext.AccountProvider>
    )
}
