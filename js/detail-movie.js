//DETALLE PELICULAS

window.addEventListener('load', function(){

    let detalle = location.search; //agarramos el url
    let detalleObjeto = new URLSearchParams(detalle); //agarra los quey strings y los mete en un objeto
    let movie_id = detalleObjeto.get('id'); //agarra solo el query 'id' y lo mete en movie_id
    
    let url = (`https://api.themoviedb.org/3/movie/${movie_id}?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US`)

    fetch(url)
    .then(function(response){
        return response.json();
    })

    .then(function(peliculaDetalle){
        console.log(peliculaDetalle);

        document.querySelector('.titulo').innerHTML = peliculaDetalle.title;
        document.querySelector('.sinopsis').innerHTML = peliculaDetalle.overview;
        document.querySelector('.imagen').src = `https://image.tmdb.org/t/p/original${peliculaDetalle.poster_path}`;
        document.querySelector('.estreno').innerHTML = peliculaDetalle.release_date;
        document.querySelector('.duracion').innerHTML = `${peliculaDetalle.runtime} Minutos`;
        document.querySelector('.rate').innerHTML = peliculaDetalle.vote_average;

        for (var i = 0; i < peliculaDetalle.genres.length; i++) {
            let genero = document.querySelector(".genero");
            genero.innerHTML +=  `<a href="detail-genres.html?id=${peliculaDetalle.genres[i].id}"> ${peliculaDetalle.genres[i].name}</a>`
          }

    })

    // GET PROVIDERS

    let url2 = (`https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US`)

    fetch(url2)
    .then(function(response){
        return response.json();
    })

    .then(function(peliculaProviders){
        console.log(peliculaProviders);

        for (var i =0; i < peliculaProviders.results.length; i++) {
            let region = peliculaProviders.results[i];

            for (var i =0; i < region.flatrate,length; i++){
                document.querySelector('.providers').innerHTML += `<p>${region.flatrate[i].provider_name}</p>`
            }
        }
    })


    //FAVORITOS

    let recuperoStorage= localStorage.getItem("favoritos");
    console.log(recuperoStorage);

	if (recuperoStorage == null ){
		favoritos = [];
	}
	else {
		favoritos = JSON.parse(recuperoStorage);
	}

	let botonheart = document.querySelector('.boton-heart');

	botonheart.addEventListener('click', function(e){
		if (favoritos.includes(movie_id) == true){
			let index=favoritos.indexOf(movie_id)
			favoritos.splice(index, 1)
			botonheart.innerHTML="Agregar a favoritos"
	} else {
			favoritos.push(movie_id);
			botonheart.innerHTML="Quitar de favoritos"
	}

	let infoParaStorageFav = JSON.stringify(favoritos);
	localStorage.setItem("favoritos", infoParaStorageFav)
	console.log(localStorage);

    })

})