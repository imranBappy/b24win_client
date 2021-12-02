import * as Types from '../actions/types';
const init = {
    transfer: [], length: 0
}
const balanceTransferReducer = (state = init, action) =>{
    switch (action.type) {
        case Types.SET_TRANSFER:
            return {
                transfer: action.payload.transfer,
                length: action.payload.length
            }
        default:
            return state
    }
}

export default balanceTransferReducer