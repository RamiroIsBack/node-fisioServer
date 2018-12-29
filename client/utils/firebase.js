import "firebase/auth";
import "firebase/firebase-storage";
import firebase from "firebase/app";

var storageRef = undefined;
var storage = undefined;

const loginFirebase = (firebaseObject, actionType) => {
  return dispatch => {
    firebase.initializeApp(firebaseObject.firebaseConfig);
    storage = firebase.storage();
    storageRef = storage.ref();
    firebase
      .auth()
      .signInWithEmailAndPassword(
        firebaseObject.firebaseUser.email,
        firebaseObject.firebaseUser.password
      )
      .then(result => {
        console.log(`${result.user.email} ha iniciado sesion`);
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
