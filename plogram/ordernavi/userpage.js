import logincheck from "./authlogincheck.js";
import logout from "./authlogout.js";
const logoutbtn = document.getElementById("outbutton");
logincheck("#", "login.html");
logoutbtn.addEventListener("click", logout);
