import {
    SUBMIT_INCOME,READ_INCOMES
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
        default:
            return state
    }
}
