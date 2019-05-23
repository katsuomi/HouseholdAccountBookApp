import {
    SIGNUP_USER,LOGIN_USER,LOGOUT,PASS_WORD_RESET
} from '../actions'

  
const initialState = { 
    currentuser_uid: ""
}
  
export default (state = initialState, action) => {
    switch (action.type){
        case SIGNUP_USER:
            return {
                currentuser_uid: action.uid,
            }
        case LOGIN_USER:
            return {
                currentuser_uid: action.uid,
            }
        case LOGOUT:
        return {
            currentuser_uid: action.uid,
        }
        case PASS_WORD_RESET:
            return state
        default:
            return state
    }
}
