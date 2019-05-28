import {
    READ_NEWS
} from '../actions'

  
const initialState = {news: []}
  
export default (state = initialState, action) => {
    switch (action.type){
        case READ_NEWS:
            return {
                news: action.news
            }
        default:
            return state
    }
}
