async function mostrarClima() {

    let o = new OpenWheather();
    let clima = await o.getClima();
    console.log(clima);
    mostrarNaTela(clima);
}

async function mostrarClimaGeo(posicao) {
    
    console.log(posicao.coords.latitude);
    console.log(posicao.coords.longitude);

    let o = new OpenWheather();
    o.latitude = posicao.coords.latitude;
    o.longitude = posicao.coords.longitude;

    let clima = await o.getClima();
    console.log(clima);
    mostrarNaTela(clima);
}

function mostrarNaTela(clima) {

    let cidade = document.getElementById('cidade');
    let temp = document.getElementById('temperatura');
    let feels_like = document.getElementById('sensacao');
    let temp_min = document.getElementById('temp_min');
    let temp_max = document.getElementById('temp_max');
    let pressure = document.getElementById('pressao');
    let humidity = document.getElementById('humidade');
    let sea_level = document.getElementById('nivel_mar');
    let grnd_level = document.getElementById('nivel_solo');

    cidade.innerHTML = clima.name;
    temp.innerHTML = clima.main.temp+'°';
    feels_like.innerHTML = clima.main.feels_like+'°';
    temp_min.innerHTML = clima.main.temp_min+'°';
    temp_max.innerHTML = clima.main.temp_max+'°';
    pressure.innerHTML = clima.main.pressure+' Pa';
    humidity.innerHTML = clima.main.humidity+'%';
    sea_level.innerHTML = clima.main.sea_level+' mm';
    grnd_level.innerHTML = clima.main.grnd_level+' mm';

}

function getGeolocalizacao() {
    navigator.geolocation.getCurrentPosition(mostrarClimaGeo, ()=>{
        console.log('Falha ao obter a geolocalização');
    });
}

window.onload = () => {
    getGeolocalizacao();
}