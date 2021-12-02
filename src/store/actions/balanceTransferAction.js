import * as Types from './types';
import axios from 'axios';

export const balanceTransferPostAction = (transfer)=> async dispatch => {
    try {
        const res = await axios.post(`https://b24win.herokuapp.com/transfer/post`, transfer);
        dispatch({
            type: Types.SET_ALERT,
            payload: {
                message:res.data.message, error: res.data.error
            }
        })
    } catch (error) {
        dispatch({
            type: Types.SET_ALERT,
            payload: {
                message:'There was an error', error: true
            }
        })
    }
}

export const balanceTransferGetAction = (page)=> async dispatch => {
    try {
        const res = await axios.get(`https://b24win.herokuapp.com/transfer/get-transfer?page=${page}&user=user`);
        dispatch({
            type: Types.SET_TRANSFER,
            payload: {
                transfer:res.data.transfer,
                length:res.data.length
            }
        })
    } catch (error) {
        dispatch({
            type: Types.SET_ALERT,
            payload: {
                message:'There was an error', error: true
            }
        })
    }
}