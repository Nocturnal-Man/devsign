var config = {
  apiKey:"AIzaSyCB-UAilnsfNeHFcPZTAGwVK5dxDZ5n6F0",
      authDomain: "devsign-a7066.firebaseapp.com",
      databaseURL: "https://devsign-a7066.firebaseio.com",
      projectId: "devsign-a7066",
      storageBucket: "devsign-a7066.appspot.com",
      messagingSenderId: "1098166753532"
};
firebase.initializeApp(config);


var storage = firebase.storage();
var storageRef = storage.ref();

var imagesRef = storageRef.child('images');
var spaceRef = storageRef.child('images/logo.png');

var path = spaceRef.fullPath;
var name = spaceRef.name;
var imagesRef = spaceRef.parent;


uploadTask