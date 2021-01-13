import logincheck from "./authlogincheck.js";
import authregist from "./authregist.js";
logincheck("userpage.html", "#");
const crebtn = document.getElementById("crebutton");
var reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
crebtn.addEventListener("click", () => {
    if (document.getElementById("name").value == "") {
        alert("名前が入力されていません")
    } else if (document.getElementById("mail").value == "") {
        alert("メールアドレスが入力されていません")
    } else if (!reg.test(document.getElementById("mail").value)) {
        alert("メールアドレスの形式が正しくありません")
    } else if (document.getElementById("pass").value == "") {
        alert("パスワードが入力されていません")
    } else if (document.getElementById("pass").value.length < 7) {
        alert("パスワードは7文字以上です")
    } else if (document.getElementById("pass2").value == "") {
        alert("パスワードの確認が入力されていません")
    } else if (document.getElementById("pass2").value.length < 7) {
        alert("パスワードは7文字以上です")
    } else {
        const name = document.getElementById("name").value;
        const mail = document.getElementById("mail").value;
        const pass = document.getElementById("pass").value;
        const pass2 = document.getElementById("pass2").value;
        authregist(mail, pass, pass2, name);
    }
});