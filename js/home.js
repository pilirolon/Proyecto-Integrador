
window.addEventListener('load', function() {//controlar que todo el html esté cargado en el navegador
	
	// TOP RATES MOVIES End point --> /movie/top_rated
	
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
				<a href="./detail-movie.html?id=${info[i].id}"><img src="https://image.tmdb.org/t/p/w500/${info[i].poster_path}" alt="pelis"></a>
				<h4 class="titulos-peliculas">${info[i].title}</h4>
				<p class="fechas">${info[i].release_date}</p>
			</div>`
		}
		})
		.catch(function(error){
			console.log(error);
		})  
	
	// TV POPULAR End point /tv/popular
	
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
					<a href="./detail-serie.html?id=${info[i].id}"><img src="https://image.tmdb.org/t/p/w500/${info[i].poster_path}" alt="series"></a>
					<h4 class="titulos-peliculas">${info[i].original_name}</h4>
					<p class="fechas">${info[i].first_air_date}</p>
				</div>`
				}
	
			})
	
			.catch(function (error) {
				console.log('El error es: ' + error);
			});
	
	
	//NOW PLAYING - End point /now_playing
	
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
			<a href="./detail-movie.html?id=${info[i].id}"><img src="https://image.tmdb.org/t/p/w500/${info[i].poster_path}" alt="pelis"></a>
			<h4 class="titulos-peliculas">${info[i].title}</h4>
			<p class="fechas">${info[i].release_date}</p>
		</div>`
		}
		//editamos nuestro html
	
	})
	
	.catch(function(error){
		console.log(error);
	})  
	
	})
