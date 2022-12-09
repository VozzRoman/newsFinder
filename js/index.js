

const inputEl = document.querySelector('.enter-input');
const buttonEl = document.querySelector('.button');
const containerNews = document.querySelector('.container-news');
const loadButton = document.querySelector('.load-button');




const API_KEY = '758eaee05362425590906fb4540c32ad';

let page = 1;
const pageSize = 10;
let totalPage = null;

loadButton.addEventListener('click', onLoadClick);

function onLoadClick() {

	if (page < totalPage) {
		getFetch(searchQery, pageSize, page);
	} else {
		alert('You reached maximum result')
	}
	
	page = Number(page) + 1;
}

buttonEl.addEventListener('click', onButtonSearch);

let searchQery = '';
function onButtonSearch(e) {
    e.preventDefault();
	if (Number(page) < totalPage) {
			loadButton.classList.add('active');
	} else {
		loadButton.classList.remove('active');
		}
    searchQery = inputEl.value;
    console.log(searchQery);
	getFetch(searchQery, pageSize, page);
	clearContainer();
	inputEl.value = '';
};

function getFetch(query, size, number) {
    const urlApi = `https://newsapi.org/v2/everything?q=${query}&from=2022-12-01&apiKey=${API_KEY}&pageSize=${size}&page=${number}`
    fetch(urlApi)
        .then(response => {
            return response.json()
        })
		 .then(response => {
			 
			 renderMarkUp(response.articles);
			 calculateTotalPage(response.totalResults);
		 })
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

function calculateTotalPage(value) {
	totalPage = Math.floor((value > 100 ? 100 : value) / pageSize);
	console.log(totalPage);
}

function clearContainer() {
	containerNews.innerHTML = '';
}


	
