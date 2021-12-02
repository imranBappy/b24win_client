import * as Types from '../actions/types';
const init = {
    game: []
}
const gameReducer = (state = init, action) =>{
    switch (action.type) {
        case Types.SET_GAME:
            return{
                game: action.payload.game
            }
    
        default:
            return state
    }
}
export default gameReducer;