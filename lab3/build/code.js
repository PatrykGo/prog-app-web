class App {
    constructor() {
        this.APIKey = '8de8f701a45ae7dd5ffc153e401f2619';
        this.searchInp = document.getElementById('searchInp');
        this.searchBtn = document.getElementById('searchBtn');
        this.tileCon = document.getElementById('tileCon');
        this.searchBtn.addEventListener('click', () => this.clickSearchBtn(), false);
        this.generateTiles();
    }
    clickSearchBtn() {
        const searchCity = this.searchInp.value;
        const weather = this.getWeather(searchCity);
        this.generateTiles();
    }
    async getWeather(city) {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.APIKey}`);
        console.log(res);
        const response = { "coord": { "lon": -0.13, "lat": 51.51 }, "weather": [{ "id": 300, "main": "Drizzle", "description": "light intensity drizzle", "icon": "09d" }], "base": "stations", "main": { "temp": 280.32, "pressure": 1012, "humidity": 81, "temp_min": 279.15, "temp_max": 281.15 }, "visibility": 10000, "wind": { "speed": 4.1, "deg": 80 }, "clouds": { "all": 90 }, "dt": 1485789600, "sys": { "type": 1, "id": 5091, "message": 0.0103, "country": "GB", "sunrise": 1485762037, "sunset": 1485794875 }, "id": 2643743, "name": city, "cod": 200 };
        this.saveToLocalStorage(response);
        return response;
    }
    saveToLocalStorage(value) {
        const list = this.getFromLocalStorage('weather');
        const weatherList = JSON.parse(list) || [];
        weatherList.push(value);
        localStorage.setItem('weather', JSON.stringify(weatherList));
    }
    getFromLocalStorage(key) {
        return localStorage.getItem(key);
    }
    generateTiles() {
        const list = this.getFromLocalStorage('weather');
        const weatherList = JSON.parse(list) || [];
        if (weatherList.lenght === 0)
            return;
        this.tileCon.innerHTML = '';
        weatherList.map(({ name, main }) => {
            const div = document.createElement('div');
            const city = document.createElement('h3');
            city.textContent = name;
            const humidity = document.createElement('div');
            humidity.textContent = main.humidity;
            const pressure = document.createElement('div');
            pressure.textContent = main.pressure;
            const temp = document.createElement('div');
            temp.textContent = main.temp;
            const temp_max = document.createElement('div');
            temp_max.textContent = main.temp_max;
            const temp_min = document.createElement('div');
            temp_min.textContent = main.temp_min;
            div.appendChild(city);
            div.appendChild(humidity);
            div.appendChild(pressure);
            div.appendChild(temp);
            div.appendChild(temp_max);
            div.appendChild(temp_min);
            this.tileCon.appendChild(div);
        });
    }
}
const startApp = new App();
//lab3/SRC/code.ts --outDir lab3/build
