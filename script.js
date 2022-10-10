"use strict";
const cities = [];
const fetchData = (mode) => {
    cities.length = 0;
    console.log(mode);
    switch (mode) {
        case 'AT':
            fetch('./AT/zipcodes.at.json')
                .then((blob) => blob.json())
                .then((data) => cities.push(...data));
            break;
        case 'DE':
            fetch('./DE/zipcodes.de.json')
                .then((blob) => blob.json())
                .then((data) => cities.push(...data));
            break;
        case 'CH':
            fetch('./CH/zipcodes.ch.json')
                .then((blob) => blob.json())
                .then((data) => cities.push(...data));
            break;
        default:
            break;
    }
};
const findMatches = (wordToMatch, cities) => {
    return cities.filter((town) => {
        const regex = new RegExp(wordToMatch, 'gi'); // match global and and insensitive
        return town.place.match(regex) || town.zipcode.match(regex);
    });
};
const displayMatches = () => {
    const matchArray = findMatches(searchInput === null || searchInput === void 0 ? void 0 : searchInput.value, cities);
    const html = matchArray
        .map((town) => {
        const regex = new RegExp(searchInput === null || searchInput === void 0 ? void 0 : searchInput.value, 'gi');
        const cityName = town.place.replace(regex, `<span class="hl">${(searchInput === null || searchInput === void 0 ? void 0 : searchInput.value.charAt(0).toUpperCase()) +
            (searchInput === null || searchInput === void 0 ? void 0 : searchInput.value.slice(1))}</span>`);
        const zipCode = town.zipcode.replace(regex, `<span class="hl">${searchInput === null || searchInput === void 0 ? void 0 : searchInput.value}</span>`);
        return `
      <li>
        <span class="name">${cityName}, ${zipCode}</span>
        <span class="community">${town.community}</span>
      </li>
    `;
    })
        .join('');
    suggestions.innerHTML = html;
};
const selectElement = document.getElementById('countryList');
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const countrySelector = document.getElementById('countryList');
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('change', displayMatches);
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('keyup', displayMatches);
countrySelector.addEventListener('change', () => {
    fetchData(selectElement.value);
}, false);
fetchData(selectElement.value);
//# sourceMappingURL=script.js.map