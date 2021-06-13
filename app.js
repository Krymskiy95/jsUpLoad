import firebase from "firebase";
import 'firebase/storage'
import {upload} from "./upload";

const firebaseConfig = {
    apiKey: "AIzaSyCHBCKMltKdqexnnK_ke42Jv9Znwn2x97w",
    authDomain: "fe-upload-afb1e.firebaseapp.com",
    projectId: "fe-upload-afb1e",
    storageBucket: "fe-upload-afb1e.appspot.com",
    messagingSenderId: "463670955544",
    appId: "1:463670955544:web:44880c01131132ec283d6d"
}

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()


upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.gif'],
    onUpload(files, blocks) {
       files.forEach((file,index) => {
           const ref = storage.ref(`images/${file.name}`)
           const task = ref.put(file)

           task.on('state_changed', snapshot => {
               const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
               const block = blocks[index].querySelector('.preview-info-progress')
               block.textContent = percentage
               block.style.width = percentage
           },error => {
               console.log(error)
           }, () => {
               task.snapshot.ref.getDownloadURL().then(url => {
                   console.log('DOWN', url)
               })
           })
       })
    }
})

