window.addEventListener('load', function(){

    let detalle = location.search;
    let detalleObjeto = new URLSearchParams(detalle);
    let movie_id = detalleObjeto.get('id')
    
    let url = (`https://api.themoviedb.org/3/movie/${movie_id}?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US`)

    fetch(url)
    .then(function(response){
        return response.json();
    })

    .then(function(peliculaDetalle){
        console.log(peliculaDetalle);

        document.querySelector('.titulo').innerHTML = peliculaDetalle.title;
        document.querySelector('.sinopsis').innerHTML = `RESUMEN${peliculaDetalle.overview}`;
        document.querySelector('.imagen').src = `https://image.tmdb.org/t/p/original${peliculaDetalle.poster_path}`;
        document.querySelector('.estreno').innerHTML = peliculaDetalle.release_date;
        document.querySelector('.duracion').innerHTML = peliculaDetalle.runtime;
        document.querySelector('.genero').innerHTML = `GENERO: ${peliculaDetalle.genres}`;
        document.querySelector('calificacion') = `Promedio de votos: ${peliculaDetalle.vote_average}`
    })




})