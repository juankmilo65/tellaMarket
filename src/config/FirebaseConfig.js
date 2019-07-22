import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCQjxOeig-6bzMW1g1yMXarKpoOYzJaqmw",
  authDomain: "tellamachines.firebaseapp.com",
  databaseURL: "https://tellamachines.firebaseio.com",
  projectId: "tellamachines",
  storageBucket: "",
  messagingSenderId: "762949691937",
  appId: "1:762949691937:web:043b23663160a576"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
