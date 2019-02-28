//solution goes here


document.addEventListener("DOMContentLoaded", loadPage);

const mainDiv = document.querySelector('main')

function loadPage() {
  fetch(`http://localhost:3000/trainers`)
  .then(res => res.json())
  .then(json => renderAllTrainers(json))
}

function renderAllTrainers(json) {
  mainDiv.innerHTML = ''
  json.forEach(renderEachTrainer)
}

function postData(jsonData) {
  fetch('http://localhost:3000/pokemons', {
  method: 'POST',
  body: JSON.stringify(jsonData),
  headers: {
  'Content-Type': 'application/json'
    }
  }).then(() => reloadPage());
}

function deleteData(id) {
  fetch(`http://localhost:3000/pokemons/${id}`, {
  method: 'DELETE',
  }).then(() => reloadPage());     //uncomment for pessimistic
}

function renderEachTrainer(trainer) {  //(trainer) was (data)
  //mainDiv.innerHTML = ''     //moved this to here to stop flicker
    // data.forEach(trainer => {
    const div = document.createElement('div')
    div.className = 'card'
    const p = document.createElement('p')
    p.innerText = trainer.name
    const button = document.createElement('button')
    button.innerText = 'Add Pokemon'
    button.className = 'addButton'
    button.ownerId = trainer.id
    button.pokemonList = trainer.pokemons   //added this
    button.addEventListener('click', onAdd)
    const ul = document.createElement('ul')
    mainDiv.appendChild(div)
    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)
    trainer.pokemons.forEach(pokemon => {
      const li = document.createElement('li')
      const button = document.createElement('button')
      button.className = 'release'
      button.innerText = 'Release'
      button.ownerId = trainer.id
      button.pokemonId = pokemon.id
      button.addEventListener('click', onRelease)
      li.innerText = `${pokemon.nickname} (${pokemon.species})`
      ul.appendChild(li)
      li.appendChild(button)
    })
  //})
}

function onAdd() {
  const body = {trainer_id: this.ownerId} // added const
  if (this.pokemonList.length < 6) { // added
  postData(body) } else {window.alert('Nice try buddy. You only get six little buddies.')}
}

function renderPokemon(pokemon) {
  const li = document.createElement('li')
  const button = document.createElement('button')
  button.className = 'release'
  button.innerText = 'Release'
  button.ownerId = trainer.id
  button.pokemonId = pokemon.id
  button.addEventListener('click', onRelease)
  li.innerText = `${pokemon.nickname} (${pokemon.species})`
  ul.appendChild(li)
  li.appendChild(button)
}

function onRelease() {
  //this.parentNode.remove()        //comment for pessimistic
  const id = this.pokemonId
  deleteData(id)

}

function reloadPage() {
  //used to have line that cleared div here, but caused flash
  loadPage()
}
