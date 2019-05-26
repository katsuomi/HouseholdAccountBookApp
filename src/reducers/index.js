import { combineReducers } from 'redux'
import { reducer as form } from "redux-form"
import users from './users'
import expends from './expends'
import searches from './searches'

export default combineReducers({form,users,expends,searches })


