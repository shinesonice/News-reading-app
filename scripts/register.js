"use strict";

const userArr = JSON.parse(getFromStorage(keyUserArr)) || [];
const submitBtn = document.getElementById("btn-submit");
const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordConfirmInput = document.getElementById("input-password-confirm");

function validate(user) {
  let checked = true;
  // check empty
  checked = user.firstName && user.lastName && user.userName && user.password;
  if (!checked) {
    alert("đừng để trống ô nào!");
    return checked;
  }

  // check username
  for (let i = 0; i < userArr; i++) {
    if (userArr[i].userName === user.userName) {
      alert("username của bạn bị trùng!");
      return false;
    }
  }

  // check password
  if (user.password.length < 8) {
    alert("mật khẩu phải hơn 8 kí tự");
    return false;
  }

  if (user.password !== passwordConfirmInput.value) {
    alert("mật khẩu phải trùng với mật khẩu dưới");
    return false;
  }
  return true;
}

// click register
submitBtn.addEventListener("click", function () {
  const user = new User();
  user.firstName = firstNameInput.value;
  user.lastName = lastNameInput.value;
  user.userName = userNameInput.value;
  user.password = passwordInput.value;

  // validate data user
  if (validate(user)) {
    userArr.push(user);
    saveToStorage(keyUserArr, JSON.stringify(userArr));
    window.location = "../pages/login.html";
  }
});
