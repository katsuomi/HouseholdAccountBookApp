import { db } from '../components/firebase/firebase'
import * as firebase from 'firebase';
import axios from 'axios';

export const SIGNUP_USER = 'SIGNUP_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const PASS_WORD_RESET = 'PASS_WORD_RESET'
export const LOGOUT = 'LOGOUT'
export const READ_CURRENT_USER = 'READ_CURRENT_USER'
export const SUBMIT_EXPEND = 'SUBMIT_EXPEND'
export const SUBMIT_INCOME = 'SUBMIT_INCOME'
export const SEARCH_EXPENDS_CATEGOLI = 'SEARCH_EXPENDS_CATEGOLI'
export const SEARCH_INCOMES_CATEGOLI = 'SEARCH_INCOMES_CATEGOLI'
export const READ_GRAPH = 'READ_GRAPH'
export const READ_INCOMES = 'READ_INCOMES'
export const READ_EXPENDS = 'READ_EXPENDS'
export const READ_NEWS = 'READ_NEWS'
export const DELETE_INCOME = "DELETE_INCOME"
export const DELETE_EXPEND = "DELETE_EXPEND"
export const UPDATE_INCOME = "UPDATE_INCOME"
export const UPDATE_EXPEND = "UPDATE_EXPEND"




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
  let Today = String(new Date().getFullYear())+"年"+String(new Date().getMonth()+1)+"月"+String(new Date().getDate())+"日"
  let data_expends = {}
  let data_expends_graph = {}
  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("expends")
  .get()
  .then(querySnapshot => {
    data_expends = { expend: expend,categoli: categoli,user_id: firebase.auth().currentUser.uid,created_at: Today,id: querySnapshot.size}
    data_expends_graph = { amount: -expend,categoli: categoli,user_id: firebase.auth().currentUser.uid,expend_id: querySnapshot.size}
    db.collection("users").doc(firebase.auth().currentUser.uid).collection("expends").doc().set(data_expends)
  })

  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("graph")
  .get()
  .then(querySnapshot => {
    data_expends_graph.id = querySnapshot.size;
    db.collection("users").doc(firebase.auth().currentUser.uid).collection("graph").doc().set(data_expends_graph)
  })


  dispatch({type: SUBMIT_EXPEND})
}

export const submitIncome = (income,categoli) => async dispatch => {  
  income = Number(income)
  let Today = String(new Date().getFullYear())+"年"+String(new Date().getMonth()+1)+"月"+String(new Date().getDate())+"日"
  let data_incomes = {}
  let data_incomes_graph = {}
  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("incomes")
  .get()
  .then(querySnapshot => {
    data_incomes = { categoli: categoli,income: income,user_id: firebase.auth().currentUser.uid,created_at: Today,id: querySnapshot.size}
    data_incomes_graph = { categoli: categoli,amount: income,user_id: firebase.auth().currentUser.uid,income_id: querySnapshot.size }
    db.collection("users").doc(firebase.auth().currentUser.uid).collection("incomes").doc().set(data_incomes)
  })

  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("graph")
  .get()
  .then(querySnapshot => {
    data_incomes_graph.id = querySnapshot.size;
    db.collection("users").doc(firebase.auth().currentUser.uid).collection("graph").doc().set(data_incomes_graph)
  })

  dispatch({type: SUBMIT_INCOME})
}


export const searchExpendsCategoli = (categoli_value) => async dispatch => {  
  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("expends").where("categoli", "==", categoli_value)
  .get()
  .then(querySnapshot => {
    if(querySnapshot.size == 0){
      dispatch({type: SEARCH_EXPENDS_CATEGOLI})
    }else{
      dispatch({type: SEARCH_EXPENDS_CATEGOLI,result: categoli_value})
    }
  })
  .catch(function(error) {
    dispatch({type: SEARCH_EXPENDS_CATEGOLI})
  });
}


export const searchIncomesCategoli = (categoli_value) => async dispatch => {  
  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("incomes").where("categoli", "==", categoli_value)
  .get()
  .then(querySnapshot => {
    if(querySnapshot.size == 0){
      dispatch({type: SEARCH_INCOMES_CATEGOLI})
    }else{
      dispatch({type: SEARCH_INCOMES_CATEGOLI,result: categoli_value})
    }
  })
  .catch(function(error) {
    dispatch({type: SEARCH_INCOMES_CATEGOLI})
  });
}


export const readGraph = () => async dispatch => {  
  let results = []
  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("graph").orderBy("id")
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

  dispatch({type: READ_GRAPH,graph_results: graph_results})
}


export const readIncomes = () => async dispatch => {  
  let your_incomes = []
  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("incomes").orderBy("id")
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(function(doc){
      your_incomes.push({categoli: doc.data().categoli,income: doc.data().income,created_at: doc.data().created_at,id: doc.data().id })
    });
  })
  .catch(function(error) {
  });

  dispatch({type: READ_INCOMES,your_incomes: your_incomes})
}

export const readExpends = () => async dispatch => {  
  let your_expends = []
  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("expends").orderBy("id")
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(function(doc){
      your_expends.push({categoli: doc.data().categoli,expend: doc.data().expend,created_at: doc.data().created_at,id: doc.data().id })
    });
  })
  .catch(function(error) {
  });
  dispatch({type: READ_EXPENDS,your_expends: your_expends})
}


export const readNews = () => async dispatch => {  
  let news = []
  await axios.get("https://newsapi.org/v2/everything?q=稼ぎ方&apiKey=830354c9cfd14c28a30b95d598ee1298")
  .then(response => { 
    for (  let i = 0;  i < response.data.articles.length+1 ;  i++  ){
      news.push({ title: response.data.articles[i].title,image_url: response.data.articles[i].urlToImage,description: response.data.articles[i].description,url: response.data.articles[i].url})
    }
  })
  .catch(error => {
  });
  dispatch({type: READ_NEWS,news: news})
}

export const deleteIncome = (id) => async dispatch => {  
  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("incomes").where("id", "==",id)
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(function(doc){
      db.collection("users").doc(firebase.auth().currentUser.uid).collection("incomes").doc(doc.id).delete()
    });
  })
  .catch(function(error) {
  });

  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("graph").where("income_id", "==",id)
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(function(doc){
      db.collection("users").doc(firebase.auth().currentUser.uid).collection("graph").doc(doc.id).delete()
    });
  })
  .catch(function(error) {
  });

  dispatch({type: DELETE_INCOME})
}

export const deleteExpend = (id) => async dispatch => {  
  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("expends").where("id", "==",id)
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(function(doc){
      db.collection("users").doc(firebase.auth().currentUser.uid).collection("expends").doc(doc.id).delete()
    });
  })
  .catch(function(error) {
  });

  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("graph").where("expend_id", "==",id)
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(function(doc){
      db.collection("users").doc(firebase.auth().currentUser.uid).collection("graph").doc(doc.id).delete()
    });
  })
  .catch(function(error) {
  });

  dispatch({type: DELETE_EXPEND})
}


export const updateIncome = (income,categoli,id) => async dispatch => {  
  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("incomes").where("id", "==",id)
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(function(doc){
      db.collection("incomes").doc(doc.id).update({income: Number(income),categoli: categoli})
    });
  })
  .catch(function(error) {
  });

  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("graph").where("income_id", "==",id)
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(function(doc){
      db.collection("users").doc(firebase.auth().currentUser.uid).collection("graph").doc(doc.id).update({amount: Number(income),categoli: categoli})
    });
  })
  .catch(function(error) {
  });

  dispatch({type: UPDATE_INCOME})
}

export const updateExpend = (expend,categoli,id) => async dispatch => {  
  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("expends").where("id", "==",id)
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(function(doc){
      db.collection("users").doc(firebase.auth().currentUser.uid).collection("expends").doc(doc.id).update({expend: Number(expend),categoli: categoli})
    });
  })
  .catch(function(error) {
  });

  await db.collection("users").doc(firebase.auth().currentUser.uid).collection("graph").where("expend_id", "==",id)
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(function(doc){
      db.collection("users").doc(firebase.auth().currentUser.uid).collection("graph").doc(doc.id).update({amount: -Number(expend),categoli: categoli})
    });
  })
  .catch(function(error) {
  });

  dispatch({type: UPDATE_EXPEND})
}