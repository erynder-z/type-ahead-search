"use strict";
const cities = [];
fetch('./DE/zipcodes.de.json')
    .then((blob) => blob.json())
    .then((data) => cities.push(...data));
function findMatches(wordToMatch, cities) {
    return cities.filter((town) => {
        // here we need to figure out if the place or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return town.place.match(regex) || town.zipcode.match(regex);
    });
}
function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray
        .map((town) => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = town.place.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = town.zipcode.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="community">${town.community}</span>
      </li>
    `;
    })
        .join('');
    suggestions.innerHTML = html;
}
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('change', displayMatches);
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('keyup', displayMatches);
//# sourceMappingURL=script.js.map