//variables del dom
const $resultado =  document.querySelector('#resultado')
const $year = document.querySelector('#year')
const $marca = document.querySelector('#marca')
const $minimo = document.querySelector('#minimo')
const $maximo = document.querySelector('#maximo')
const $puertas = document.querySelector('#puertas')
const $transmision = document.querySelector('#transmision')
const $color = document.querySelector('#color')


const maxFecha = new Date().getFullYear();
const minFecha = maxFecha-10;


//objeto para buscar

const datosBusqueda = {
    year:"",
    marca:"",
    minimo:"",
    maximo:"",
    puertas:"",
    transmision:"",
    color:"",

}

//se ejecutara apenas cargue el DOM
document.addEventListener('DOMContentLoaded',eventListeners);
function eventListeners(){
    //muesta los autos
    mostrarAutos(autos);
    //llena las opciones de año
    generarYearSelect();


}

//limpiar HTML
function limpiarHTML(){
    while($resultado.firstChild){
        $resultado.removeChild($resultado.firstChild)
    }
}

//generar objetos de busqueda
$marca.addEventListener("change",(e)=>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
})

$year.addEventListener("change",(e)=>{
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
})

$minimo.addEventListener("change",(e)=>{
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
})

$maximo.addEventListener("change",(e)=>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
})

$puertas.addEventListener("change",(e)=>{
    datosBusqueda.puertas =parseInt(e.target.value);
    filtrarAuto();
})

$transmision.addEventListener("change",(e)=>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

$color.addEventListener("change",(e)=>{
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda)
    filtrarAuto();
})



//muestras todos los autos en el div
function mostrarAutos(autos){
    //limpia el html
    limpiarHTML();
    //itera lo BD autos
    autos.forEach( auto => {
        const {marca, modelo,year, puertas, transmision, color, precio} = auto
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
        ${modelo} ${marca} - ${year} - ${puertas} transmision: ${transmision} ${color} $precio:${precio}
        `
        //insertar cada html generado
        $resultado.appendChild(autoHTML)
    });
}

//genera las opciones en el select year
function generarYearSelect(){
    for(let i = maxFecha; i>minFecha;i--){
        const optionYearHTML = document.createElement('option')
        optionYearHTML.value = i;
        optionYearHTML.textContent = i
        $year.appendChild(optionYearHTML)
    }
}

//filtrar el carro
function filtrarAuto(){
    const resultados = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMaximo).filter(filtrarMinimo).filter(filtrarPuertas).filter(filtrarTrasmicion).filter(filtrarColor)
    console.log(resultados)
    if(resultados.length>0){
        mostrarAutos(resultados)
    }
    else{
        noResultado()
    }

}

function filtrarMarca(auto){   
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca
    }
    return auto
}

function filtrarYear(auto){   
    if(datosBusqueda.year){
        return auto.year === datosBusqueda.year
    }
    return auto
}

function filtrarMaximo(auto){
    if(datosBusqueda.maximo){
        return auto.precio <= datosBusqueda.maximo
    }
    return auto
}

function filtrarMinimo(auto){
    if(datosBusqueda.minimo){
        return auto.precio >= datosBusqueda.minimo
    }
    return auto
}

function filtrarPuertas(auto) {
    if(datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas
    }
    return auto
}

function filtrarTrasmicion(auto){
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision
    }
    return auto
}

function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color
    }
    return auto
}

//mensaje en el caso que no haya resultados

function noResultado(){
    limpiarHTML()
    const noResultadoHtml = document.createElement('div')
    noResultadoHtml.classList.add("alerta","error")
    noResultadoHtml.textContent = "No hay coincidencias, intenta con otros parametros de busqueda"
    $resultado.appendChild(noResultadoHtml)
}
