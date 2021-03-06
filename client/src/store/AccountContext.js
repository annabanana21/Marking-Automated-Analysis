import React, {createContext, useReducer} from 'react';
import { initialState, reducer } from "./reducer/acountReducer";

export const AccountContext = createContext();

const AccountProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AccountContext.Provider
        value={{
            state,
            dispatch
        }}
        >
            {props.children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;
