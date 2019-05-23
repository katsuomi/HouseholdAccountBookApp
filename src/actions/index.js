import { db } from '../components/firebase/firebase'
import * as firebase from 'firebase';
export const SIGNUP_USER = 'SIGNUP_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const PASS_WORD_RESET = 'PASS_WORD_RESET'
export const LOGOUT = 'LOGOUT'


export const signupuser = (email,password) => async dispatch => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(user => {
    console.log("SUCCESS")
  }, err => {
    console.log("ERROR")
    alert("新規登録できませんでした。")
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      let data = { email: user.email }
      db.collection('users').doc(user.uid).set(data);
      dispatch({type: SIGNUP_USER,uid: firebase.auth().currentUser.uid })
    } else {
      dispatch({type: SIGNUP_USER,uid: ""})
    }
  });
}

export const loginuser = (email,password) => async dispatch => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(user => {
    console.log("SUCCESS")
  }, err => {
    console.log("ERROR")
    alert("ログインできませんでした。")
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      dispatch({type: LOGIN_USER,uid: firebase.auth().currentUser.uid })
    } else {
      dispatch({type: LOGIN_USER,uid: ""})
    }
  });

}

export const logout = () => async dispatch => {
  firebase.auth().signOut()
  .then(_ => {
    console.log("success")
  }, err => {
    console.log("error")
  });
  dispatch({type: LOGOUT,uid: ""})
}

export const passwordreset = (email) => async dispatch => {  
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    console.log("成功")
  }).catch(function(error) {
    console.log(error)
  });
  dispatch({type: PASS_WORD_RESET})
}