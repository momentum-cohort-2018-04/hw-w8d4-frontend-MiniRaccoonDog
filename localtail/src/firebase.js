import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

var config = {
  apiKey: 'AIzaSyBCfivEbfE3M2W5kKhBeGj0bu0A-OotELg',
  authDomain: 'localtail-pets.firebaseapp.com',
  databaseURL: 'https://localtail-pets.firebaseio.com',
  projectId: 'localtail-pets',
  storageBucket: 'localtail-pets.appspot.com',
  messagingSenderId: '170231668624'
}

firebase.initializeApp(config)

export default firebase
