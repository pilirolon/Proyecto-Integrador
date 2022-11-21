window.addEventListener ('load', function(){


let detalleGenero = location.search //Caputramos qs
let detalleGeneroObjeto  = new URLSearchParams(detalleGenero); //La transformamos en OL
let idGenero = detalleGeneroObjeto.get('idGenero');


let url = `https://api.themoviedb.org/3/discover/movie?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&include_adult=false&include_video=false&page=1&with_genres=${idGenero}`

fetch (url)
.then(function(response) {
   return response.json()
  })
  
.then (function(generoDetalle){
  console.log(generoDetalle);
  document.querySelector("section.imagen img").src = `https://image.tmdb.org/t/p/original${generoDetalle.poster_path}` ;

  for (var i = 0; i < generoDetalle.results.length; i++) {
    let foto = data.results[i].poster_path
    let foto2 = `https://image.tmdb.org/t/p/w500${foto}`
    let id = generoDetalle.results[i].id
    let seleccion = document.querySelector(".galeria")
    seleccion.innerHTML +=`<article class="contenedor-peliculas"> <a href="detail-movie.html?id=${id}" <img class="imagenes" src=${foto2} alt="top gun">`
  }
  })
.catch(function(error) {
	console.log("Error: " + error);
  })

})





