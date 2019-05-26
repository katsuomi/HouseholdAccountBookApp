import { combineReducers } from 'redux'
import { reducer as form } from "redux-form"
import users from './users'
import expends from './expends'

export default combineReducers({form,users,expends })


