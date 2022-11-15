let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
const query = queryStringObj.get('busqueda');	

const url = 
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
  

