const searchBtn = document.getElementById("search-btn");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const apiKey = "pub_19581912549fa66bf1d47db2974ff330dc204";
let apiURL = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=ca,gb,us`;
let language = "en";
var searchQuery = "world";
let newsCount = 0;

const selectLanguage = document.getElementById("language-select");

selectLanguage.addEventListener("change", async function (event) {
  language = event.target.value;
  fetchAndRenderNews();
});

function renderHtml(news) {
  let html = "";
  if (news) {
    news
      .filter((card, index) => {
        let start = (currentPage - 1) * pageSize;
        let end = currentPage * pageSize;

        if (index >= start && index < end) return true;
      })
      .forEach((news) => {
        html += `
         <div onclick="window.location.href ='${
           news.link
         }'" class="card" id="card">

        <img src="${
          news.image_url ? news.image_url : "img.jpg"
        }"alt="image" class="image"/>
        <div class="card_text">
          <p class="title">${news.title} </p>

          <p class="news-text">${
            news.description
              ? news.description
              : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam molestias dicta sint? Fuga accusamus earum, c"
          }</p>
        </div>
        <div class="bottom-info">
          <div class="date">${formattedDate(news.pubDate)}</div>
          <div class="info-type">${news.category}</div>
        </div>

      </div>`;
      });
    document.getElementById("card").innerHTML = html;
  }
}

fetchAndRenderNews();

// pagination
let pageSize = 4;
let currentPage = 1;
next.addEventListener("click", function nextPage() {
  if (currentPage * pageSize < newsCount) currentPage++;
  fetchAndRenderNews();
});
prev.addEventListener("click", function prevPage() {
  if (currentPage > 1) currentPage--;
  fetchAndRenderNews();
});

//! search**********************************************

searchBtn.addEventListener("click", async function searchNews() {
  searchQuery = document.getElementById("search-input").value.trim();
  await fetchAndRenderNews();
});

function getUrl() {
  return `${apiURL}&language=${language}&q=${searchQuery}`;
}

async function fetchFromApi(url) {
  try {
    const res = await fetch(url);
    const newsData = await res.json();
    return newsData.results;
  } catch (err) {
    console.log(err);
  }
}

async function fetchAndRenderNews() {
  console.log(searchQuery);
  let url = getUrl();
  let result = await fetchFromApi(url);
  newsCount = result.length;
  console.log(result);
  renderHtml(result);
}

//! ****** butoni sogody->loading...
(function () {
  const linkButton = document.createElement("a");
  linkButton.innerText = "Sogody";
  linkButton.setAttribute("href", "https://sogody.com");
  const newsTitle = document.querySelector(".news-title");

  linkButton.addEventListener("click", () => {
    linkButton.innerHTML = "Loading...";
  });

  setTimeout(() => {
    newsTitle.append(linkButton);
  }, Math.random * 2000);
})();

// date format
function formattedDate(str) {
  var ops = { year: "numeric" };
  ops.month = ops.day = "2-digit";
  return new Date(str).toLocaleDateString(ops);
}
