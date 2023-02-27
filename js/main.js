/*ENUNCIADO: CREAMOS UNA APLICACIÓN MEDIANTE LA API DE RICK&MORTI PARA PODER REALIZAR EL
BUSCADOR DE PERSONAJES Y PODER FILTRARLOS DE DIFERENTES FORMAS, MOSTRANDO LOS RESULTADOS
CON INFORMACIÓN SOBRE ELLOS.*/

//ELEMENTOS CREADOS DESDE JS EN HTML
const div = document.createElement("div")
div.textContent = "Ejercicio 02 - HTML, CSS, JS"
const test = document.getElementById("test")
test.appendChild(div)


//IMPORTAMOS LOS ELEMENTOS DEL DOCUMENTO QUE UTILIZAREMOS
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

//VARIABLES GLOBALES 
var typeColors = {
    Dead: '#dc3545',
    Alive: '#198754',
    unknown: '#adb5bd',
};

var valuesearch = '';
var valuestatus = '';
var valuespecies = '';
var valuegender = '';
var valuetype = '';
var personajename = '';

//fUNCIÓN BOTON APLICAR PARA FILTRADOS
document.getElementById('aplicar').addEventListener('click', function() {
    let elementoActivo = document.querySelector('input[name="status"]:checked');
    if(elementoActivo) {
    } else {
        alert('Seleccione un filtro');
    }
});

//CREAMOS UN BUSCADOR PARA FILTRAR POR NOMBRE
//obtenemos el valor escrito por usuario en input, lo pasamos a la url, almacenamos y enviamos 
const buscador = async (event) => {
    event.preventDefault();
    var {value} = event.target.personaje;
    var url2 = "https://rickandmortyapi.com/api/character/?name=" + value;
    valuesearch = value;

    //si el valor que enviamos no corresponde con ningún personaje del fichero
    if (valuesearch != personajename){
        divPintar = document.querySelector("#card-container"); // 
        divPintar.innerHTML="";

            divItem = document.createElement('div') //creamos div x cada element
            divItem.setAttribute("class","col-lg-3 col-md-6 col-sm-6 col-12 mb-4") //aplicamos clase
            divItem.innerHTML = `
            <div class="card mx-3 my-3" style="width: 18rem;">
                <img src="https://rickandmortyapi.com/api/character/avatar/19.jpeg" class="card-img-top" alt="...">
                <div class="card-header text-uppercase text-center">Personaje no encontrado</div>
            </div>
            `
            divPintar.appendChild(divItem);

        //CON ESTE BUCLE VAMOS PINTANDO LOS RESULTADOS EN EL SELECT DEL HTML
        divPaginar = document.querySelector("#pagina");
        divPaginar.innerHTML="<option selected>Sin coincidencia</option>";
        divItem2.innerHTML=``
        divPaginar.appendChild(divItem2);
    }

    const api2 = await fetch(url2); //url + valor pagina
    const data2 = await api2.json(); //de cada una obtendremos una respuesta en json
    pag(data2);
}

//FUNCIONES PARA LOS FILTROS (STATUS, SPECIES, TYPE, GENDER)
//filtrar por estado (vivo, muerto, desconocido)
const filtroStatus = async (event) => {
    event.preventDefault();
    var {value} = event.target.status;
    var url2 = "https://rickandmortyapi.com/api/character/?status=" + value;
    valuestatus = value;
    const api2 = await fetch(url2); //url + valor pagina
    const data2 = await api2.json(); //de cada una obtendremos una respuesta en json
    pag(data2);
}
//filtrar por especie (multitud de opciones)
const filtroSpecies = async (event) => {
    event.preventDefault();
    var {value} = event.target.status;
    var url2 = "https://rickandmortyapi.com/api/character/?species=" + value;
    valuespecies = value;
    const api2 =  await fetch(url2);
    const data2 = await api2.json();
    pag(data2);
}
//filtrar por género (mujer, hombre, sin género o desconocido)
const filtroGender = async (event) => {
    event.preventDefault();
    var {value} = event.target.status;
    var url2 = "https://rickandmortyapi.com/api/character/?gender=" + value;
    valuegender = value;
    const api2 = await fetch(url2); //url + valor pagina
    const data2 = await api2.json(); //de cada una obtendremos una respuesta en json
    pag(data2);
}
//filtrar por tipo (multitud de opciones)
const filtroType = async (event) => {
    event.preventDefault();
    var {value} = event.target.status;
    var url2 = "https://rickandmortyapi.com/api/character/?type=" + value;
    valuetype = value;
    const api2 = await fetch(url2); //url + valor pagina
    const data2 = await api2.json(); //de cada una obtendremos una respuesta en json
    pag(data2);
}


//FUNCION PARA LA PAGINACIÓN
//Creamos un select que se irá adaptando a las busquedas y filtrados que realizemos
const pag = async (pagina) => {
    var url = "https://rickandmortyapi.com/api/character/?page=" + pagina + '&name=' + valuesearch + '&status=' + valuestatus + '&gender=' + valuegender + '&species=' + valuespecies + '&type=' + valuetype;
    const api = await fetch(url); //url + valor pagina
    const data = await api.json(); //de cada una obtendremos una respuesta en json
    pagresultados = data.info.pages; //número de resultados de la búsqueda

    divPintar = document.querySelector("#card-container"); // 
    divPintar.innerHTML="";
        //OBTENEMOS LOS PERSONAJES QUE COINCIDAN CON LA BUSQUEDA Y LOS PINTAMOS
        data.results.map(item => { 
            personajename = item.name;
            var estado = item.status;
            var color1 = typeColors[estado];
            divItem = document.createElement('div') //creamos div x cada element
            divItem.setAttribute("class","col-lg-3 col-md-6 col-sm-6 col-12 mb-4 position-relative") //aplicamos clase
            divItem.innerHTML = `
            <div class="card mx-3 my-3" style="width: 18rem;">
                <img src="${item.image}" class="card-img-top" alt="...">
                <span class="position-absolute badge span-right" style="background-color:${color1}">${item.status}</span>
                <span class="position-absolute badge" style="background-color:black">${item.id}</span>
                <div class="card-header text-uppercase text-center">${item.name}</div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">Especie: ${item.species}</li>
                <li class="list-group-item">Género: ${item.gender}</li>
                </ul> 
            </div>
            `
            divPintar.appendChild(divItem);

            console.log(item.location.name)
        });    

    //CON ESTE BUCLE VAMOS PINTANDO LOS RESULTADOS EN EL SELECT DEL HTML
    divPaginar = document.querySelector("#pagina");
    divPaginar.innerHTML="<option selected>Selecciona página</option>";

    for(var i = 1; i <= pagresultados; i++){
        divItem2 = document.createElement('option')
        divItem2.innerHTML=`
        <option value="${i}">${i}</option>
        `
        divPaginar.appendChild(divItem2);;
    }

}
pag(1);




