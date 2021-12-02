import * as Types from './types';
import axios from 'axios';
export const TransactionInputRequestAction = (TransactionInput, user) => async dispatch => {
    try {
        const res = await axios.post('https://b24win.herokuapp.com/transaction/add', {...TransactionInput, user: user._id});
        if (TransactionInput.transaction === 'withdraw' && res.data.error === false) {
            user.balance = user.balance - Number(TransactionInput.amount)
        }

        dispatch({
            type: Types.SET_ALERT,
            payload:{
                message:res.data.message,
                error: res.data.error
            }
        })
    } catch (error) {
        dispatch({
            type: Types.SET_ALERT,
            payload:{
                message:'There was server side error',
                error: true
            }
        })
    }
}

export const transitionGetAction = (page, user) => async dispatch => {
    try {
        const res = await axios.get(`https://b24win.herokuapp.com/transaction?page=${page}&user=${user}`);
        if (res.data.error)dispatch({
            type: 'SET_ALERT',
            payload: {
                message:'There was an error', error: true
            }
        })      
        dispatch({
            type: 'SET_TRANSACTION',
            payload: {
                transaction: res.data.transaction,
                length: res.data.length
            }
        }) 
    } catch (error) {
        dispatch({
            type: 'SET_ALERT',
            payload: {
                message:'There was an error', error: true
            }
        })      
    }
}