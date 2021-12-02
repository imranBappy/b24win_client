import * as Types from '../actions/types';
const init = {
    bet:[], length: 0
}
const betReducer = (state = init, action) =>{
    switch (action.type) {
        case Types.SET_BET:return{
            bet: action.payload.bet,
            length: action.payload.length
        }
        default: return state
    }
}

export default betReducer;