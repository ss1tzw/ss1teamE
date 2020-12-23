import logincheck from "./authlogincheck.js";
const start = document.getElementById("start");

start.addEventListener("click", () => {
  logincheck("userpage.html", "login.html");
});
