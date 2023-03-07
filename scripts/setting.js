"use strict";

const submitBtn = document.getElementById("btn-submit");
const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");

let currentSetting = JSON.parse(getFromStorage(keySetting));
if (!currentSetting)
  currentSetting = {
    // nếu ko có thì cài mặc đinh
    pageSize: "5",
    catelogy: "General",
  };

// đặt mặc định trên trang
pageSizeInput.value = currentSetting.pageSize;
for (let i = 0; i < categoryInput.options.length; i++) {
  if (categoryInput.options[i].text === currentSetting.catelogy) {
    categoryInput.options[i].setAttribute("selected", true);
  }
}

submitBtn.addEventListener("click", function () {
  let setting = {
    pageSize: Number(pageSizeInput.value),
    category: categoryInput.value,
  };
  console.log(setting);
  currentSetting = setting;
  saveToStorage(keySetting, JSON.stringify(setting));
  alert("okay");
});
