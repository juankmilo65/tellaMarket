import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  // apiKey: "AIzaSyCQjxOeig-6bzMW1g1yMXarKpoOYzJaqmw",
  // authDomain: "tellamachines.firebaseapp.com",
  // databaseURL: "https://tellamachines.firebaseio.com",
  // projectId: "tellamachines",
  // storageBucket: "tellamachines.appspot.com",
  // messagingSenderId: "762949691937",
  // appId: "1:762949691937:web:043b23663160a576"

  apiKey: "AIzaSyDPv44r04rFaOFqRjoKNiyP65jh5RDt_qk",
  authDomain: "tellamarkettest.firebaseapp.com",
  databaseURL: "https://tellamarkettest.firebaseio.com",
  projectId: "tellamarkettest",
  storageBucket: "tellamarkettest.appspot.com",
  messagingSenderId: "878870201945",
  appId: "1:878870201945:web:415fdbe5688f511b691348",
  measurementId: "G-5N93GRXBGV"
};

firebase.initializeApp(config);
const storage = firebase.storage();

export { storage, firebase as default };
