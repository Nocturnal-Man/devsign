var config = {
  apiKey:"",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""
};
firebase.initializeApp(config);


var storage = firebase.storage();
var storageRef = storage.ref();

var imagesRef = storageRef.child('images');
var spaceRef = storageRef.child('images/logo.png');

var path = spaceRef.fullPath;
var name = spaceRef.name;
var imagesRef = spaceRef.parent;
