
const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US"
fetch(url) 
.then(function(response) {
	return response.json()
  })
  .then(function(data) {
	console.log(data);
  for (var i = 0; i < listaGeneros.genres.length; i++) {
    document.querySelector("section.generos").innerHTML += "<li><a href='detalleGenero.html?idGenero="+listaGeneros.genres[i].id+"'>"+listaGeneros.genres[i].name+"</a></li>"
    }})
  //capturar el section en el que voy a meter los generos, 
  //for xa recorrer el array de data(recorrre todos los genero), 
  //capturar el section en el que voy a meter los generos, agregar un article(ancor pata redirigir al detalle, 
  //le paso una query para el id) por cada genero al section capture antes
  .catch(function(error) {
	console.log("Error: " + error);
  })
  
  fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=942febef73deb21c3f70ec6b055cb722")
  .then(function (response) {
    return response.json();
    })
  .then(function (listaGenerosSerie) {
    console.log(listaGenerosSerie);
    for (var i = 0; i < listaGenerosSerie.genres.length; i++) {
      document.querySelector("section.generosSerie").innerHTML += "<li><a href='detalleGenero.html?idGenero="+listaGenerosSerie.genres[i].id+"'>"+listaGenerosSerie.genres[i].name+"</a></li>"
      }})

