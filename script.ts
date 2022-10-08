const cities: any = [];

fetch('./DE/zipcodes.de.json')
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

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
        `<span class="hl">${searchInput?.value}</span>`
      );
      const stateName = town.zipcode.replace(
        regex,
        `<span class="hl">${searchInput?.value}</span>`
      );
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="community">${town.community}</span>
      </li>
    `;
    })
    .join('');
  suggestions!.innerHTML = html;
};

const searchInput: HTMLFormElement | null = document.querySelector('.search');
const suggestions: HTMLLIElement | null =
  document.querySelector('.suggestions');

searchInput?.addEventListener('change', displayMatches);
searchInput?.addEventListener('keyup', displayMatches);
