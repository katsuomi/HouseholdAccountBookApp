import {
    SUBMIT_EXPEND,READ_EXPENDS,DELETE_EXPEND,UPDATE_EXPEND
} from '../actions'

  
const initialState = {your_expends: []}
  
export default (state = initialState, action) => {
    switch (action.type){
        case SUBMIT_EXPEND:
            return state
        case READ_EXPENDS:
            return {
                your_expends: action.your_expends
            }
        case DELETE_EXPEND:
            return state
        case UPDATE_EXPEND:
            return state
        default:
            return state
    }
}
