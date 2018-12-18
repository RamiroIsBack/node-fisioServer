import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-storage";

var config = {
  apiKey: "AIzaSyAHzW4IhoBC01Ymd9ufcddAgmYot08uODg",
  authDomain: "fisiob-f5aca.firebaseapp.com",
  projectId: "fisiob-f5aca",
  storageBucket: "fisiob-f5aca.appspot.com"
};
firebase.initializeApp(config);

var storage = firebase.storage();
var storageRef = storage.ref();

const loginFirebase = (user, actionType) => {
  return dispatch =>
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(result => {
        console.log(`${result.email} ha iniciado sesion`);
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "authOk", // can be null
            data: true // usuario subido correctamente
          });
        }
      })
      .catch(error => {
        console.log(`el error es ${error.code}: ${error.message}`);
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "error", // can be null
            data: false // usuario subido correctamente
          });
        }
      });
};
const subirFoto = (id, archivo, actionType) => {
  return dispatch => {
    storageRef
      .child("carousel/" + archivo.name)
      .put(archivo)
      .then(snapshot => {
        return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
      })
      .then(downloadURL => {
        if (actionType !== null) {
          return dispatch({
            type: actionType,
            params: id, // can be null
            data: downloadURL // usuario subido correctamente
          });
        }
      })
      .catch(error => {
        console.log("error en la carga de la imagen" + error);
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: id, // can be null
            data: { error } // usuario subido correctamente
          });
        }
      });
  };
};
export default {
  loginFirebase,
  subirFoto
};
