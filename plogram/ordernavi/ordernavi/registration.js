import logincheck from "./authlogincheck.js";
import authregist from "./authregist.js";
logincheck("userpage.html", "#");
const crebtn = document.getElementById("crebutton");
crebtn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const mail = document.getElementById("mail").value;
  const pass = document.getElementById("pass").value;
  const pass2 = document.getElementById("pass2").value;
  authregist(mail, pass, pass2,name);
});
