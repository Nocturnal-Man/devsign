       var config = {
           apiKey: "AIzaSyCB-UAilnsfNeHFcPZTAGwVK5dxDZ5n6F0",
           authDomain: "devsign-a7066.firebaseapp.com",
           databaseURL: "https://devsign-a7066.firebaseio.com",
           projectId: "devsign-a7066",
           storageBucket: "devsign-a7066.appspot.com",
           messagingSenderId: "1098166753532"
       };
       firebase.initializeApp(config);

       var uploader = document.getElementById('uploader');
       var fileButton = document.getElementById('fileButton');

       $("#fileButton").addEventListener('change', function (e) {
           //Get file
           var file = e.target.files[0];

           //Create a Stoarge
           var storageRef = firebase.storage().ref('Folder/' + file.name);

           var userId = firebase.auth().currentUser.uid;
           console.log("유저 아이디" + userId);

           var task = storageRef.put(file);
           var newMetadata = {
               contetType: 'image/jpeg'
           }
           var fileRef = storageRef.chiled('Folder/' + file.name);

           task.on('state_change'function progress(snapshot) {

                   fileRef.updateMetadata(newMetadata).then(function (metadata) {

                   }).catch(function (error) {

                   });
                   var percentage = (snapshot.byteTransferred / snapshot.totalBytes) * 100;
                   uploader.value = percentage;
               },
               function error(err) {

               },
               function complere() {

               });
       });
