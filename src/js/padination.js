// import API from './fetchCountries.js'
import tamplate from '../template.hbs';

function fetchCountries(searchQuery) {
    fetch(`https://restcountries.com/v2/name/${searchQuery}?pageSize=10`)
    .then(responce => responce.json()
    .then(console.log));
}


const formRef = document.querySelector('.js-search-form');
const container = document.querySelector('.js-card-container');

formRef.addEventListener('input', onSearchCountry);

function onSearchCountry(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.elements.query.value; 
    fetchCountries(searchQuery)
    .then(renderCountriesTamplate)
    .catch(err =>console.log(err)
    .finally(() => form.reset))
}
function renderCountriesTamplate(country) {
    const markup = tamplate(country);
    container.insertAdjacentHTML('beforeend', markup)
    console.log(markup);
}