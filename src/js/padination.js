import API from './fetchCountries.js'
import tamplate from "../template/template.hbs"
import { error } from '@pnotify/core';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const debounce = require('lodash.debounce');

const formRef = document.querySelector('.js-search-form');
const container = document.querySelector('.js-card-container');

formRef.addEventListener('input', debounce(onSearchCountry, 500));

function onSearchCountry(event) {
    event.preventDefault();
  const form = event.target;
  const searchQuery = form.value;

  API.fetchCountries(searchQuery)
    .then(renderCountriesTamplate)
    .catch(err => console.log(err));
}

function renderCountriesTamplate(country) {
  if (!country) return clearInput();

  if (country.length >= 10) {
    error({
      title: 'Incorrect request!',
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 2000,
    });

    clearInput();
    return;
  }

  if (country.length >= 2 && country.length < 10) {
    const listName = country
    .map(el => {
      return `<li><h3>${el.name}</h3></li>`;
    }).join('')
    return (container.innerHTML = listName); 
  }
  //   const countries = document.querySelector('.country');
  //   const listName = country.map(el => {
  //     return `<div class="country">
  //     <li>
  // <h1>${el.name}</h1>
  // <img src=${el.flag} alt='flag' width='340' />
  // <h3>Capital:</h3>
  // <p>${el.capital}</p>
  // <h3>Population:</h3>
  // <p> ${el.population}</p>
  // <ol>
  // <h3>Languages:</h3>
  // <li class="item">${el.languages}</li>
  // {{/each}}
  // </ol>
  // </li>
  //   </div>`;
    
  //    });
    
  //   countries.addEventListener('click', event => {
  //   if(event.target.textContent === 'countries') {
   
  //  console.log(listName); 
  //  return (container.innerHTML = listName); 
  //   }

  //   })
  //   }

  if (country.length === 1) {
    clearInput();

    const markup = tamplate(country);
    container.insertAdjacentHTML('beforeend', markup);

    formRef.reset();
    return;
  }

  error({
    title: 'Incorrect request!',
    text: 'Not found!',
    delay: 2000,
  });

  formRef.reset();
}
function clearInput() {
  container.innerHTML = '';
} 