const cities: any = [];

const fetchData = (mode: string): void => {
  cities.length = 0;
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

const findMatches = (wordToMatch: string | RegExp, cities: any[]): any[] => {
  return cities.filter((town: { place: string; zipcode: string }) => {
    const regex = new RegExp(wordToMatch, 'gi'); // match global and and insensitive
    return town.place.match(regex) || town.zipcode.match(regex);
  });
};

const displayMatches = (): void => {
  const matchArray = findMatches(searchInput?.value, cities);
  const html = matchArray
    .map((town: { place: string; zipcode: string; community: any }) => {
      const regex = new RegExp(searchInput?.value, 'gi');
      const cityName = town.place.replace(
        regex,
        `<span class="hl">${
          searchInput?.value.charAt(0).toUpperCase() +
          searchInput?.value.slice(1)
        }</span>`
      );
      const zipCode = town.zipcode.replace(
        regex,
        `<span class="hl">${searchInput?.value}</span>`
      );
      return `
      <li>
        <span class="name">${cityName}, ${zipCode}</span>
        <span class="community">${town.community}</span>
      </li>
    `;
    })
    .join('');
  suggestions!.innerHTML = html;
};

const selectElement = <HTMLInputElement>document.getElementById('countryList');
const searchInput: HTMLFormElement | null = document.querySelector('.search');
const suggestions: HTMLLIElement | null =
  document.querySelector('.suggestions');
const countrySelector: HTMLElement = document.getElementById('countryList')!;

searchInput?.addEventListener('change', displayMatches);
searchInput?.addEventListener('keyup', displayMatches);
countrySelector.addEventListener(
  'change',
  () => {
    fetchData(selectElement.value);
  },
  false
);

fetchData(selectElement.value);
