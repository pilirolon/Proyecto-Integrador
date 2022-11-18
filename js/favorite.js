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
function buscarYMostrarFavoritos (id){
    
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US`

    fetch (url)
        .then(function(response){
            return response.json();
        })

        .then(function(data){
            console.log(data);
            seccion.innerHTML += `<div class="pelicula">
            <a href="./detail-movie.html"><img src="https://image.tmdb.org/t/p/w500/${data[i].poster_path}" alt="pelis"></a>
            <h4 class="titulos-peliculas">${data[i].title}</h4>
            <p class="fechas">${data[i].release_date}</p>
            <form action="./favoritos.html" method="GET">
                <button type="submit" role="button" class="boton-heart"><i class="icon-heart"></i></button></a>
            </form>
        </div>`
        })

        .catch(function(e){
        console.log(e);
        })
}
               
       