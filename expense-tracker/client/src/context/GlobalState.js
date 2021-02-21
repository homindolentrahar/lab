import React, {createContext, useReducer} from 'react'
import AppReducer from "./AppReducer.js"
import axios from "axios";

//Init state
const initialState = {
    transactions: [],
    error: null,
    loading: true,
}

//Create context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    async function getTransactions() {
        try {
            const res = await axios.get('/api/v1/transactions')

            dispatch({
                type: "GET",
                payload: res.data.data,
            })
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.response.data.error,
            })
        }
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/transactions', transaction, config)

            dispatch({
                type: "ADD",
                payload: res.data.data,
            });
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.response.data.error,
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`)

            dispatch({
                type: "DELETE",
                payload: id,
            });
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.response.data.error,
            })
        }
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
    }}>
        {children}
    </GlobalContext.Provider>);
}