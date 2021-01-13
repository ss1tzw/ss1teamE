import Auth from "./firebaseConfig.js";

const authlogin = (mailv, passv) => {
    Auth.signInWithEmailAndPassword(mailv, passv).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("ログインに失敗しました");
    });
};

export default authlogin;