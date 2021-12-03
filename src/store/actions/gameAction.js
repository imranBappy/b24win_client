import axios from 'axios';
import * as Types from './types';

export const allGameGetAction = (type) => async dispatch => {
    try {
        const game = await axios.get(`https://b24win.herokuapp.com/game/get-game?type=${type?type:'0'}`);
        dispatch({
            type: Types.SET_GAME,
            payload: {
                game: game.data.game || []
            }
        })
    } catch (error) {
        console.dir({error});
        dispatch({
            type: Types.SET_ALERT,
            payload: {
                message:'There was an error', error: true
            }
        })
    }
}