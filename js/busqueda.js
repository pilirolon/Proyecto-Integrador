
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
const query = queryStringObj.get('busqueda');	

const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1&include_adult=false`

fetch(url) 
	.then(function(response){
	    return response.json();
    })
	.then(function(data){
        results = console.log(`Resultados de busqueda de  ${query}`)
	    console.log(data.results);

        const h3 = document.querySelector('h3');
        h3.innerText += query;

        for (let i=0; i < data.length; i++){
          resultadosJS.innerHTML()
          //  innerHTML en que elemento del API hace referencia al titulo
           // que arme un article para cada uno con nombre, descripcion, como rick and morty
           // referencia a ese array
        }
    
    })
	.catch(function(error){
	    console.log('El error es: ' + error);
    });