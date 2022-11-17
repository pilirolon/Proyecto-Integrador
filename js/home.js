
// La página principal del sitio deberá mostrar 3 listados de al menos 5 elementos con la oferta de películas y/ o series obtenidas de los end points "TV" y "Movies".
// Cada listado tendrá su título que lo identifica.
// Cada elemento de la lista tendrá al menos una foto, un texto con el título/ nombre y la fecha de estreno.
// Al hacer click sobre cualquiera de los elementos debe redirigir a la página de detalle (punto 4).

window.addEventListener('load', function() {//controlar que todo el html esté cargado en el navegador

//Aca agregarle el formulario cuando lo terminemos!!!!

// PELICULAS End point: Movies --> /search/movie

	const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1&include_adult=false` // obtener la info qu esta dentro de nuestro form

	fetch(url)
        .then(function(response){
            return response.json()//convertimos la info en formato json
        })

		.then(function(data){
            let info = data.results
            console.log(info);

            let movieContainer= document.querySelector('.listas');
            let contenidoMovie= '';

		//recorremos la info
		for(let i=0; i<info.length; i++){
			contenidoMovie += `<li class="caja"> 
									<img src='https://image.tmdb.org/t/p/w500/${info[i].poster_path}' alt=''/>
									<a href='./detail-movie.html?id=${info[i].id}'><p>Titulo: ${info[i].title}</p></a> 
									<p>Release Date: ${info[i].release_date}</a>
								</li>`
		}
		//editamos nuestro html
		movieContainer.innerHTML += contenidoMovie
	})

	.catch(function(error){
		console.log(error);
	})  

// SERIES End point /search/tv

    const url2 = `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1&include_adult=false` // obtener la info qu esta dentro de nuestro form

	fetch(url2)
        .then(function (response) {
            return response.json() // convertir la info a json
        })
        .then(function (data) {
            let info = data.results

            // creamos las variables del campo
            let series = document.querySelector('.seriones');
            let nada = '';

            for (let i = 0; i < info.length; i++) {
                contenidoSerie += `<li class="caja"> 
                                	<img src=${info[i].poster_path} alt=''/>
                                	<a href='./detail-movie.html?id=${info[i].id}'><p>Titulo: ${info[i].original_name}</p></a> 
                                	<p> Release Date: ${info[i].first_air_date}</a>
                            </li>`
            }

            serieContainer.innerHTML += contenidoSerie;
        })

        .catch(function (error) {
            console.log('El error es: ' + error);
        });

})
