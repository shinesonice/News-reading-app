"use strict";

// key
const keyUserArr = "userArr";
const currentUser = "currentUser";
const keyTodo = "todo";
const keySetting = "setting";

class User {
  firstName;
  lastName;
  #userName;
  #passWord;
  constructor(firstName, lastName, userName, passWord) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.#userName = userName;
    this.#passWord = passWord;
  }
}

class Task {
  task;
  owner;
  isDone = false;
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
