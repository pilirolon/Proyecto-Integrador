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
  for (var i = 0; i < generoDetalle.results.length; i++) {
    let seleccion = document.querySelector(".galeria")
    seleccion.innerHTML += `<a href="detail-movie.html?id=${generoDetalle.results[i].idGenero}"><img class="imagenes" src=${generoDetalle.results[i].poster_path} alt="top gun"></a>
    <h4 class="titulos peliculas">${generoDetalle.results[i].original_title}</h4>
    <button role="button" class="boton-heart"><i class="icon-heart"></i></button>`
  }
  })

.catch(function(error) {
	console.log("Error: " + error);
  })

})
