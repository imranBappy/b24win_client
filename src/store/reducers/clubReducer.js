import * as Types from '../actions/types';
const init = {
    club: []
}
const clubReducer = (state = init, action) =>{
    switch (action.type) {
        case Types.SET_CLUB:
            return {
                club: action.payload.club
            }
        default:
            return state
    }
}

export default clubReducer