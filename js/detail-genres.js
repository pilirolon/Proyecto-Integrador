window.addEventListener('load', function () {


  let detalleGenero = location.search //Caputramos qs
  let detalleGeneroObjeto = new URLSearchParams(detalleGenero); //La transformamos en OL
  let genre_id = detalleGeneroObjeto.get("genre_id");

  //peliculas

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&include_adult=false&include_video=false&page=1&with_genres=${genre_id}`

  fetch(url)
    .then(function (response) {
      return response.json()
    })

    .then(function (generoDetalle) {
      console.log(generoDetalle);
      let seccion = document.querySelector(".galeria")
      let results = generoDetalle.results

      for (var i = 0; i < results.length; i++) {
        seccion.innerHTML += `<div class="pelicula">
					<a href="./detail-serie.html?id=${results[i].id}"><img src="https://image.tmdb.org/t/p/w500/${results[i].poster_path}" alt="series"></a>
					<h4 class="titulos-peliculas">${results[i].title}</h4>
					<p class="fechas">${results[i].release_date}</p>
				</div>`
      }
    })
    .catch(function (error) {
      console.log("Error: " + error);
    })

  //series


  let url2 = `https://api.themoviedb.org/3/discover/tv?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
  fetch(url2)
    .then(function (response) {
      return response.json()
    })

    .then(function (generoDetalle) {
      console.log(generoDetalle);
      let seccion = document.querySelector(".tv")
      let results = generoDetalle.results

      for (var i = 0; i < results.length; i++) {
        seccion.innerHTML += `<div class="pelicula">
					<a href="./detail-serie.html?id=${results[i].id}"><img src="https://image.tmdb.org/t/p/w500/${results[i].poster_path}" alt="series"></a>
					<h4 class="titulos-series">${results[i].original_name}</h4>
					<p class="fechas">${results[i].first_air_date}</p>
				</div>`
      }
    })
    .catch(function (error) {
      console.log("Error: " + error);
    })

})



