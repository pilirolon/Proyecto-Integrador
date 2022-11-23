//DETALLE PELICULAS

window.addEventListener('load', function () {

    let detalle = location.search; //agarramos el url
    let detalleObjeto = new URLSearchParams(detalle); //agarra los quey strings y los mete en un objeto
    let movie_id = detalleObjeto.get('id'); //agarra solo el query 'id' y lo mete en movie_id

    let url = (`https://api.themoviedb.org/3/movie/${movie_id}?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US`)

    fetch(url)
        .then(function (response) {
            return response.json();
        })

        .then(function (peliculaDetalle) {
            console.log(peliculaDetalle);

            document.querySelector('.titulo').innerHTML = peliculaDetalle.title;
            document.querySelector('.sinopsis').innerHTML = peliculaDetalle.overview;
            document.querySelector('.imagen').src = `https://image.tmdb.org/t/p/original${peliculaDetalle.poster_path}`;
            document.querySelector('.estreno').innerHTML = peliculaDetalle.release_date;
            document.querySelector('.duracion').innerHTML = `${peliculaDetalle.runtime} Minutos`;
            document.querySelector('.rate').innerHTML = peliculaDetalle.vote_average;

            for (var i = 0; i < peliculaDetalle.genres.length; i++) {
                let genero = document.querySelector(".genero");
                genero.innerHTML += `<a href="detail-genres.html?id=${peliculaDetalle.genres[i].id}"> ${peliculaDetalle.genres[i].name}</a>`
            }

        })

    // GET PROVIDERS -- watch providers -- 

    let url2 = (`https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US`)

    fetch(url2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            peliculaProviders = data.results
            let providers = document.querySelector('.providers')

            if (peliculaProviders.AR !== undefined) {  // si esta disponible en argentina
                providers.innerHTML += `<p>${peliculaProviders.AR.flatrate[0].provider_name}</p>` // flatrate es un array
            } else {
                providers.innerHTML += "No esta disponible en Argentina"
            }
        })
        .catch(function (error) {
            console.log(error);
        })

    // RECOMENDACIONES 

    let url3 = (`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1`)

    fetch(url3)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let resultados = data.results
            let botonRecomendaciones = document.querySelector('.recomendaciones') // el boton
            let recomendacion = document.querySelector('.galeria')

            botonRecomendaciones.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector('.subtitle').innerText = "Recomendaciones";

                for (let i = 0; i < resultados.length; i++) {
                    recomendacion.innerHTML += `<div class="pelicula">
                <a href="./detail-movie.html?id=${resultados[i].id}"><img src="https://image.tmdb.org/t/p/w500/${resultados[i].poster_path}" alt="pelis"></a>
                <h4 class="titulos-peliculas">${resultados[i].title}</h4>
                <p class="fechas">${resultados[i].release_date}</p>
            </div>`
                }
            })

        })

    // ADICIONALES - GET REVIEWS! 

    let url4 = (`https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1`)

    fetch(url4)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            let resultados = data.results
            let botonReviews = document.querySelector('.reviews')
            let contenedorReviews = document.querySelector('.comments')

            botonReviews.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector('.reseña').innerText = "Reviews";

                for (let i = 0; i < resultados.length; i++) {
                    contenedorReviews.innerHTML += `<article class="cadareview"> 
                <p class="autor">Autor: ${resultados[i].author}</p>
                <p class="comentario">Comentario: "${resultados[i].content}"</p>
                </article> `
                }
            })

        })

    // ADICIONALES TRAILER Y VER MAS TRAILERS

    let url5 = (`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US`)

    fetch(url5)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            let resultados = data.results
            let botonTrailer = document.querySelector('.play')
            let contenedorTrailer = document.querySelector('.trailer')
            let contenedorTrailers = document.querySelector('.trailers')

            botonTrailer.addEventListener('click', function (e) {

                for (let i = 0; i < resultados.length; i++) {
                    if (resultados[i].name != "Trailer" || resultados[i].name != "Official Trailer") {
                        document.querySelector('.verTrailers').innerText = "Otros trailers y videos"
                        contenedorTrailers.innerHTML += `<iframe class= "youtube" width="300" height="215" src="https://www.youtube.com/embed/${resultados[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                    } else {
                        document.querySelector('.verTrailer').innerText = "No hay trailers disponibles"
                    }
                }

                if (resultados[0].name == "Trailer" || resultados[0].name == "Official Trailer") {
                    document.querySelector('.verTrailer').innerText = "Trailer"
                    contenedorTrailer.innerHTML += `<iframe class= "youtube" width="300" height="215" src="https://www.youtube.com/embed/${resultados[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                    document.querySelector('.verTrailer').innerText = "Trailer"
                }

            })

            //FAVORITOS

            let recuperoStorage = localStorage.getItem("favoritos");
            console.log(recuperoStorage);

            if (recuperoStorage == null) {
                favoritos = [];
            }
            else {
                favoritos = JSON.parse(recuperoStorage);
            }

            let botonheart = document.querySelector('.boton-heart');

            botonheart.addEventListener('click', function (e) {
                if (favoritos.includes(movie_id) == true) {
                    let index = favoritos.indexOf(movie_id)
                    favoritos.splice(index, 1)
                    botonheart.innerHTML = "Agregar a favoritos"
                } else {
                    favoritos.push(movie_id);
                    botonheart.innerHTML = "Quitar de favoritos"
                }

                let infoParaStorageFav = JSON.stringify(favoritos);
                localStorage.setItem("favoritos", infoParaStorageFav)
                console.log(localStorage);

            })
        })
})
