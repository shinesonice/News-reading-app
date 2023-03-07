"use strict";

const userArr = JSON.parse(getFromStorage(keyUserArr)) || [];
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const message = document.getElementById("welcome-message");
const logOutBtn = document.getElementById("btn-logout");

const user = JSON.parse(getFromStorage(currentUser));

// kiểm tra login
function checkLoginAccount(user) {
  for (let i = 0; i < userArr.length; i++) {
    if (
      userArr[i].userName === user.userName &&
      userArr[i].password === user.password
    ) {
      return true;
    }
  }
  return false;
}

function deleteCurentUser() {
  localStorage.removeItem(currentUser);
}

// check loginned
if (user) {
  // check login
  if (checkLoginAccount(user)) {
    // logined successful
    loginModal.classList.add("hidden");
    message.innerHTML = `Welcome ${user.firstName}`;
  } else {
    // erase currentUser and show login and register
    loginModal.classList.remove("hidden");
    mainContent.classList.add("hidden");
  }
} else {
  // if no user then show login
  loginModal.classList.remove("hidden");
  mainContent.classList.add("hidden");
}

// click logout
logOutBtn.addEventListener("click", function () {
  deleteCurentUser();
  window.location = "index.html";
});
