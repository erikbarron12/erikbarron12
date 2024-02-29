//parte1
//lista de personajes 
const charactersEl = document.getElementById('characters');
const nameFilterEl = document.getElementById('name-filter');
const statusFilterEl = document.getElementById('status-filter');
const loadMoreButton = document.getElementById('load-more-button');

let currentPage = 1;
const charactersPerPage = 20;


//parte2
//peticion para lista de nombre filtrada
async function getCharacters(name, status, page) {
  let url = `https://rickandmortyapi.com/api/character/?page=${page}`;

  if (name || status) {
    url += '&';
    if (name) {
      url += `name=${name}&`;
    }

    if (status) {
      url += `status=${status}`;
    }
  }
//filtrado y paguina 
  const response = await fetch(url);
  //convierte en en formato JSON
  const data = await response.json();
//resultado 
  return data.results;
}


//parte3
// mostrar personajes
async function displayCharacters(name, status) {
  //Limpiar el contenido del elemento 
  //Obtener los personajes 
  const characters = await getCharacters(name, status, currentPage);
  
//tarjetas
  charactersEl.innerHTML = '';

  // Renderizar los personajes
  for (let character of characters) {
    const card = document.createElement('div');
    card.classList.add('character-card');

    card.innerHTML = `
      <img src="${character.image}" />
      <h2>${character.name}</h2>
      <p>Status: ${character.status}</p>
      <p>Especie: ${character.species}</p>
    `;

    charactersEl.appendChild(card);
  }
//desavilitar funcion cargar mas en el caso de que no haya mas personajes 
  loadMoreButton.disabled = !(data.info.pages > currentPage);
}


//parte4
//funcion para cargar mas personajes 
async function loadMoreCharacters() {
  currentPage++;
  displayCharacters(nameFilterEl.value, statusFilterEl.value);
}

//llamar a los primeros personajes 
displayCharacters();

nameFilterEl.addEventListener('input', () => {
  currentPage = 1; // Resetear la página al filtrar
  displayCharacters(nameFilterEl.value, statusFilterEl.value);
});

statusFilterEl.addEventListener('change', () => {
  currentPage = 1; // Resetear la página al filtrar
  displayCharacters(nameFilterEl.value, statusFilterEl.value);
});

//evento cargar mas personajes 
loadMoreButton.addEventListener('click', loadMoreCharacters);

//
