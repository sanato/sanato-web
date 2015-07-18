var instantoApp = document.getElementById("instanto-app");
var loginApp = document.getElementById("login-app");
var introApp = document.getElementById("intro-app");

setTimeout(function() {
  if (localStorage.getItem("instanto_token")) {
    introApp.classList.add("hidden");
    loginApp.classList.add("hidden");
    instantoApp.classList.remove("hidden");
  } else {
    introApp.classList.add("hidden");
    loginApp.classList.remove("hidden");
    instantoApp.classList.add("hidden");
  }
}, 5000);