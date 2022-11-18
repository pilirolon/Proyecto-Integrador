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
  console.log(generoDetalle)
  let lista = document.querySelector(".tv")
  for (var i = 0; i < generoDetalle.genres.length; i++) {
    if (id == generoDetalle[i].id){
      genreTitle.innerText = `Peliculas de ${generoDetalle.genres[i].name} `
    }
  }
  
  
  {lista.innerHTML += `<article class="galeria">
  <a href='detail-serie.html?idSerie="` + generoDetalle.results[i].id + "'><img src=" + URLPoster + generoDetalle.results[i].poster_path + `alt=''></a></li>`;
}})
})
.catch(function(error) {
	console.log("Error: " + error);
  })

