
let ruta = "https://randomuser.me/api/";

fetch (ruta)
    .then(function(response){
        return response.json()
    })
    .then (function(buscador){
        let buscador  = document.querySelector(".header.lupita");
        return "Search Movies"
      })
    .catch(function(e){
        console.log(e)
    })

    