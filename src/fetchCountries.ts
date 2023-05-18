import { ICountry } from "./appTypes";

const params:string[] = ['name', 'capital', 'population', 'flags', 'languages'];

export function fetchCountries(name:string):Promise<ICountry[]> {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=${params}`).then(response => response.json())
}
