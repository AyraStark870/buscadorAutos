// Selectores
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 11;

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);

    llenarSelect();
})

marca.addEventListener('change', e => {
    datosBusqueda.marca= e.target.value;
    filtrarAutos();
})
year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAutos();
})
minimo.addEventListener('change', e => {
    datosBusqueda.minimo = Number(e.target.value);
    filtrarAutos();
})
maximo.addEventListener('change', e => {
    datosBusqueda.maximo = Number(e.target.value);
    filtrarAutos();
})

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value) ;
    filtrarAutos();
})
color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAutos();
})
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    console.log(datosBusqueda);
    filtrarAutos();
})




function mostrarAutos(autos){
    limpiarHTML()
    autos.forEach( x => {
        const { marca, color, modelo, transmision, year, precio, puertas} = x;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `${marca} ${modelo} - ${year} - ${puertas} puertas -Transmision: ${transmision}
        -Precio: ${precio} -Color: ${color}
        `;
        resultado.appendChild(autoHTML)
    })
}
function limpiarHTML(){
  while(resultado.firstChild){
      resultado.removeChild(resultado.firstChild)
  }
}

function llenarSelect() {

   for( let i = max; i >= min; i-- ){
     const opcion = document.createElement('option');
     opcion.value = i;
     opcion.textContent = i;
     document.querySelector('#year').appendChild(opcion);
    }

}

//FUNCION DE ALTO NIVEL

function filtrarAutos(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarPuertas).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarColor).filter(filtrarTrans)

    if(resultado.length){
       mostrarAutos(resultado);
   } else {
      noResultado();
   }
}
function noResultado(){
    limpiarHTML()
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'no hay resultados, intenta con otros terminos de busqueda'
    resultado.appendChild(noResultado)
}
function filtrarMarca(x){//toma la iteracion del objeto actual como si estuvieramos trabajando con el filter
    const { marca } = datosBusqueda;
    if(marca){
        return x.marca === marca
    }
    return x;
}
function filtrarYear(x) {
    const { year } = datosBusqueda;
    if (year) {
        return x.year === year
    }
    return x;
}
function filtrarPuertas(x) {
    const { puertas } = datosBusqueda;
    if (puertas) {
        return x.puertas === puertas
    }
    return x;
}
function filtrarTrans(x) {
    const { transmision } = datosBusqueda;
    if (transmision) {
        return x.transmision === transmision
    }
    return x;
}
function filtrarColor(x) {
    const { color } = datosBusqueda;
    if (color) {
        return x.color === color
    }
    return x;
}
function filtrarMinimo(x){
    const { minimo } = datosBusqueda;
    if (minimo) {
        return x.precio >= minimo
    }
    return x;
}
function filtrarMaximo(x){
    const { maximo } = datosBusqueda;
    if (maximo) {
        return x.precio <= maximo
    }
    return x;
}


