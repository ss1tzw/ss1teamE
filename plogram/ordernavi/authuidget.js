import Auth from "./firebaseConfig.js";
const uidget = () => {
  const user = Auth.currentUser;
  let uid;
  if (user !== null) {
    uid = user.uid;
    return uid;
  }
};

export default uidget;
