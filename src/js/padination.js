import API from './fetchCountries.js'
import tamplate from "../template/template.hbs"

const debounce = require('lodash.debounce');

const formRef = document.querySelector('.js-search-form');
const container = document.querySelector('.js-card-container');
console.log(formRef);
formRef.addEventListener('input', onSearchCountry);

function onSearchCountry(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.elements.query.value;
    API.fetchCountries(searchQuery)
    .then(renderCountriesTamplate)
    .catch(err =>console.log(err)
    .finally(() => form.reset))
}
function renderCountriesTamplate(country) {
    const markup = tamplate(country);
    container.insertAdjacentHTML('beforeend', markup)
    
}