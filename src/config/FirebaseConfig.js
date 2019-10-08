import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCQjxOeig-6bzMW1g1yMXarKpoOYzJaqmw",
  authDomain: "tellamachines.firebaseapp.com",
  databaseURL: "https://tellamachines.firebaseio.com",
  projectId: "tellamachines",
  storageBucket: "tellamachines.appspot.com",
  messagingSenderId: "762949691937",
  appId: "1:762949691937:web:043b23663160a576"
};

firebase.initializeApp(config);
const storage = firebase.storage();

export { storage, firebase as default };
