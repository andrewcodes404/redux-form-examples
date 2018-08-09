import firebase from "firebase/app";
import 'firebase/database'
import uuidv1 from "uuid/v1"
// use axios to send PSOT/GET req
import axios from "axios";

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


// 1. Grab the file from the filelist in values
// 2. Create new FormData and add the file
// 3. append some other attr needed for cloudinary
// 4. send request with axios and grab the url from the response
// 5. add the url back over the image key
// 6. send  values on to firebase

export function uploadFileAC(values, callback){
    const theImageFile = values.image[0]   
    const formData = new FormData();
    formData.append("file", theImageFile)
    formData.append("upload_preset", "from_react")

    axios.post('https://api.cloudinary.com/v1_1/dcqi9fn2y/upload', formData)
        .then(function (response) {
            console.log("response.data.secure_url : ", response.data.secure_url);
            const url = response.data.secure_url
            
            values.image = url
            const userId = uuidv1()
            firebase.database().ref(userId).set(values)
                .then(() => callback())
        })
        .catch(function (error) {
            console.log(error);
        });

    
}