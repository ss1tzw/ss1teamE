import Auth from "./firebaseConfig.js";
const authregist = (mailv, passv, pass2v) => {
  //メールアドレスとパスワードの登録
  if (passv === pass2v) {
    //パスの確認

    Auth.createUserWithEmailAndPassword(mailv, passv).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
    });
  } else {
    alert("確認パスが違います");
  }
};

export default authregist;
