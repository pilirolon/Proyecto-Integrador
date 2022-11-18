// La página principal del sitio deberá mostrar 3 listados de al menos 5 elementos con la oferta de películas y/ o series obtenidas de los end points "TV" y "Movies".
// Cada listado tendrá su título que lo identifica.
// Cada elemento de la lista tendrá al menos una foto, un texto con el título/ nombre y la fecha de estreno.
// Al hacer click sobre cualquiera de los elementos debe redirigir a la página de detalle (punto 4).

window.addEventListener('load', function() {//controlar que todo el html esté cargado en el navegador

	//Aca agregarle el formulario cuando lo terminemos!!!!
	
	// PELICULAS End point: Movies --> /search/movie
	
		const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US` // obtener la info qu esta dentro de nuestro form
	
		fetch(url)
			.then(function(response){
				return response.json()//convertimos la info en formato json
			})
	
			.then(function(data){
				let info = data.results
				console.log(info);
	
				let movieContainer= document.querySelector('.galeria');
	
	
			//recorremos la info
			for(let i=0; i<info.length; i++){
				movieContainer.innerHTML += `<div class="pelicula">
				<a href="./detail-movie.html"><img src="https://image.tmdb.org/t/p/w500/${info[i].poster_path}" alt="pelis"></a>
				<h4 class="titulos-peliculas">${info[i].title}</h4>
				<p class="fechas">${info[i].release_date}</p>
				<button class="boton-heart" id=${info[i].id}><i class="icon-heart"></i></button>
			</div>`

	
			
		}
			//editamos nuestro html

			// FAVORTOS boton con event clase agregar a favoritos con un event listener que cuando cliqueas el boton lo agrega a favortios.  
		})
		.catch(function(error){
			console.log(error);
		})  
	
	// SERIES End point /search/tv
	
		const url2 = `https://api.themoviedb.org/3/tv/popular?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US` // obtener la info qu esta dentro de nuestro form
	
		fetch(url2)
			.then(function (response) {
				return response.json() // convertir la info a json
			})
			.then(function (data) {
				let info = data.results
				console.log(info);
				// creamos las variables del campo
				let  serieContainer = document.querySelector('.serie');
	
				for (let i = 0; i < info.length; i++) {
					serieContainer.innerHTML += `<div class="pelicula">
					<a href="./detail-serie.html"><img src="https://image.tmdb.org/t/p/w500/${info[i].poster_path}" alt="series"></a>
					<h4 class="titulos-peliculas">${info[i].original_name}</h4>
					<p class="fechas">${info[i].first_air_date}</p>
					<button class="boton-heart"><i class="icon-heart"></i></button>
				</div>`
				}
				
				let button = document.querySelector('.boton-heart');
				button.addEventListener('click', function(e){
				console.log('hola');
				})
	
	
			})
	
			.catch(function (error) {
				console.log('El error es: ' + error);
			});
	
	
	//peliculas del momento
	
	const url3 = `https://api.themoviedb.org/3/movie/now_playing?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US` // obtener la info qu esta dentro de nuestro form
	
	fetch(url3)
		.then(function(response){
			return response.json()//convertimos la info en formato json
		})
	
		.then(function(data){
			let info = data.results
			console.log(info);
	
			let nuevasContainer= document.querySelector('.lanzamiento');
	
	
		//recorremos la info
		for (let i=0; i<info.length; i++){
			nuevasContainer.innerHTML += `<div class="pelicula">
			<a href="./detail-movie.html"><img src="https://image.tmdb.org/t/p/w500/${info[i].poster_path}" alt="pelis"></a>
			<h4 class="titulos-peliculas">${info[i].title}</h4>
			<p class="fechas">${info[i].release_date}</p>
			<button class="boton-heart"><i class="icon-heart"></i></button>
		</div>`
		}
		//editamos nuestro html
	
	})
	
	.catch(function(error){
		console.log(error);
	})  
	
	})