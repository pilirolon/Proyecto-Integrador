
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
const query = queryStringObj.get('busqueda');	

const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&page=1&include_adult=false`

fetch(url) 
	.then(function(response){
	    return response.json();
    })
	.then(function(data){
        console.log(`Resultados de busqueda de ${query}`)
	    console.log(data.results);

        const h3 = document.querySelector('h3');
        h3.innerText += query;

       // for 

    })
	.catch(function(error){
	    console.log('El error es: ' + error);
    });