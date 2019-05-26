import {
    SEARCH_CATEGOLI
} from '../actions'

  
const initialState = { 
    result: ""
}
  
export default (state = initialState, action) => {
    switch (action.type){
        case SEARCH_CATEGOLI:
            return {
                result: action.result
            }
        default:
            return state
    }
}
