import logincheck from "./authlogincheck.js";
import authlogin from "./authlogin.js";
logincheck("userpage.html", "#");
const login = document.getElementById("inbutton");
var reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
login.addEventListener("click", () => {
    if (document.getElementById("textmail").value == "") {
        alert("メールアドレスが入力されていません")
    } else if (!reg.test(document.getElementById("textmail").value)) {
        alert("メールアドレスの形式が正しくありません")
    } else if (document.getElementById("textpass").value == "") {
        alert("パスワードが入力されていません")
    } else if (document.getElementById("textpass").value.length < 7) {
        alert("パスワードは7文字以上です")
    } else {
        const mail = document.getElementById("textmail").value;
        const pass = document.getElementById("textpass").value;
        authlogin(mail, pass);
    }
});