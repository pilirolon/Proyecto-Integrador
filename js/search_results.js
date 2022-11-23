
window.addEventListener('load', function () { // load es un evento que controla que todo el html esté cargado en el navegador. 

    let formulario = document.querySelector('form') /* es el formulario */
    let buscador = document.querySelector('[name="busqueda"]');

    let aviso = document.querySelector('.aviso') // aca quiero avisar 

    //condicionales chequeamos el contenido
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        if (buscador.value == "") {
            aviso.innerText = 'El buscador no puede estar vacío'; // o aviso.innerText('')
        } else if (buscador.value.length < 3) {
            aviso.innerText = 'Por favor ingrese más de tres caracteres';  // o aviso.innerText('')
        } else {
            this.submit();
        }
    })

    buscador.addEventListener('input', function () {  //sacar el mensaje si usuario modifica
        aviso.innerText = '';
    })

    // Resultados de busqueda 

    // Capturamos el formulario

    let queryString = location.search;                                              // capturamos el queryString
    let queryStringObj = new URLSearchParams(queryString);
    const query = queryStringObj.get('busqueda');

    // Buscar y q aparezca en el texto

    let busqresults = document.querySelector('h3')
    busqresults.innerText = `Resultados de busqueda de: "${query}"`;
    buscador.addEventListener('input', function () {
        busqresults.innerText = '';
    })

    // Buscador de pelis

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1&include_adult=false` // obtener la info qu esta dentro de nuestro form

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            // Buscador PELICULAS

            let info = data.results // capture el end point
            let movies = document.querySelector('.contenedor-peliculas') // creamos la variable del campo 
            let nada = '';

            if (info.length == 0) {
                nada += `<h2 class= "no"> No se encontaron resultados para ${query}</h2>`;
                let flecha = document.querySelector('#flecha')
                flecha.style.display = "none";
                let flechai = document.querySelector('.flecha-derecha')
                flechai.style.display = "none";
            }
            movies.innerHTML += nada

            //limpiamos el mensaje de error cuando el usuario modifica el contenido
            buscador.addEventListener('input', function () {
                aviso.innerText = '';

            })

            console.log(info);

            let movieContainer = document.querySelector('.galeria');


            // recorremos la info 
            for (let i = 0; i < info.length; i++) {
                movieContainer.innerHTML += `<div class="pelicula">
                <a href="./detail-movie.html?id=${info[i].id}"><img src="https://image.tmdb.org/t/p/w500/${info[i].poster_path}" alt="pelis"></a>
                <h4 class="titulos-peliculas">${info[i].title}</h4>
                <p class="fechas">${info[i].release_date}</p>
            </div>`
            }

            // editamos nuestro HTML 

        })

    // buscador SERIES

    const url2 = `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1&include_adult=false` // obtener la info qu esta dentro de nuestro form

    // buscamos info de la api 

    fetch(url2)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            let info = data.results

            let series = document.querySelector('.contseries')
            let nada = '';

            if (info.length == 0) {
                nada += `<h2 class= "no"> No se encontaron resultados para ${query}</h2>`;
                let flecha1 = document.querySelector('#flecha1')
                flecha1.style.display = "none";
                let flecha2 = document.querySelector('#flecha2')
                flecha2.style.display = "none";
            }
            series.innerHTML += nada

            console.log(info);

            let serieContainer = document.querySelector('.serie');


            for (let i = 0; i < info.length; i++) {
                serieContainer.innerHTML += `<div class="pelicula">
                <a href="./detail-serie.html?id=${info[i].id}"><img src="https://image.tmdb.org/t/p/w500/${info[i].poster_path}" alt="series"></a>
                <h4 class="titulos-peliculas">${info[i].original_name}</h4>
                <p class="fechas">${info[i].first_air_date}</p>
            </div>`
            }

        })

        .catch(function (error) {
            console.log('El error es: ' + error);
        });

})