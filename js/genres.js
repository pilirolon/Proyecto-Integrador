let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
const query = queryStringObj.get('busqueda');	

const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US"
fetch(url) 
.then(function(response) {
	return response.json()
  })
  .then(function(data) {
	console.log(data);
  })
  .catch(function(error) {
	console.log("Error: " + error);
  })
  
