import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyBQ_evbYzuquz33cgCaWw5ze9num4b9FN4",
    authDomain: "sellhays.firebaseapp.com",
    databaseURL: "https://sellhays.firebaseio.com",
    projectId: "sellhays",
    storageBucket: "sellhays.appspot.com",
    messagingSenderId: "239698753388"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const storage = firebase.storage()

// firestore collections
const sales = db.collection('sales')


export {
    auth,
    currentUser,
    storage,
    sales
}