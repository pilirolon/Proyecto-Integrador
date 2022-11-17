
window.addEventListener('load', function () { // load es un evento que controla que todo el html esté cargado en el navegador. 

    let formulario = document.querySelector('form') /* es el formulario */
    let buscador = document.querySelector('[name="busqueda"]');

    let aviso = document.querySelector('.aviso') // aca quiero avisar 

    //condicionales chequeamos el contenido
    formulario.addEventListener('submit', function () { //cuando el usuario submit algo, verifica con el evento
        if (buscador.value == "") {
            alert('El buscador no puede estar vacío'); // o aviso.innerText('')
        } else if (buscador.value.length < 3) {
            alert('Por favor ingrese más de tres caracteres');  // o aviso.innerText('')
        } else {
            this.submit(); 
        }
    })

    buscador.addEventListener('input', function () {  //sacar el mensaje si usuario modifica
        aviso.innerText = '';
    })

    // Resultados de busqueda 

    // Capturamos el formulario
    let queryString = location.search; // capturamos el queryString
    let queryStringObj = new URLSearchParams(queryString); // La transformamos en objeto literal
    const query = queryStringObj.get('busqueda');	// como es objeto literal, con get obtenemos resultados

    // buscar y q aparezca en el texto

    let busqresults = document.querySelector('h3')
    busqresults.innerText = `Resultados de busqueda de: ${query}`;
        buscador.addEventListener('input', function(){
            busqresults.innerText= '';
            })

    // Buscador de pelis

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1&include_adult=false` // obtener la info qu esta dentro de nuestro form

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            // buscador PELICULAS

            let info = data.results // capture el end point
            let movies = document.querySelector('.contenedor') // creamos la variable del campo 
            let nada = '';

            if (info.length == 0) {
                nada += `<h2 class= "no"> No se encontaron resultados para ${query}</h2>
                            <h2 class="pero">Búsqueda relacionada:</h2>`;
            }
            movies.innerHTML += nada

            //limpiamos el mensaje de error cuando el usuario modifica el contenido
            buscador.addEventListener('input', function () {
                aviso.innerText = '';

            })

            console.log(info);
            let movieContainer = document.querySelector('.contenedor-peliculas');
            let contenidoMovie = '';

            // recorremos la info 
            for (let i = 0; i < info.length; i++) {
                contenidoMovie += `<div class="pelicula"> 
                                <img src='https://image.tmdb.org/t/p/w500/${info[i].poster_path}' alt=''/>
                                <a href='./detail-movie.html?id=${info[i].id}'><p>Titulo: ${info[i].title}</p></a> 
                                <p>Release Date: ${info[i].release_date}</a>
        
                            </div>`
            }

            // editamos nuestro HTML 
            movieContainer.innerHTML += contenidoMovie
        })

    // buscador SERIES

    const url2 = `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1&include_adult=false` // obtener la info qu esta dentro de nuestro form

    // buscamos info de la api 

    fetch(url2)
        .then(function (response) {
            return response.json() // convertir la info a json
        })
        .then(function (data) {
            let info = data.results

            // creamos las variables del campo
            let series = document.querySelector('.contenedor');
            let nada = '';

            // condicionales chequeamos el contenido

            if (info.length == 0) {
                nada += `<h2 class= "no"> No se encontaron resultados para ${query}</h2>
                        <h2 class="pero">Búsqueda relacionada:</h2>`;
            }
            series.innerHTML += nada

            //limpiamos el mensaje de error cuando el usuario modifica el contenido
            buscador.addEventListener('submit', function () {
                error.innerText = '';
            })

            console.log(info);

            let serieContainer = document.querySelector('.contenedor-series');
            let contenidoSerie = '';

            for (let i = 0; i < info.length; i++) {
                contenidoMovie += `<div class="serie"> 
                                <img src=${info[i].poster_path} alt=''/>
                                <a href='./detail-movie.html?id=${info[i].id}'><p>Titulo: ${info[i].original_name}</p></a> 
                                <p>Release Date: ${info[i].first_air_date}</a>
        
                            </div>`
            }

            serieContainer.innerHTML += contenidoSerie;
        })

        .catch(function (error) {
            console.log('El error es: ' + error);
        });

})