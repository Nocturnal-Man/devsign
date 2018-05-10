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
    if (new_ID == NULL) {
        alert("아이디가 입력되지 않았습니다.");
        console.log("ID가 입력되지 않음", new_ID);
    } else {
        updates1['USER/ID'] = new_ID;
        firebase.database().ref().update(updates1);
        console.log("ID:%s 로 메시지변경", new_ID);
    }

    var new_PASSWORD = $("#PASSWORD").val();
    var updates2 = {};
    if (new_PASSWORD == NULL) {
        alert("패스워드가 입력되지 않았습니다.");
        console.log("PASSWORD가 입력되지 않음", new_ID);
    } else {
        updates2['USER/PASSWORD'] = new_PASSWORD;
        firebase.database().ref().update(updates2);
        console.log("password:%s 로 메시지변경", new_PASSWORD);
    }


    var new_FIRSTNAME = $("#Name").val();
    var updates3 = {};
    if (new_FIRSTNAME == NULL) {
        alert("이름이 입력되지 않았습니다.");
        console.log("ID가 입력되지 않음", new_ID);
    } else {
        updates3['USER/NAME'] = new_FIRSTNAME;
        firebase.database().ref().update(updates3);
        console.log("Name:%s 로 메시지변경", new_FIRSTNAME);
    }


    var new_PHONENUM = $("#Phone_num").val();
    var updates4 = {};
    if (new_PHONENUM == NULL) {
        alert("전화번호가 입력되지 않았습니다.");
        console.log("ID가 입력되지 않음", new_ID);
    } else {
        updates5['USER/PHONENUM'] = new_PASSWORD;
        firebase.database().ref().update(updates4);
        console.log("phone:%s 로 메시지변경", new_PHONENUM);
    }

    var new_BIRTHDAY = $("#Birth_Month").val();
    var updates5 = {};
    if (new_PHONENUM == NULL) {
        alert("전화번호가 입력되지 않았습니다.");
        console.log("ID가 입력되지 않음", new_ID);
    } else {
        updates5['USER/BIRTHDAY'] = new_PASSWORD;
        firebase.database().ref().update(updates5);
        console.log("birthday:%s 로 메시지변경", new_BIRTHDAY);
    }
    console.log("변경 js 종료");
});
