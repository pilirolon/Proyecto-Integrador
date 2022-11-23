
window.addEventListener('load', function () {

  let detalleGenero = location.search;
  let detalleGeneroObjeto = new URLSearchParams(detalleGenero);
  let idGen = detalleGeneroObjeto.get("id");

  let generoPelicula = document.querySelector(".galeria")
  let urlDetalleGen = `https://api.themoviedb.org/3/discover/movie?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${idGen}&with_watch_monetization_types=flatrate`;

  //peliculas

  fetch(urlDetalleGen)
    .then(function (response) {
      return response.json();
    }
    ).then(function (data) {
      let arrayGeneros = data.results
      console.log(arrayGeneros);
      let DetalleGen = ''


      // se recorre la info de la API y se selecciona para mostrarla al usuario
      for (let i = 0; i < arrayGeneros.length; i++) {
        DetalleGen += `<div class="pelicula">
          <a href="./detail-serie.html?id=${arrayGeneros[i].id}"><img src="https://image.tmdb.org/t/p/w500/${arrayGeneros[i].poster_path}" alt="series"></a>
          <h4 class="titulos-peliculas">${arrayGeneros[i].title}</h4>
          <p class="fechas">${arrayGeneros[i].release_date}</p>
      </div>`
      }
      generoPelicula.innerHTML = DetalleGen;

    }).catch(function (error) {
      console.log('el error es' + error)
    })

  //ahora en series
  let url2 = `https://api.themoviedb.org/3/discover/tv?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&with_genres=${idGen}`
  let generoSeries = document.querySelector(".tv")
  fetch(url2)
    .then(function (response) {
      return response.json();
    }
    ).then(function (data) {
      let results = data.results
      console.log(results);
      let GeneroEspecifico = ''

      for (let i = 0; i < results.length; i++) {
        GeneroEspecifico += `<div class="pelicula">
          <a href="./detail-serie.html?id=${results[i].id}"><img src="https://image.tmdb.org/t/p/w500/${results[i].poster_path}" alt="series"></a>
          <h4 class="titulos-series">${results[i].original_name}</h4>
          <p class="fechas">${results[i].first_air_date}</p>
      </div>`
      }

      generoSeries.innerHTML = GeneroEspecifico;

    }).catch(function (error) {
      console.log('el error es' + error)
    })


})

