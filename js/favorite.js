
window.addEventListener('load', function(){

//lista de favoritos

// 1 - recuperar el storage 
let recuperoStorage= localStorage.getItem("favoritos");
console.log(recuperoStorage);

//2 - tengo que transformar de JSON a array
let seleccionados = JSON.parse(recuperoStorage);
console.log(seleccionados);

// 3 - captura el contenedor de los elementos a mostrar
let seccion= document.querySelector (".galeria");

// 4 - evaluar si el localStorage está vacío quiero indicarle al usuario que no hay favoritos seleccionados
if (seleccionados == null || seleccionados.length == 0){
    seccion.innerHTML = `<p> No hay favoritos seleccionados </p>`
} else {
    // pedir a la api los dotos de todos los ids del array de personajes elegidos
    for (let i= 0; i<seleccionados.length; i++){
        buscarYMostrarFavoritos(seleccionados[i])
    }
}

// PELICULAS

function buscarYMostrarFavoritos (id){
    
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US`

    fetch (url)
        .then(function(response){
            return response.json();
        })

        .then(function(data){
            console.log(data);
            seccion.innerHTML += `<div class="pelicula">
            <a href="./detail-movie.html?id=${data.id}"><img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="pelis"></a>
            <h4 class="titulos-peliculas">${data.title}</h4>
            <p class="fechas">${data.release_date}</p>
        </div>`
        })
        .catch(function(e){
        console.log(e);
        })
}

// SERIES 

//     // 1 - recuperar el storage 
//     let recuperoStorageSerie= localStorage.getItem("favoritos");
//     console.log(recuperoStorageSerie);

//     //2 - tengo que transformar de JSON a array
//     let seleccionadosSerie = JSON.parse(recuperoStorage);
//     console.log(seleccionadosSerie);

//     // 3 - captura el contenedor de los elementos a mostrar
//     let seccionSerie= document.querySelector (".tv");

//     // 4 - evaluar si el localStorage está vacío quiero indicarle al usuario que no hay favoritos seleccionados
//     if (seleccionadosSerie == null || seleccionadosSerie.length == 0){
//         seccionSerie.innerHTML = `<p> No hay favoritos seleccionados </p>`
//     } else {
//     // pedir a la api los dotos de todos los ids del array de personajes elegidos
//     for (let i= 0; i<seleccionadosSerie.length; i++){
//         buscarYMostrarFavoritos(seleccionadosSerie[i])
//     }
// }

//     function buscarYMostrarFavoritos (idSerie){
    
//     let url2 = `https://api.themoviedb.org/3/tv/${idSerie}?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US`

//     fetch (url2)
//         .then(function(response){
//             return response.json();
//         })

//         .then(function(data){
//             console.log(data);
//             seccion.innerHTML += `<div class="pelicula">
//             <a href="./detail-movie.html?id=${data.id}"><img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="pelis"></a>
//             <h4 class="titulos-peliculas">${data.title}</h4>
//             <p class="fechas">${data.release_date}</p>
//         </div>`
//         })
//         .catch(function(e){
//         console.log(e);
//         })
// }
               
})



