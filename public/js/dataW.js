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
    firebase.database().ref('USER/ID').on('value', function (snapshot) {
        var new_ID = $("#ID").val();
        var updates1 = {};
        var ID_config = snapshot.val();
        if (ID_config = "NEW") {
            updates1['USER/ID'] = new_ID;
            firebase.database().ref().update(updates1);
            console.log("ID:%s 로 메시지변경", new_ID);
        } else {

        }
    });

    firebase.database().ref('PASSWORD/PASSWORD').on('value', function (snapshot) {
        var new_PASSWORD = $("#PASSWORD").val();
        var updates2 = {};
        var PASSWORD_config = snapshot.val();
        if (PASSWORD_config == "NEW") {
            updates2['USER/PASSWORD'] = new_PASSWORD;
            firebase.database().ref().update(updates2);
            console.log("password:%s 로 메시지변경", new_PASSWORD);
        } else {
            
        }
    });


    firebase.database().ref('USER/NAME').on('value', function (snapshot) {
        var new_FIRSTNAME = $("#Name").val();
        var updates3 = {};
        var NAME_config = snapshot.val();
        if (NAME_config == "NEW") {
            updates3['USER/NAME'] = new_FIRSTNAME;
            firebase.database().ref().update(updates3);
            console.log("Name:%s 로 메시지변경", new_FIRSTNAME);
        } else {

        }
    });


    firebase.database().ref('USER/PHONENUM').on('value', function (snapshot) {
        var new_PHONENUM = $("#Phone_num").val();
        var updates4 = {};
        var PHONE_config = snapshot.val();
        if (PHONE_config == "NEW") {
            updates4['USER/PHONENUM'] = new_PASSWORD;
            firebase.database().ref().update(updates4);
            console.log("phone:%s 로 메시지변경", new_PHONENUM);
        } else {

        }
    });

    firebase.database().ref('USER/BIRTHDAY').on('value', function (snapshot) {
        var new_BIRTHDAY = $("#Birth_Month").val();
        var updates5 = {};
        var BIRTHDAY_config = snapshot.val();
        if (BIRTHDAY_config == "NEW") {
            updates5['USER/BIRTHDAY'] = new_PASSWORD;
            firebase.database().ref().update(updates5);
            console.log("birthday:%s 로 메시지변경", new_BIRTHDAY);
        } else {

        }
    });
    console.log("변경 js 종료");
});
