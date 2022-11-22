//DEATALLE PELICULAS

window.addEventListener('load', function () {

    let detalle = location.search;  //location.search devuelve la url de la pagina y la guardamos en detalle
    let detalleObjeto = new URLSearchParams(detalle);  //pasamos la url de la pagina a URLSearchParams() y nos devuelve un objeto con las queryStrings
    let tv_id = detalleObjeto.get('id'); //del objeto de queryStrings nos quedamos con la que tiene la clave id

    let url = (`https://api.themoviedb.org/3/tv/${tv_id}?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US`)

    fetch(url)
        .then(function (response) {
            return response.json();
        })

        .then(function (serieDetalle) {
            console.log(serieDetalle);

            document.querySelector('.titulo').innerHTML = serieDetalle.name;
            document.querySelector('.sinopsis').innerHTML = serieDetalle.overview;
            document.querySelector('.imagen').src = `https://image.tmdb.org/t/p/original${serieDetalle.poster_path}`;
            document.querySelector('.estreno').innerHTML = serieDetalle.first_air_date;
            document.querySelector('.episodios').innerHTML = `${serieDetalle.number_of_episodes} EPISODIOS`;
            document.querySelector('.temporadas').innerHTML = `${serieDetalle.number_of_seasons} TEMPORADAS`;
            document.querySelector('.calificacion').innerHTML = serieDetalle.vote_average;

            for (var i = 0; i < serieDetalle.genres.length; i++) {
                let genero = document.querySelector(".genero");
                genero.innerHTML += `<a href="detail-genres.html?id=${serieDetalle.genres[i].id}"> ${serieDetalle.genres[i].name}</a>`
            }

        })

    // GET PROVIDERS -- watch providers -- 

    let url2 = (`https://api.themoviedb.org/3/tv/${tv_id}/watch/providers?api_key=45d43a6901861343cdb188d4f3bafd7c`)

    fetch(url2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            serieDetalle = data.results
            let tvproviders = document.querySelector('.providers')

            if (serieDetalle.AR !== undefined) {  // si esta disponible en argentina
                tvproviders.innerHTML += `<p>${serieDetalle.AR.flatrate[0].provider_name}</p>` // flatrate es un array
            } else {
                tvproviders.innerHTML += "No esta disponible en Argentina"
            }
        })
        .catch(function (error) {
            console.log(error);
        })

    // RECOMENDACIONES

    let url3 = (`https://api.themoviedb.org/3/tv/${tv_id}/recommendations?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1`)

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
                for (let i = 0; i < resultados.length; i++) {
                    document.querySelector('.subtitle').innerText = "Recomendaciones"
                    recomendacion.innerHTML += `<div class="pelicula">
                <a href="./detail-serie.html?id=${resultados[i].id}"><img src="https://image.tmdb.org/t/p/w500/${resultados[i].poster_path}" alt="pelis"></a>
                <h4 class="titulos-peliculas">${resultados[i].original_name}</h4>
                <p class="fechas">${resultados[i].first_air_date}</p>
            </div>`
                }

            })

            // ADICIONALES - GET REVIEWS!

            let url4 = (`https://api.themoviedb.org/3/tv/${tv_id}/reviews?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1`)

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

                        for (let i = 0; i < resultados.length; i++) {
                            document.querySelector('.reseña').innerText = "Reviews"

                            contenedorReviews.innerHTML += `<article class="cadareview"> 
                <p class="autor">Autor: ${resultados[i].author}</p>
                <p class="comentario">Comentario: "${resultados[i].content}"</p>
                </article> `
                        }
                    })

                })

            // ADICIONALES - TRAILER ! - falta ver como hacer para que aparezca solo uno 

            let url5 = (`https://api.themoviedb.org/3/tv/${tv_id}/videos?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US`)

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


                    //FAVORITOS agregar serie a fav

                    let favoritostv = [];

                    let recuperoStorageSerie = localStorage.getItem("favoritostv");
                    console.log(recuperoStorageSerie);


                    if (recuperoStorageSerie != null) {
                        favoritostv = JSON.parse(recuperoStorageSerie);
                    }

                    if (favoritostv.includes(tv_id)) {
                        document.querySelector('.boton-heart').innerText = "Quitar de favoritos";
                    }

                    let botonfav = document.querySelector(".boton-heart");
                    console.log(botonfav);

                    botonfav.addEventListener('click', function (e) {
                        e.preventDefault();
                        if (favoritostv.includes(tv_id)) {
                            let index = favoritostv.indexOf(tv_id);
                            favoritostv.splice(index, 1);
                            document.querySelector('.boton-heart').innerText = "Agregar a favoritos";
                        } else {
                            favoritostv.push(tv_id);
                            console.log(favoritostv);
                            document.querySelector('.boton-heart').innerText = "Quitar de favoritos";
                        }

                        let favoritostvparaStorage = JSON.stringify(favoritostv);
                        localStorage.setItem("favoritostv", favoritostvparaStorage)
                        console.log(localStorage);
                    })
                })
        })
}) 