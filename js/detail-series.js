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

            for (var i = 0; i < serieDetalle.genres.length; i++) {
                let genero = document.querySelector(".genero");
                genero.innerHTML +=  `<a href="detail-genres.html?id=${serieDetalle.genres[i].id}"> ${serieDetalle.genres[i].name}</a>`
              }
    
    })

    let url2 = (`https://api.themoviedb.org/3/tv/${tv_id}/watch/providers?api_key=45d43a6901861343cdb188d4f3bafd7c`)

    fetch(url2)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        serieDetalle = data.results 
        let tvproviders = document.querySelector('.providers')

        if (serieDetalle.AR !== undefined) {  // si esta disponible en argentina
            tvproviders.innerHTML += `<p>${serieDetalle.AR.flatrate[0].provider_name}</p>` // flatrate es un array
        } else{
            tvproviders.innerHTML += "No esta disponible en Argentina"
        }
    })
    .catch(function(error){
        console.log(error);
    })




    //FAVORITOS agregar serie a fav

    let favoritostv = []; 

    let recuperoStorageSerie = localStorage.getItem("favoritostv");
    console.log(recuperoStorageSerie);


    if (recuperoStorageSerie != null){  
        favoritostv = JSON.parse(recuperoStorageSerie); 
    }

    if (favoritostv.includes(tv_id)){
        document.querySelector('.boton-heart').innerText = "Quitar de favoritos";
    }

    let botonfav = document.querySelector(".boton-heart");
    console.log(botonfav);

    botonfav.addEventListener('click', function(e){
        e.preventDefault();
        if (favoritostv.includes(tv_id)){
            let index = favoritostv.indexOf(tv_id);
            favoritostv.splice(index, 1);
            document.querySelector('.boton-heart').innerText = "Agregar a favoritos";
        }else {
            favoritostv.push(tv_id);
            console.log(favoritostv);
            document.querySelector('.boton-heart').innerText = "Quitar de favoritos";
        }

        let favoritostvparaStorage = JSON.stringify(favoritostv);
        localStorage.setItem("favoritostv", favoritostvparaStorage)
        console.log(localStorage);

    })

})  