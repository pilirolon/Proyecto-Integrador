let FotoPortada = document.querySelector('')
let NombrePelicula = document.querySelector('')
let Calificacion = document.querySelector('')
let FechaEstreno = document.querySelector('')
let Duracion = document.querySelector('')
let genero  = document.querySelector('')
let sinopsis = document.querySelector('')
let plataforma = document.querySelector('')

let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
const query = queryStringObj.get('busqueda');	

const url = 

fetch(url) 
.then(function(response) {
  return response.json()
  })
  .then(function(data) {
    NombrePelicula.innerHTML += 
    FotoPortada.innerHTML += `<article class="fotos"> <img src="${Datacancion.album.cover_big}">  </article>`
    Calificacion.innerHTML +=`${Datacancion.artist.name}`
    FechaEstreno.innerHTML += `${Datacancion.album.title}`
    Duracion.innerHTML += `<a href="#"> Agregar a mi playlist </a>`
    genero.innerHTML += `<a href="playlist.html"> Ir a mi playlist </a>` 
    sinopsis.innerHTML += `<iframe title="deezer-widget" src="https://widget.deezer.com/widget/dark/track/${Datacancion.id}" width="100%" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe>` 
    plataforma.innerHTML += `<iframe title="deezer-widget" src="https://widget.deezer.com/widget/dark/track/${Datacancion.id}" width="100%" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe>` 

    console.log(data);
  })
  
  .catch(function(error) {
	console.log("Error: " + error);
  })
  

