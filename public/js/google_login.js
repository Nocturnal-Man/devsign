console.log("시작");
var ID;
$("#BTN_GOOGLE_LOGIN").click(function b() {
    console.log("버튼 눌림");
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function () {
                $('#AUTH_STATE').text(result.user.displayName + "님 로그인 하셨습니다");
                console.log("login완료")
                $('#AUTH_STATE_FACE').text("sentiment_very_satisfied");
                document.getElementById("AUTH_STATE_FACE").style.color = "blue";
                document.getElementById("BTN_SET_EQUIP").style.display = "inline-block";
                var userId = firebase.auth().currentUser.uid;

                ID = userId;
                console.log(ID + "입니다.");
                firebase.database().ref(userId).set(userId);
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(error.message);
            }).catch(function (error) {
                alert(error.message);
            });
    });
    return ID;
    console.log("끝");
});
