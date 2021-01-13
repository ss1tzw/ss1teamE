import Auth from "./firebaseConfig.js";
const authregist = (mailv, passv, pass2v, name) => {
  if (passv === pass2v) {
    Auth.createUserWithEmailAndPassword(mailv, passv)
      .then(() => {
        const user = Auth.currentUser;
        if (user !== null) {
          user.updateProfile({
            displayName: name,
          });
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("会員登録に失敗しました");
      });
  } else {
    alert("確認パスが違います");
  }
};

export default authregist;
