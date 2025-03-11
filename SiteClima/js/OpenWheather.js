class OpenWheather {

    constructor() {
        this.latitude = "-27.068447292873564";
        this.longitude = "-48.88434236862687";
        this.key = "61d242de0b3d549efed183f5c0501072";
    }

    async getClima() {

        let chave = this.key;
        let lat = this.latitude;
        let lon = this.longitude;
        let units = 'metric';
        let lang = 'pt_br';

        let url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+chave+'&units='+units+'&lang='+lang+'';

        let response = await fetch(url);

        let objJson = await response.json();

        return objJson;

    }
}