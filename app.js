import  firebase from 'firebase/app';
import "firebase/storage";

import {upload} from './upload.js'

const firebaseConfig = {
  apiKey: "AIzaSyBfOuMp69aEh8KpzxUCM1hjMzom2HFPgmg",
  authDomain: "fe-upload-1-e9096.firebaseapp.com",
  projectId: "fe-upload-1-e9096",
  storageBucket: "fe-upload-1-e9096.appspot.com",
  messagingSenderId: "635883241753",
  appId: "1:635883241753:web:50397d3379406273a58588"
};




firebase.initializeApp(firebaseConfig)


let storage = firebase.storage()






upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, blocks) {
        console.log(`files: ${files}`);
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`);
            const task = ref.put(file); 

            task.on('state_changed', snapshot => {
                const percent = ~~(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percent + '%';
                block.style.width = percent + '%';
            }, error => {
                console.log('Error:  ' + error)
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log('Download URL, ' + url)
                })
            })
        });
    }
})