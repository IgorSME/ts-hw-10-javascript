import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('input#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY));

function onInputValue(e) {
  if (e.target.value === '') {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
    return;
  }
  const inputValue = e.target.value.trim();
  fetchCountries(inputValue).then(onFetchSuccess).catch(onFetchError);
}
function onFetchSuccess(response) {
  if (response.length > 10) {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';

    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if ( response.length > 1 && response.length < 11) {
    refs.info.innerHTML = '';
    refs.list.innerHTML = markupList(response);
  } else {
    refs.list.innerHTML = '';
    refs.info.innerHTML = markupInfo(response);
  }
}

function onFetchError() {
  Notify.failure('Oops, there is no country with that name');
}

function markupList(arr) {
  return arr
    .map(({flags,name}) => {
      return `<li><img src="${flags.svg}" alt=""><p>${name.official}</p></li>`;
    })
    .join('');
}

function markupInfo(arr) {
  return arr
    .map(({ name, flags, capital, languages, population }) => {
      return `<h2><span>Country :</span> ${name.official}</h2>
<img src="${flags.svg}" alt="">
<p><span>Capital :</span> ${capital}</p>
<p><span>Population :</span> ${population}</p>
<p><span>Languag(s) :</span> ${Object.values(languages).join(',')}</p>
`;
    })
    .join('');
}