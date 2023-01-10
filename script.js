const searchBtn = document.getElementById("search-btn");
const card = document.getElementById("card");
const input = document.querySelector(".search-control");
const sLink = document.querySelector(".news-title a");
const nextPage = document.querySelector(".next");
const prevPage = document.querySelector(".prev");
let currentPage = 1;

//! BBC button -> loading...************************
sLink.addEventListener("click", function () {
  sLink.innerText = "Loading...";
  console.log("Loading...");
});

const options = {
  method: "GET",
  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Key": "f9536e4d34msh4731d58698a3aecp160f1fjsn1ddb862668ab",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  },
};

// date format
function formattedDate(str) {
  var ops = { year: "numeric" };
  ops.month = ops.day = "2-digit";
  return new Date(str).toLocaleDateString(ops);
}

//! implement news cards**********************************************
function getNewsList() {
  fetch(
    "https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      let html = "";
      if (response.value) {
        response.value.forEach((card) => {
          html += `
          <div onclick="window.location.href ='${
            card.url
          }'" class="card first_card" id="card">
       
          <img src="${
            card.image?.thumbnail?.contentUrl
              ? card.image.thumbnail.contentUrl
              : "img.png"
          }"alt="image" class="image"/>
          <div class="card_text">
            <p class="title">${card.name} </p>

            <p class="news-text">${card.description}</p>
          </div>
          <div class="bottom-info">
            <div class="date">${formattedDate(card.datePublished)}</div>
            <div class="info-type">${card._type}</div>
          </div>
         
         
        </div>`;
        });
      }
      card.innerHTML = html;
    })

    .catch((err) => console.error(err));
}

//! implement search**********************************************
input.addEventListener("keypress", searchNews);
searchBtn.addEventListener("click", searchNews);
function searchNews() {
  let searchInputTxt = document.getElementById("search-input").value.trim();

  fetch(
    `https://bing-news-search1.p.rapidapi.com/news/search?q=${searchInputTxt}&freshness=Day&textFormat=Raw&safeSearch=Off`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      if (searchInputTxt.length > 0) {
        let html = "";
        if (response.value) {
          response.value.forEach((card) => {
            html += `
          <div onclick="window.location.href ='${
            card.url
          }'" class="card first_card" id="card">
       
          <img src="${
            card.image?.thumbnail?.contentUrl
              ? card.image.thumbnail.contentUrl
              : "img.png"
          }"alt="image" class="image"/>
          <div class="card_text">
            <p class="title">${card.name} </p>

            <p class="news-text">${card.description}</p>
          </div>
          <div class="bottom-info">
            <div class="date">${formattedDate(card.datePublished)}</div>
            <div class="info-type">${card._type}</div>
          </div>
         
         
        </div>`;
          });
        }
        card.innerHTML = html;
      }
    })
    .catch((err) => console.error(err));
}

//! pag scheme ************************************************
nextPage.addEventListener("click", function () {
  currentPage++;
  paginate(currentPage, 4);
  console.log("next");
});

prevPage.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
  }
  paginate(currentPage, 4);
  console.log("prev");
});

function paginate(pageNumber, pageSize) {
  let offset = (pageNumber - 1) * pageSize;
  fetch(
    `https://bing-news-search1.p.rapidapi.com/news?count=${pageSize}&offset=${offset}&safeSearch=Off&textFormat=Raw`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response.value);
      let html = "";
      if (response.value) {
        response.value.forEach((card) => {
          html += `
          <div onclick="window.location.href ='${
            card.url
          }'" class="card first_card" id="card">

          <img src="${
            card.image?.thumbnail?.contentUrl
              ? card.image.thumbnail.contentUrl
              : "img.png"
          }"alt="image" class="image"/>
          <div class="card_text">
            <p class="title">${card.name} </p>

            <p class="news-text">${card.description}</p>
          </div>
          <div class="bottom-info">
            <div class="date">${formattedDate(card.datePublished)}</div>
            <div class="info-type">${card._type}</div>
          </div>

        </div>`;
        });
      }
      card.innerHTML = html;
    })
    .catch((err) => console.error(err));
}
