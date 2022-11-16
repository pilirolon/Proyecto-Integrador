// Creamos la variable de campo

let buscador = document.querySelector('[name="busqueda"]');
let aviso = document.querySelector('.aviso')

  //condicionales chequeamos el contenido
  if(buscador.value == ""){
      //le aviso al usuario con alert
      aviso.innerText = 'El buscador no puede estar vacío';
  } else if(buscador.value.length < 3){
      //otro alert que avise que necesita mas caracteres
      aviso.innerText = 'Por favor ingrese más de tres caracteres';
  } else {
      this.submit(); //enviamos el formulario
  }

  //limpiamos el mensaje de error cuando el usuario modifica el contenido
  buscador.addEventListener('input', function(){
    aviso.innerText= '';

})

// Resultados de busqueda 

// Capturamos el formulario
let queryString = location.search; // capturamos el queryString
let queryStringObj = new URLSearchParams(queryString); // La transformamos en objeto literal
const query = queryStringObj.get('busqueda');	// como es objeto literal, con get obtenemos resultados

// url de movie search

const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1&include_adult=false` // obtener la info qu esta dentro de nuestro form

fetch(url) // buscamos info de la api
	.then(function(response){
	    return response.json(); // lo convertimos en formato json 
    })
	.then(function(data){ // hicimos lo del buscador aca!!
        console.log(`Resultados de busqueda de ${query}`)
	    console.log(data.results);
        const h3 = document.querySelector('h3'); 
        h3.innerText += query;

// buscador PELICULAS

        let info = data.results // capture el end point
        let movies = document.querySelector('.ResultadosJS') // creamos la variable del campo 
        let nada = '';
        
        if(info.length == 0){ // condicionales chequeamos el content 
            nada +=  nada += `<h2 class= "no"> No se encontaron resultados para ${query}</h2>
                            <h2 class="pero">Búsqueda relacionada:</h2>`;;
        }
        movies.innerHTML += nada

        //limpiamos el mensaje de error cuando el usuario modifica el contenido
        buscador.addEventListener('input', function(){
            aviso.innerText= '';

        })

        console.log(info);

        let movieContainer = document.querySelector('.Container');
        let contenidoMovie = '';

        // recorremos la info 

        for(let i=0; i<info.length; i++){
            contenidoMovie += `<article class="ResultadosJS"> 
                                <img src='https://image.tmdb.org/t/p/w500/${info[i].poster_path}' alt=''/>
                                <a href='./detail-movie.html?id=${info[i].id}'><p>Titulo: ${info[i].title}</p></a> 
                                <p>Release Date: ${info[i].release_date}</a>
        
                            </article>`
        }

        // editamos nuestro HTML 
        movieContainer.innerHTML += contenidoMovie;
        
    })

// buscador SERIES

const url2 = `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1&include_adult=false` // obtener la info qu esta dentro de nuestro form

// buscamos info de la api 

fetch(url2)
    .then(function(response){
        return response.json() // convertir la info a json
    })
    .then(function(data){
        let info = data.results
        
        // creamos las variables del campo
        let series = document.querySelector('.ResultadosJS');
        let nada = '';

        // condicionales chequeamos el contenido

        if(info.length == 0){
            nada += `<h2 class= "no"> No se encontaron resultados para ${query}</h2>
                        <h2 class="pero">Búsqueda relacionada:</h2>`;
        }
        series.innerHTML += nada

        //limpiamos el mensaje de error cuando el usuario modifica el contenido
        buscador.addEventListener('input', function(){
            tracks.innerText= '';
        })

        console.log(info);

        let serieContainer = document.querySelector('.Container');
        let contenidoSerie= '';

        for(let i=0; i<info.length; i++){
            contenidoMovie += `<article class="ResultadosJS"> 
                                <img src=${info[i].poster_path} alt=''/>
                                <a href='./detail-movie.html?id=${info[i].id}'><p>Titulo: ${info[i].original_name}</p></a> 
                                <p>Release Date: ${info[i].first_air_date}</a>
        
                            </article>`
        }

        serieContainer.innerHTML += contenidoSerie;
    })

    // error???

    .catch(function(error){
	    console.log('El error es: ' + error);
    });
