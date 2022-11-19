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
        
        // document.querySelector('boton-heart').innerHTL = `<button class="boton-heart" id=${info[i].id}><i class="icon-heart"></i></button>`
        
        // let generoContainer = document.querySelector('.genero');
        // let genres = peliculaDetalle.genres;

        // for (i=0, i<genres.length, i++){
        //     generoContainer += `<p>${genres[i].name}</p>`
        // }

        //for que recorre el array de peliculaDetalle.genres
        //por cada genero va a sumar un <p> a generoContainer
    })

    //FAVORITOS

    let recuperoStorage= localStorage.getItem("favoritos");

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

	let infoParaStorageFav=JSON.stringify(favoritos);
	localStorage.setItem("favoritos", infoParaStorageFav)
	console.log(localStorage);

    })

})