"use strict";

const link = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=4&page=1&apiKey=1c4db6896e4b41329515f40cddb2a4ec`;
const newsContainer = document.getElementById("news-container");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");

//localStorage.removeItem(keySetting);

let setting = JSON.parse(getFromStorage(keySetting));
console.log(setting);
if (!setting) {
  setting = {
    pageSize: 5,
    category: "General",
  };
}

// ẩn nút prev
prevBtn.style.display = "none";

let totalResults;

const dataLink = {
  pageSize: setting.pageSize,
  apiKey: "1c4db6896e4b41329515f40cddb2a4ec",
  mainLink: "https://newsapi.org/v2/top-headlines?country=us",
  category: setting.category,
};

function renderData(data) {
  totalResults = data.totalResults;
  let elements = "";
  console.log(data);
  for (let i = 0; i < data.articles.length; i++) {
    let element = `
    <div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            src="${data.articles[i].urlToImage}"
            class="card-img"
            alt=""
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
            ${data.articles[i].title}
            </h5>
            <p class="card-text">
            ${data.articles[i].description}
            </p>
            <a
              href="${data.articles[i].url}"
              class="btn btn-primary"
              >View</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    elements += element;
  }
  // console.log(elements);
  newsContainer.innerHTML = elements;
}

async function getDataNews(link) {
  const response = await fetch(link);
  const data = await response.json();
  return data;
}

(async function () {
  let dataNews = await getDataNews(
    `${dataLink.mainLink}&pageSize=${setting.pageSize}&page=1&category=${dataLink.category}&apiKey=${dataLink.apiKey}`
  );
  console.log(
    `${dataLink.mainLink}&pageSize=${setting.pageSize}&page=1&category=${dataLink.category}&apiKey=${dataLink.apiKey}`
  );
  renderData(dataNews);
})();

nextBtn.addEventListener("click", async function () {
  let currentPage = Number(pageNum.innerHTML) + 1;

  // lấy dữ liệu tại currentpage và render
  const dataNews = await getDataNews(
    `${dataLink.mainLink}&pageSize=${setting.pageSize}&page=${currentPage}&category=${dataLink.category}&apiKey=${dataLink.apiKey}`
  );
  pageNum.innerHTML = currentPage;

  // nếu đến cuối dữ liệu thì ẩn nút next đi
  if (currentPage * dataLink.pageSize >= totalResults) {
    nextBtn.style.display = "none";
  }

  // chắc chắn bây giờ ko phải ở đầu trang nên phải hiện nút prevBtn
  prevBtn.style.display = "block";

  renderData(dataNews);
});

prevBtn.addEventListener("click", async function () {
  let currentPage = Number(pageNum.innerHTML) - 1;

  // lấy dữ liệu tại currentpage và render
  const dataNews = await getDataNews(
    `${dataLink.mainLink}&pageSize=${setting.pageSize}&page=${currentPage}&category=${dataLink.category}&apiKey=${dataLink.apiKey}`
  );
  pageNum.innerHTML = currentPage;

  // nếu đến đầu dữ liệu thì ẩn nút prev đi
  if (currentPage <= 1) {
    prevBtn.style.display = "none";
  }

  // chắc chắn bây giờ ko phải ở cuối trang nên phải hiện nút nextBtn
  nextBtn.style.display = "block";

  renderData(dataNews);
});
