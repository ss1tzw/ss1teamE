const firebaseConfig = {
apiKey: "AIzaSyDOowwu1rXaWF82yJYqx2GtevVUIB3eLWc",
    authDomain: "ordernavilogin.firebaseapp.com",
    databaseURL: "https://ordernavilogin.firebaseio.com",
    projectId: "ordernavilogin",
    storageBucket: "ordernavilogin.appspot.com",
    messagingSenderId: "42905569448",
    appId: "1:42905569448:web:afbe3be6f2867d3daeda9d",
    measurementId: "G-W03DYBDXCD"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const Auth = firebase.auth()

export default Auth;


