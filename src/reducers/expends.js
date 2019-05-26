import {
    SUBMIT_EXPEND
} from '../actions'

  
const initialState = { }
  
export default (state = initialState, action) => {
    switch (action.type){
        case SUBMIT_EXPEND:
            return state
        default:
            return state
    }
}
