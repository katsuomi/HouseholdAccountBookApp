import {
    SUBMIT_INCOME,READ_INCOMES,DELETE_INCOME
} from '../actions'

  
const initialState = {your_incomes: []}
  
export default (state = initialState, action) => {
    switch (action.type){
        case SUBMIT_INCOME:
            return state
        case READ_INCOMES:
            return {
                your_incomes: action.your_incomes
            }
        case DELETE_INCOME:
            return state
        default:
            return state
    }
}
