## NewsFeed App

### Tasks

This assignment requires implementing the following features:

- Implement news articles shown in the design folder
- Integrate the news article with the provided template
- Integrate the following news feed API with the implemented design
- Make sure that the finished assignment is visually consistent with the screenshots in the design folder
- Do not use any third party libraries or packages and please add all your html in index.html, your styling in style.css and your javascript in script.js

### Bing News Search API

[Bing News Search API](https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/bing-news-search1)

Please follow setup instructions below.

Authentication is done via RapidAPI. You will receive an API key that you'd have to pass into a HEADER.

Create a RapidAPI account. Go to rapidapi.com.
Go to the Pricing page of the Bing News Search API. Choose a Basic Plan. Just click on Select Plan button.

Go to Endpoint tab. Test any endpoint. You can choose Code Snippet for almost any programming language or terminal. Your unique API key will be already pasted.

For bonus tasks review the Header Parameters and Optional Parameters sections for each endpoint. Be aware there is a request per month limit.

### Bonus tasks

- Add a click event to the link element inside .news-title div, which changes the innerText from BBC to Loading... after a click
- Add a simple pagination scheme
- Add a search feature
- Add a language selection feature
