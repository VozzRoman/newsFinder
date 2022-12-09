

const inputEl = document.querySelector('.enter-input');
const buttonEl = document.querySelector('.button');
const containerNews = document.querySelector('.container-news');

const API_KEY = '758eaee05362425590906fb4540c32ad';

buttonEl.addEventListener('click', onButtonSearch);

let searchQery = '';
function onButtonSearch(e) {
    e.preventDefault();
   inputEl.value.innerHTML = '';
    searchQery = inputEl.value;
    
    console.log(searchQery);
    getFetch(searchQery);
    
};

function getFetch(query) {
    const urlApi = `https://newsapi.org/v2/everything?q=${query}&from=2022-12-01&apiKey=${API_KEY}`
    fetch(urlApi)
        .then(response => {
            return response.json()
        })
        .then(response => renderMarkUp(response.articles))
        .catch(error => console.log(error));

   
}

function renderMarkUp(articles) {
     const markUp = articles.map(item => {
        return `
         <li class="list-news">
            <article id="">
                <img src="${item.urlToImage}" alt="${item.title}" width="300" height="200">
                <h2>${item.title}</h2>
                <p>${item.publishedAt}</p>
                <a href="${item.url}" >link to source</a>
            </article>
        </li>
        `
    }).join('');
    containerNews.insertAdjacentHTML('beforeend', markUp)
}

