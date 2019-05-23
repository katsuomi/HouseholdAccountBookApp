import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import reducer from './reducers'
import App from './components/App';
import SignupUser from './components/SignupUser';
import LoginUser from './components/LoginUser';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"

const enhancer = process.env.NODE_ENV === "development" ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
const store = createStore(reducer,enhancer)
console.log(store.getState())
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/signup_user" component={SignupUser} />
                <Route exact path="/login_user" component={LoginUser} />

            </Switch>
        </BrowserRouter>
    </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();


