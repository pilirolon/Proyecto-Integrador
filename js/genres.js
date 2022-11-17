
let url = "https://api.themoviedb.org/3/genre/movie/list?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US"

//buscamos la info
fetch(url) 
  .then(function(response) {
 //convertimos la info en formato json
	return response.json()

  })
  .then(function(listaGeneros) {
    console.log(listaGeneros);
    //capturar el section en el que voy a meter los generos. 
    let generos = listaGeneros.genres;
    let lista = document.querySelector(".listaGeneros")

  //recorremos el array de datos, los generos
    for (let i = 0; i<generos.length; i++); {
      // queremos que en cada vuelta nos ponga la info de cada genero
      // en este caso como queremos meter una etiqueta completa es HTML
        lista.innerHTML += `<li>${generos[i].name} </li>`
    }})
  //capturar el section en el que voy a meter los generos, agregar un article(ancor pata redirigir al detalle, 
  //le paso una query para el id) por cada genero al section capture antes
  
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
  let lista = document.querySelector(".listaGeneros")
})
.catch(function(error) {
	console.log("Error: " + error);
  })
