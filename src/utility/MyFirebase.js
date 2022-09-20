// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {child, get, getDatabase, push, ref, remove, set} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  # PUT YOUR CONFIG HERE
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const rootRef = ref(database, "/");

function getRoot() {
    return get(rootRef);
}

function pushValue(newValue) {
    return push(rootRef, newValue);
}

function setValue(key, value) {
    set(child(rootRef, key), value);
}

function removeValue(key) {
    remove(child(rootRef, key))
}

export {getRoot, pushValue, removeValue, setValue};
