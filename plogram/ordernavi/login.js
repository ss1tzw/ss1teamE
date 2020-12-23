import logincheck from "./authlogincheck.js";
import authlogin from "./authlogin.js";
logincheck("userpage.html", "#");
const login = document.getElementById("inbutton");

login.addEventListener("click", () => {
  const mail = document.getElementById("textmail").value;
  const pass = document.getElementById("textpass").value;
  authlogin(mail, pass);
});
