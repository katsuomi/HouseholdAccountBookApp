import {
    SEARCH_INCOMES_CATEGOLI,SEARCH_EXPENDS_CATEGOLI
} from '../actions'

  
const initialState = { 
    result: ""
}
  
export default (state = initialState, action) => {
    switch (action.type){
        case SEARCH_INCOMES_CATEGOLI:
            return {
                result: action.result
            }
        case SEARCH_EXPENDS_CATEGOLI:
            return {
                result: action.result
            }
        default:
            return state
    }
}
