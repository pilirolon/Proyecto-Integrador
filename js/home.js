let ruta = "https://api.themoviedb.org/3/movie/popular?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1"
 
let peliculas=document.querySelector(".pelicula-principal")



fetch(ruta) 
    for (let i = 0; i < 6 ; i++){    
    }

	then(function(response){
	return response.json();
})
	.then(function(data){
	console.log(data);
})
	.catch(function(error){
	console.log('El error es: ' + error);
})