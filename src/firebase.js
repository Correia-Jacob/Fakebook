import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCMQLK1nAnXVn3wJF9wqSxit0cQZG9dRWU",
    authDomain: "facebook-6f47c.firebaseapp.com",
    projectId: "facebook-6f47c",
    storageBucket: "facebook-6f47c.appspot.com",
    messagingSenderId: "787872234692",
    appId: "1:787872234692:web:6772b4f2b8157e87059d91",
    measurementId: "G-59W56RJNN7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()

export { auth, provider }
export default db