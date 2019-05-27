import { db } from '../components/firebase/firebase'
import * as firebase from 'firebase';
export const SIGNUP_USER = 'SIGNUP_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const PASS_WORD_RESET = 'PASS_WORD_RESET'
export const LOGOUT = 'LOGOUT'
export const READ_CURRENT_USER = 'READ_CURRENT_USER'
export const SUBMIT_EXPEND = 'SUBMIT_EXPEND'
export const SUBMIT_INCOME = 'SUBMIT_INCOME'
export const SEARCH_CATEGOLI = 'SEARCH_CATEGOLI'
export const GRAPH = 'GRAPH'

export const signupUser = (email,password) => async dispatch => {
  await firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(user => {
    console.log("SUCCESS")
  }, err => {
    console.log("ERROR")
    alert("新規登録できませんでした。")
  });

  await firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      let data = { email: user.email }
      db.collection('users').doc(user.uid).set(data);
      dispatch({type: SIGNUP_USER,uid: firebase.auth().currentUser.uid,email: firebase.auth().currentUser.email })
    } else {
      dispatch({type: SIGNUP_USER,uid: ""})
    }
  });
}

export const loginUser = (email,password) => async dispatch => {
  await firebase.auth().signInWithEmailAndPassword(email, password)
  .then(user => {
    console.log("SUCCESS")
  }, err => {
    console.log("ERROR")
    alert("ログインできませんでした。")
  });

  await firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      dispatch({type: LOGIN_USER,uid: firebase.auth().currentUser.uid,email: firebase.auth().currentUser.email })
    } else {
      dispatch({type: LOGIN_USER,uid: ""})
    }
  });

}

export const logout = () => async dispatch => {
  await firebase.auth().signOut()
  .then(_ => {
    console.log("SUCCESS")
  }, err => {
    console.log("error")
  });
  dispatch({type: LOGOUT,uid: ""})
}

export const passwordReset = (email) => async dispatch => {  
  await firebase.auth().sendPasswordResetEmail(email).then(function() {
    console.log("成功")
  }).catch(function(error) {
    console.log(error)
  });
  dispatch({type: PASS_WORD_RESET})
}

export const readCurrentUser = () => async dispatch => {  
  await firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      dispatch({type: READ_CURRENT_USER,uid: firebase.auth().currentUser.uid,email: firebase.auth().currentUser.email })
    } else {
      dispatch({type: READ_CURRENT_USER,uid: ""})
    }
  });
}

export const submitExpend = (expend,categoli) => async dispatch => {  
  expend = Number(expend)
  let data_expends = { expend: expend,categoli: categoli,user_id: firebase.auth().currentUser.uid,created_at: new Date()}
  db.collection('graph_data')
  .get()
  .then(querySnapshot => {
    let data_expends_graph = { amount: -expend,categoli: categoli,user_id: firebase.auth().currentUser.uid,id: querySnapshot.size}
    db.collection('graph_data').doc(String(new Date())).set(data_expends_graph)
  })
  await db.collection('expends').doc().set(data_expends)
  dispatch({type: SUBMIT_EXPEND})
}

export const submitIncome = (income) => async dispatch => {  
  income = Number(income)
  let data_incomes = { income: income,user_id: firebase.auth().currentUser.uid,created_at: new Date()}
  db.collection('graph_data')
  .get()
  .then(querySnapshot => {
    let data_incomes_graph = { categoli: "収入",amount: income,user_id: firebase.auth().currentUser.uid,id: querySnapshot.size }
    db.collection('graph_data').doc(String(new Date())).set(data_incomes_graph)
  })

  await db.collection('incomes').doc().set(data_incomes)
  dispatch({type: SUBMIT_INCOME})
}


export const searchCategoli = (categoli_value) => async dispatch => {  
  await db.collection("expends").where("categoli", "==", categoli_value)
  .get()
  .then(querySnapshot => {
    if(querySnapshot.size == 0){
      dispatch({type: SEARCH_CATEGOLI})
    }else{
      dispatch({type: SEARCH_CATEGOLI,result: categoli_value})
    }
  })
  .catch(function(error) {
    dispatch({type: SEARCH_CATEGOLI})
  });
}

export const graph = () => async dispatch => {  
  let results = []
  await db.collection("graph_data").where("user_id","==",firebase.auth().currentUser.uid)
  .get()
  .then(function(querySnapshot){
    querySnapshot.forEach(function(doc) {
      results.push({categoli: doc.data().categoli,amount: doc.data().amount })
    });
  })
  .catch(function(error) {
  });

  let graph_results =  [{"categoli": "",amount: 0}]
  var amount = 0
  results.map((result) => {
    amount = amount + result.amount
    graph_results.push({
      categoli: result.categoli,
      amount: amount 
    })
  })

  dispatch({type: GRAPH,graph_results: graph_results})
}