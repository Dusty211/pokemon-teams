//solution goes here


document.addEventListener("DOMContentLoaded", init);

function init() {

  const mainDiv = document.querySelector('main')

  function getData() {
  fetch(`http://localhost:3000/trainers`)
  .then(res => res.json())
  .then(json => renderPokemon(json))
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
    }).then(() => reloadPage());
  }

  function renderPokemon(data) {
  data.forEach(player => {
    const div = document.createElement('div')
    div.className = 'card'
    const p = document.createElement('p')
    p.innerText = player.name
    const button = document.createElement('button')
    button.innerText = 'Add Pokemon'
    button.className = 'addButton'
    button.ownerId = player.id
    button.addEventListener('click', onAdd)
    const ul = document.createElement('ul')
    mainDiv.appendChild(div)
    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)
    player.pokemons.forEach(pokemon => {
      const li = document.createElement('li')
      const button = document.createElement('button')
      button.className = 'release'
      button.innerText = 'Release'
      button.ownerId = player.id
      button.pokemonId = pokemon.id
      button.addEventListener('click', onRelease)
      li.innerText = `${pokemon.nickname} (${pokemon.species})`
      ul.appendChild(li)
      li.appendChild(button)
    })
  })
}

  function onAdd() {
    body = {trainer_id: this.ownerId}
    postData(body)
  }

  function onRelease() {

    this.parentNode.remove()
    const id = this.pokemonId
    deleteData(id)

  }

  function reloadPage() {
    mainDiv.innerHTML = ''
    getData()
  }

  getData()

}
