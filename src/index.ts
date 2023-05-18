import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ICountry, IRefs } from './appTypes';


const DEBOUNCE_DELAY = 300;

const refs:IRefs = {
    input: document.querySelector('input#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
}

if(refs.input){
  refs.input.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY));
}


function onInputValue(e:Event):void {
  const target = e.target as HTMLInputElement;
  if (target.value === '') {
    clearContent()
    return;
  }
  const inputValue = target.value.trim();
  fetchCountries(inputValue).then(onFetchSuccess).catch(onFetchError);
}
function onFetchSuccess(response:ICountry[]):void {
  if (response.length > 10) {
    clearContent();

    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if ( response.length > 1 && response.length < 11) {
    clearInfo();
   if(refs.list) refs.list.innerHTML = markupList(response);
  } else {
    clearList();
    if(refs.info) refs.info.innerHTML = markupInfo(response);
  }
}

function onFetchError():void {
  Notify.failure('Oops, there is no country with that name');
}

function markupList(arr:ICountry[]):string {
  return arr
    .map(({flags,name}:ICountry) => {
      return `<li><img src="${flags.svg}" alt=""><p>${name.official}</p></li>`;
    })
    .join('');
}

function markupInfo(arr:ICountry[]):string {
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
function clearContent(): void {
  clearList();
  clearInfo();
}
function clearList(): void {
  if (refs.list) refs.list.innerHTML = '';
}

function clearInfo(): void {
  if (refs.info) refs.info.innerHTML = '';
}