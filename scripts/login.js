"use strict";
const userArr = JSON.parse(getFromStorage(keyUserArr)) || [];
const submitBtn = document.getElementById("btn-submit");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");

function validate(user) {
  if (!(user.userName && user.password)) {
    alert("Bạn nhập thiếu thông tin rồi");
    return false;
  }
  return true;
}

submitBtn.addEventListener("click", function () {
  const user = {
    userName: userNameInput.value,
    password: passwordInput.value,
  };
  let checked = false;
  if (validate(user)) {
    for (let i = 0; i < userArr.length; i++) {
      if (
        userArr[i].userName === user.userName &&
        userArr[i].password === user.password
      ) {
        // save currentUser
        saveToStorage(currentUser, JSON.stringify(userArr[i]));
        checked = true;
        break;
      }
    }
    if (!checked) {
      alert("đăng nhập thất bại");
    } else {
      window.location = "/../index.html";
    }
  }
});
