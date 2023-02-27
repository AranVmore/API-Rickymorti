//ELEMENTOS CREADOS DESDE JS EN HTML
const div = document.createElement("div")
div.textContent = "Ejercicio 02 - HTML, CSS, JS"
const test = document.getElementById("test")
test.appendChild(div)

//TABLA DE COLORES PARA EL ESTADO DEL PERSONAJE
var typeColors = {
    Dead: '#dc3545',
    Alive: '#198754',
    unknown: '#adb5bd',
};

document.getElementById('mostrar').addEventListener('click', function() {
    let elementoActivo = document.querySelector('input[name="status"]:checked');
    if(elementoActivo) {
        //alert(elementoActivo.value);
        //console.log(elementoActivo.value);

    } else {
        alert('No hay ninún elemento activo');
    }
});

// Solicitud GET (Request).
fetch('https://rickandmortyapi.com/api')
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => console.log(json))    //imprimir los datos en la consola
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores


//FUNCION PAGINACIÓN
//Hemos creado en index un select con el que obtener el valor que le pasaremos a la funcion
const pag = async (pagina) => {
    var url = "https://rickandmortyapi.com/api/character/?page=" + pagina;
    const api = await fetch(url); //url + valor pagina
    const data = await api.json(); //de cada una obtendremos una respuesta en json
    console.log(data);

    divPintar = document.querySelector("#card-container"); // 
    divPintar.innerHTML="";
    //accedemos a cada elemento del array de 20 elementos
    data.results.map(item => { 
        //console.log(item);
        var estado = item.status;
        var color1 = typeColors[estado];
        console.log(estado);
    
        divItem = document.createElement('div') //creamos div x cada element
        divItem.setAttribute("class","col-lg-3 col-md-6 col-sm-6 col-12 mb-4 position-relative") //aplicamos clase
        divItem.innerHTML = `
        <div class="card mx-3 my-3" style="width: 18rem;">
            <img src="${item.image}" class="card-img-top" alt="...">
            <span class="position-absolute badge" style="background-color:${color1}">${item.status}</span>
            <div class="card-header text-uppercase text-center">${item.name}</div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">Especie: ${item.species}</li>
            <li class="list-group-item">Género: ${item.gender}</li>
            </ul> 
        </div>
        `
        divPintar.appendChild(divItem);
    });
}
pag(1);

//CREAMOS UN BUSCADOR PARA FILTRAR POR NOMBRE
//en el html creamos un form que contiene un input para el buscador y un boton
const buscador = async (event) => {
    event.preventDefault();
    var {value} = event.target.personaje;
    var url2 = "https://rickandmortyapi.com/api/character/?name=" + value;
    const api2 = await fetch(url2); //url + valor pagina
    const data2 = await api2.json(); //de cada una obtendremos una respuesta en json

    divPintar = document.querySelector("#card-container"); // 
    divPintar.innerHTML=""; 

    //leemos los resultados para mostrar los nombres que coinciden con la busqueda
    data2.results.map(resultado =>{
        var elemento = resultado.name;
        console.log(elemento);

        var estado = resultado.status;
        var color1 = typeColors[estado];
        console.log(estado); 

        divItem = document.createElement('div') //creamos div x cada element
        divItem.setAttribute("class","col-lg-3 col-md-6 col-sm-6 col-12 mb-4 position-relative") //aplicamos clase
        divItem.innerHTML = `
        <div class="card mx-3 my-3" style="width: 18rem;">
            <img src="${resultado.image}" class="card-img-top" alt="...">
            <span class="position-absolute badge" style="background-color:${color1}">${resultado.status}</span>
            <div class="card-header text-uppercase text-center">${resultado.name}</div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">${resultado.species}</li>
            <li class="list-group-item">${resultado.gender}</li>
            </ul> 
        </div>
        `
        divPintar.appendChild(divItem);
    })
}

const filtroStatus = async (event) => {
    event.preventDefault();
    var {value} = event.target.status;
    var url2 = "https://rickandmortyapi.com/api/character/?status=" + value;
    const api2 = await fetch(url2); //url + valor pagina
    const data2 = await api2.json(); //de cada una obtendremos una respuesta en json
    console.log("hola" + value);

    divPintar = document.querySelector("#card-container"); // 
    divPintar.innerHTML=""; 

    //leemos los resultados para mostrar los nombres que coinciden con la busqueda
    data2.results.map(resultado =>{
        var elemento = resultado.name;
        console.log(elemento);

        var estado = resultado.status;
        var color1 = typeColors[estado];
        console.log(estado); 

        divItem = document.createElement('div') //creamos div x cada element
        divItem.setAttribute("class","col-lg-3 col-md-6 col-sm-6 col-12 mb-4 position-relative") //aplicamos clase
        divItem.innerHTML = `
        <div class="card mx-3 my-3" style="width: 18rem;">
            <img src="${resultado.image}" class="card-img-top" alt="...">
            <span class="position-absolute badge" style="background-color:${color1}">${resultado.status}</span>
            <div class="card-header text-uppercase text-center">${resultado.name}</div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">${resultado.species}</li>
            <li class="list-group-item">${resultado.gender}</li>
            </ul> 
        </div>
        `
        divPintar.appendChild(divItem);
    })
}









