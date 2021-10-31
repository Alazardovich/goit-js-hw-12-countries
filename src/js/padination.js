import API from './fetchCountries.js'
import tamplate from "../template/template.hbs"
import { error } from '@pnotify/core';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const debounce = require('lodash.debounce');

const formRef = document.querySelector('.js-search-form');
const container = document.querySelector('.js-card-container');
console.log(formRef);
formRef.addEventListener('input', onSearchCountry);

clearInput();
function onSearchCountry(event) {
    event.preventDefault();
    
    const form = event.currentTarget;
    const searchQuery = form.elements.query.value;
    API.fetchCountries(searchQuery)
    .then(renderCountriesTamplate)
    .catch(err =>console.log(err))
    // .finally(() => form.reset))
}
function renderCountriesTamplate(country) {
    
    if (!country.length) {
        error({
            title: 'Incorrect request!',
            text: 'Check if the country name is entered correctly',
            delay: 2000,
                });
                return clearInput();
    }
    else if (country.length >= 10) {
        error({
            title: 'Incorrect request!',
            text: 'Too many matches found. Please enter a more specific query!',
            delay: 2000,
                });
                return clearInput();
    }
    else if (country.length >=2 && country.length < 10) {
        const listName = country
      .map(el => {
        return `<li><h1>${el.name}</h1></li>`;
      })
      .join('');
        return container.insertAdjacentHTML('beforeend', listName);
    }
    else if (country.length < 2) {
        clearInput()
        const markup = tamplate(country);
        container.insertAdjacentHTML('beforeend', markup) 
    }
}
function clearInput(){
    container.innerHTML = '';
}