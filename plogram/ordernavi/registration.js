import logincheck from "./authlogincheck.js";
import authregist from "./authregist.js";
const crebtn = document.getElementById("crebutton");
logincheck("userpage.html", "#");
crebtn.addEventListener("click", () => {
  const mail = document.getElementById("mail").value;
  const pass = document.getElementById("pass").value;
  const pass2 = document.getElementById("pass2").value;
  authregist(mail, pass, pass2);
});
