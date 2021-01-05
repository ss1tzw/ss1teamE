import Auth from "./firebaseConfig.js";
export const uidget = () => {
  const user = Auth.currentUser;
  if (user !== null) {
    const uid = user.uid;
    return uid;
  }
};

export const nameget = () => {
  const user = Auth.currentUser;
  if (user !== null) {
    const name = user.displayName;
    return name;
  }
}



