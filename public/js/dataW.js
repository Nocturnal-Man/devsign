console.log("data 쓰기 js 실행");

firebase.database().ref('USER/ID').set('NEW');
firebase.database().ref('USER/PASSWORD').set('NEW');
firebase.database().ref('USER/NAME').set('NEW');
firebase.database().ref('USER/PHONENUM').set('NEW');
firebase.database().ref('USER/SIGNDATE').set('NEW');
firebase.database().ref('USER/BIRTHDAY').set('NEW');

console.log("data 쓰기 js 종료");


console.log("변경 js 실행");
$("#BTN_SIGNUP").click(function () {
    console.log("변경버튼누름");

    var new_ID = $("#ID").val();
    var updates1 = {};
    firebase.database().ref('USER/ID').on('value',function(snapshot){
      var ID_config = snapshot.val();
      if(ID_config == "NEW"){}
      else {
        updates1['USER/ID'] = new_ID;
        firebase.database().ref().update(updates1);
        console.log("ID:%s 로 메시지변경", new_ID);
      }
    });

    var new_PASSWORD = $("#PASSWORD").val();
    var updates2 = {};
    firebase.database().ref('PASSWORD/PASSWORD').on('value',function(snapshot){
      var PASSWORD_config = snapshot.val();
      if(PASSWORD_config == "NEW"){}
      else {
        updates2['USER/PASSWORD'] = new_PASSWORD;
        firebase.database().ref().update(updates2);
        console.log("password:%s 로 메시지변경", new_PASSWORD);
      }
    });

    var new_FIRSTNAME = $("#Name").val();
    var updates3 = {};
    firebase.database().ref('USER/NAME').on('value',function(snapshot){
      var NAME_config = snapshot.val();
      if(NAME_config == "NEW"){}
      else{
        updates3['USER/NAME'] = new_FIRSTNAME;
        firebase.database().ref().update(updates3);
        console.log("Name:%s 로 메시지변경", new_FIRSTNAME);
      }
    });

    var new_PHONENUM = $("#Phone_num").val();
    var updates4 = {};
    firebase.database().ref('USER/PHONENUM').on('value',function(snapshot){
      var PHONE_config = snapshot.val();
      if(PHONE_config == "NEW"){}
      else{
        updates5['USER/PHONENUM'] = new_PASSWORD;
        firebase.database().ref().update(updates4);
        console.log("phone:%s 로 메시지변경", new_PHONENUM);
      }
    });

    var new_BIRTHDAY = $("#Birth_Month").val();
    var updates5 = {};
    firebase.database().ref('USER/BIRTHDAY').on('value',function(snapshot){
      var BIRTHDAY_config = snapshot.val();
      if(BIRTHDAY_config == "NEW"){}
      else{
        updates5['USER/BIRTHDAY'] = new_PASSWORD;
        firebase.database().ref().update(updates5);
        console.log("birthday:%s 로 메시지변경", new_BIRTHDAY);
      }
    });
    console.log("변경 js 종료");
});
