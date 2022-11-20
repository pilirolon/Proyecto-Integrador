//DEATALLE PELICULAS

window.addEventListener('load', function(){

    let detalle = location.search; //location.search devuelve la url de la pagina y la guardamos en detalle
    let detalleObjeto = new URLSearchParams(detalle); //pasamos la url de la pagina a URLSearchParams() y nos devuelve un objeto con las queryStrings
    let tv_id = detalleObjeto.get('id'); //del objeto de queryStrings nos quedamos con la que tiene la clave id

    let url = `https://api.themoviedb.org/3/tv/${tv_id}?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US`

    fetch(url)
        .then(function(response){
            return response.json();
        })

        .then(function(serieDetalle){
            console.log(serieDetalle);

            document.querySelector('.titulo').innerHTML = serieDetalle.name;
            document.querySelector('.sinopsis').innerHTML = serieDetalle.overview;
            document.querySelector('.imagen').src = `https://image.tmdb.org/t/p/original${serieDetalle.poster_path}`;
            document.querySelector('.estreno').innerHTML = serieDetalle.first_air_date;
            document.querySelector('.episodios').innerHTML = `${serieDetalle.number_of_episodes} EPISODIOS`;
            document.querySelector('.temporadas').innerHTML = `${serieDetalle.number_of_seasons} TEMPORADAS`;
            document.querySelector('.calificacion').innerHTML = serieDetalle.vote_average;
            document.querySelector('.genero').innerHTML =  serieDetalle.genres;
    })

    //FAVORITOS

    let recuperoStorageSerie = localStorage.getItem("favoritosSerie");
    console.log(recuperoStorageSerie);

    if (recuperoStorageSerie == null){
        favoritostv = [];
    }else {
        favoritostv = JSON.parse(recuperoStorageSerie);
    }

    let botonfav = document.querySelector(".boton-heart");

    botonfav.addEventListener('click', function(e){
        if (favoritostv.includes(tv_id) == true){
            let index = favoritostv.indexOf(tv_id)
            favoritostv.splice(index, 1)
            botonfav.innerHTML = "Agregar a favoritos"
        }else {
            favoritostv.push(tv_id);
            botonfav.innerHTML = "Quitar de favoritos"
        }
    })

        let infostorageserie = JSON.stringify(favoritostv);
        localStorage.setItem("favoritosSerie", infostorageserie)
        console.log(localStorage);

})  