import {
    SUBMIT_EXPEND,READ_EXPENDS
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
        default:
            return state
    }
}
