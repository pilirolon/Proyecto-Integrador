// Creamos la variable de campo

let buscador = document.querySelector('[name="busqueda"]');
let aviso = document.querySelector('.aviso')

 //creamos un evento con evenListener
 formulario.addEventListener('submit', function(e){
    e.preventDefault();//prevenimos el comportamiento default

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

})

// Resultados de busqueda 

// Capturamos el formulario
let queryString = location.search; // capturamos el queryString
let queryStringObj = new URLSearchParams(queryString); // La transformamos en objeto literal
const query = queryStringObj.get('busqueda');	// como es objeto literal, con get obtenemos resultados

const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1&include_adult=false` // obtener la info qu esta dentro de nuestro form

fetch(url) 
	.then(function(response){
	    return response.json(); // lo convertimos en formato json 
    })
	.then(function(data){ // hicimos lo del buscador aca!!
        console.log(`Resultados de busqueda de ${query}`)
	    console.log(data.results);
        const h3 = document.querySelector('h3'); 
        h3.innerText += query;


        let info = data.results // capture el end point
        let movies = document.querySelector('.ResultadosJS') // creamos la variable del campo 
        let nada = '';
        
        if(info.length == 0){ // condicionales chequeamos el content 
            nada += ``;
        }
        movies.innerHTML += nada
        console.log(info);

        let movieContainer = document.querySelector('.Container');
        let contenidoMovie = '';

        // recorremos la info 

        for(let i=0; i<info.length; i++){
            contenidoMovie += `<article class="ResultadosJS"> 
                                <img src=${info[i].poster_path} alt='' />
                                <a href='./detail-movie.html?id=${info[i].id}'><p>Name: ${info[i].title}</p></a> 
                                <p>Release Date: ${info[i].release_date}"class="release">${info[i].release_date}</a>
            
                            </article>`
        }

        // editamos nuestro HTML 
        movieContainer.innerHTML += contenidoMovie;
        
    })
	.catch(function(error){
	    console.log('El error es: ' + error);
    });

