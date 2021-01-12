import Auth from "./firebaseConfig.js";
const logincheck = (login, nologin) => {
  Auth.onAuthStateChanged(function (user) {
    //ログイン状態確認
    if (user) {
      if (login !== "#") {
        location.href = login;
      }
    } else {
      // No user is signed in.
      if (nologin !== "#") {
        location.href = nologin;
      }
    }
  });
};

export default logincheck;
