window.addEventListener('load', function() {

let url = "https://api.themoviedb.org/3/genre/movie/list?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US"

fetch(url) 
  .then(function(response) {
	return response.json()

  })
  .then(function(listaGeneros) {
    console.log(listaGeneros);
    //capturar el section en el que voy a meter los generos. 
    let generos = listaGeneros.genres;
    let lista = document.querySelector(".generos")
  //recorremos el array de datos, los generos
    for (let i=0; i<generos.length; i++) {
      // queremos que en cada vuelta nos ponga la info de cada genero
      // en este caso como queremos meter una etiqueta completa es HTML
        lista.innerHTML += `<article class="borde">
        <a href="./detail-genres.html?id=${generos[i].id}" class="genero-boton">${generos[i].name}</a>
        </article>`    
    }})
  .catch(function(error) {
	console.log("Error: " + error);
  })

//para las series

let ruta = "https://api.themoviedb.org/3/genre/tv/list?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US"

fetch (ruta)
.then(function(response) {
   return response.json()
  })
.then (function(GenerosTV) {
  console.log(GenerosTV);
  let generosSeries = GenerosTV.genres;
  let lista = document.querySelector(".tv")
  for (let i=0; i<generosSeries.length; i++) {
      lista.innerHTML += `<article class="borde">
      <a href="./detail-genres.html?id=${generosSeries[i].id}" class="genero-boton">${generosSeries[i].name}</a>
      </article>`    


}})
.catch(function(error) {
	console.log("Error: " + error);
  })

})