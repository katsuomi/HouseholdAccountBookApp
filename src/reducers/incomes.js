import {
    SUBMIT_INCOME
} from '../actions'

  
const initialState = { }
  
export default (state = initialState, action) => {
    switch (action.type){
        case SUBMIT_INCOME:
            return state
        default:
            return state
    }
}
