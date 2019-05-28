import { combineReducers } from 'redux'
import { reducer as form } from "redux-form"
import users from './users'
import expends from './expends'
import incomes from './incomes'
import searches from './searches'
import graphs from './graphs'
import news from './news'

export default combineReducers({form,users,expends,searches,graphs,incomes,news })


