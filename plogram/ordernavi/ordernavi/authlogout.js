import Auth from "./firebaseConfig.js";
const logout = () => {
  Auth.signOut()
    .then(function () {
      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened.
      console.log("Err");
    });
};

export default logout;
