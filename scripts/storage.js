"use strict";
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
function getFromStorage(key) {
  return localStorage.getItem(key);
}
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );

  return user;
}
