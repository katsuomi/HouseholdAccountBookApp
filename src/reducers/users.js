import {
    SIGNUP_USER,LOGIN_USER,LOGOUT,PASS_WORD_RESET,READ_CURRENT_USER,READ_USERS
} from '../actions'

  
const initialState = { 
    currentuser_uid: "",
    currentuser_email: "",
    users: []
}
  
export default (state = initialState, action) => {
    switch (action.type){
        case SIGNUP_USER:
            return {
                currentuser_uid: action.uid,currentuser_email: action.email
            }
        case LOGIN_USER:
            return {
                currentuser_uid: action.uid,currentuser_email: action.email
            }
        case LOGOUT:
            return {
                currentuser_uid: action.uid,
            }
        case READ_CURRENT_USER:
            return {
                currentuser_uid: action.uid,currentuser_email: action.email
            }
        case PASS_WORD_RESET:
            return state
        case READ_USERS:
            return {
                users: action.users
            }
        default:
            return state
    }
}
