import firebase from "firebase/app";
import 'firebase/database'
import uuidv1 from "uuid/v1"
// use axios to send PSOT/GET req
// import axios from "axios";

import { FETCH_DATA } from '../actions/actionConstants'
import { firebaseConfig } from '../config'

// create firebase instance and set db ref
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export function fetchDataAC() {
    return dispatch => {
        database.ref().once('value')
            .then(snapshot => {
                dispatch({
                    type: FETCH_DATA,
                    payload: snapshot.val()
                })
            })
    }
}

export function uploadDataAC(values, callback) {
    const userId = uuidv1()

    firebase.database().ref(userId).set(values)
        .then(() => callback())
}