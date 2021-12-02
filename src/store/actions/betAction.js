import axios from 'axios';
import * as Types from './types';

export const betAction = (userBit, auth) => async dispatch=>{
    try {
     
        const res = await axios.post(`https://b24win.herokuapp.com/usersbet/adduserbet`, userBit);
        auth.user.balance = auth.user.balance - Number(userBit.amount)
        dispatch({
            type: Types.SET_ALERT,
            payload: {
                message:res.data.message,
                error: res.data.error
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
};
export const betGetAction = page => async dispatch =>{
    try {
        const res = await axios.get(`https://b24win.herokuapp.com/usersbet/user-bet-get?page=${page}`);
        dispatch({
            type: Types.SET_BET,
            payload: {
                bet:res.data.bet,
                length: res.data.length
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