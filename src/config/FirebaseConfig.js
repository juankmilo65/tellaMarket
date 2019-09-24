import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {};

firebase.initializeApp(config);
const storage = firebase.storage();

export { storage, firebase as default };
