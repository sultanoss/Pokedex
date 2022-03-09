// a collection of API pokemos resource
// @source https://pokeapi.co/docs/v2#pokemon
// @ type {pokemon[]}


let allPokemons = [];


async function loadPokemons() {

    let url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    let response = await fetch(url);
    let namedAPIResourceList = await response.json();
    await fetchPokemons(namedAPIResourceList); // hier mit await warten wir bis die pokemons vom API rutergeladen sind.
    renderPokemons();

}

//  Calling any API endpoint without a resource ID or name will return a paginated list of available resources for that API.
//  By default, a list "page" will contain up to 20 resources.
//  If you would like to change this just add a 'limit' query parameter to the GET request, e.g. ?= 60.
//  You can use 'offset' to move to the next page, e.g.? limit = 60 & offset=60.

//  @source https://pokeapi.co/docs/v2#resource-listspagination-section
//  @ param {namedAPIResourceList} pokemons


async function fetchPokemons(namedAPIResourceList) {  //diese function fetcht die einzelne pokemons und pusht sie im allpokemens array 

    for (let i = 0; i < namedAPIResourceList['results'].length; i++) {
        let result = namedAPIResourceList['results'][i];
        let pokemonUrl = result['url'];
        let response2 = await fetch(pokemonUrl);
        let pokemon = await response2.json();
        allPokemons.push(pokemon);
    }
}


function renderPokemons() {

    document.getElementById('pokemon-card').innerHTML = '';
    for (let i = 0; i < allPokemons.length; i++) {
        renderHtml(i);
        getTypes(i);
    }
}


function renderHtml(i) {
    return document.getElementById('pokemon-card').innerHTML += `
    <div class="card-pok">
      <div id="card${i}" class="cards-head" onclick="showStats(${i})">
          <div class="card-nr-name">
            <span class="pokemon-name">${allPokemons[i]['name']}</span>
            <span class="nummber">#0${allPokemons[i]['id']}</span>
            <img src="${allPokemons[i]['sprites']['other']['home']['front_shiny']}">
          </div>
      </div>
      <div id="stats${i}" class="stats">
      </div>
    </div>
    `;
}


function getTypes(i) {

    for (let j = 0; j < allPokemons[i]['types'].length; j++) {
        let id = `card${i}`;
        document.getElementById(id).innerHTML += `
        <span class="name">${allPokemons[i]['types'][j]['type']['name']}<span>
        `;
    }
}


function showStats(i) {

    let closeSound = new Audio('audio/closeSound.wav');
    let id = `stats${i}`;
    document.getElementById(id).classList.add('d-show');
    getAboutStats();
    getBaseStats();
    closeSound.play();
}


async function getAboutStats() {

    for (let i = 0; i < allPokemons.length; i++) {

        renderHtml2(i);
        getAbilities(i);
    }
}


function renderHtml2(i) {
    let id = `stats${i}`;
    return document.getElementById(id).innerHTML = `
    <h3>About</h3>
    <div class="about-stats">
       <span>Species</span>  
       <span>${allPokemons[i]['species']['name']}</span>
    </div>
    <div class="about-stats">
       <span>Height</span>  
       <span>${(allPokemons[i]['height']) * 10} cm</span>
    </div>
    <div class="about-stats">
       <span>Weight</span>  
       <span>${(allPokemons[i]['weight']) / 10} kg</span>
    </div>
    <div id="ability${i}" class="ability">
        <span class="ability-titel">Abilities</span>
    </div>
    <h3>Base-Stats</h3>
    <div class="base-stats"id="base-stats${i}">
    </div>
    <img src="img/arrow-141-16.png" onclick="hideStats(${i})">
   `;
}


function getAbilities(i) {

    for (let k = 0; k < allPokemons[0]['abilities'].length; k++) {
        let id2 = `ability${i}`;
        document.getElementById(id2).innerHTML += `
      <span>${allPokemons[0]['abilities'][k]['ability']['name']}</span>,
    `;
    }
}


async function getBaseStats() {

    for (let i = 0; i < allPokemons.length; i++) {

        getStats(i);
    }
}


function getStats(i) {

    for (let l = 0; l < allPokemons[0]['stats'].length; l++) {
        let id3 = `base-stats${i}`;
        document.getElementById(id3).innerHTML += `
        <div class="base-stat">
          <span class="stat-names">${allPokemons[i]['stats'][l]['stat']['name']}</span>
          <span class="stat-nr">${allPokemons[i]['stats'][l]['base_stat']}</span>
        <div class="progress">
        <div class="progress-bar" role="progressbar" style="width: ${allPokemons[i]['stats'][l]['base_stat']}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        </div>
        `;
    }
}


function hideStats(i) {

    let closeSound = new Audio('audio/closeSound.wav');
    let id = `stats${i}`;
    document.getElementById(id).classList.remove('d-show');
    closeSound.play();
}