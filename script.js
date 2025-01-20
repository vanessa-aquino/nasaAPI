const API_KEY = 'ganXrCtU7xy2IrDzqxzbpCmS6WDSM2nXTpbiRnJe';
const spanToday = document.getElementById('day');

// APOD API
const apodURl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
const imageDay = document.getElementById('image');
const description = document.getElementById('description');
const title = document.getElementById('title');
// Neows API
const neowsUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=${API_KEY}`;
const asteroidsNext = document.getElementById('asteroids_next');
const asteroidsList = document.getElementById('asteroids_list');

// Data
const today = new Date();
const day = today.getDate().toString().padStart(2, '0');
const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
const year = today.getFullYear();
const formatedDate = `${day}/${month}/${year}`;
spanToday.innerText = formatedDate;

// Requisição APOD APi
fetch(apodURl)
 .then(response => response.json())
 .then(data => {
    title.textContent = data.title;
    imageDay.src = data.hdurl;
    description.textContent = data.explanation;
 })
 .catch(err => console.error('Erro ao carregar a imagem', err));

 // Requisição NEOWS API
fetch(neowsUrl)
.then(response => response.json())
.then(data => {
    const asteroids = data.near_earth_objects;
    asteroidsNext.textContent = `Quantidade de asteroides próximos: ${data.element_count}`;

    for (const date in asteroids) {
        asteroids[date].forEach(asteroid => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            const distanceKm = asteroid.close_approach_data[0].miss_distance.kilometers;
            const linkInformations = asteroid.nasa_jpl_url;

            li.textContent = `${asteroid.name} - Distância: ${distanceKm} km `;
            span.innerText = `Para saber mais sobre esse asteroide, acesse: ${linkInformations}`
            asteroidsList.appendChild(li);
            li.appendChild(span);
        });
    }
})
.catch(err => console.error('Erro ao carregar asteroides: ', err));