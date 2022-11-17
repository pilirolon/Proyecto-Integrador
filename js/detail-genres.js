let url = "https://api.themoviedb.org/3/discover/movie?api_key=45d43a6901861343cdb188d4f3bafd7c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"

fetch (url)
.then(function(response) {
   return response.json()
  })
.then (function(detalle) {
  console.log(detalle);
})
.catch(function(error) {
	console.log("Error: " + error);
  })
