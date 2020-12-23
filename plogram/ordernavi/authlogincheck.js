import Auth from "./firebaseConfig.js";
const logincheck = (login, nologin) => {
  Auth.onAuthStateChanged(function (user) {
    //ログイン状態確認
    if (user) {
      console.log("ログイン中");
      if (login !== "#") {
        location.href = login;
      }
    } else {
      // No user is signed in.
      console.log("ログインなし");
      if (nologin !== "#") {
        location.href = nologin;
      }
    }
  });
};

export default logincheck;
