class App3 {
    constructor() {
        this.APIKey = '8de8f701a45ae7dd5ffc153e401f2619';
        this.appStorage = new AppStorage3();
        this.searchInp = document.getElementById('searchInp');
        this.searchBtn = document.getElementById('searchBtn');
        this.tileCon = document.getElementById('tileCon');
        this.searchBtn.addEventListener('click', () => this.clickSearchBtn(), false);
        this.generateTiles();
        setInterval(() => this.refreshAfter20Sec(), 5000);
    }
    clickSearchBtn() {
        const searchCity = this.searchInp.value;
        const weather = this.getWeather(searchCity);
        if (weather)
            setTimeout(() => this.generateTiles(), 500);
    }
    async refreshAfter20Sec() {
        const list = this.appStorage.getFromLocalStorage('weather');
        const weatherList = JSON.parse(list) || [];
        localStorage.removeItem('weather');
        if (weatherList.length > 0) {
            const cityNames = weatherList.map(list => list.name);
            for (const c of cityNames) {
                await this.getWeather(c);
            }
            this.generateTiles();
        }
    }
    async getWeather(city) {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.APIKey}&units=metric`).then(res => res.json());
        if (res.cod === 200) {
            this.appStorage.saveToLocalStorage(res);
            return res;
        }
        else {
            alert('There is no city with that name!');
            return null;
        }
    }
    generateTiles() {
        const list = this.appStorage.getFromLocalStorage('weather');
        const weatherList = JSON.parse(list) || [];
        if (weatherList.lenght === 0)
            return;
        this.tileCon.innerHTML = '';
        weatherList.map(({ name, main }) => {
            const div = document.createElement('div');
            const city = document.createElement('h3');
            city.textContent = name;
            const humidity = document.createElement('div');
            humidity.textContent = `wilgotność: ${main.humidity}%`;
            const pressure = document.createElement('div');
            pressure.textContent = `ciśnienie: ${main.pressure}hPa`;
            const temp = document.createElement('div');
            temp.textContent = `temperatura: ${main.temp}°C`;
            const temp_max = document.createElement('div');
            temp_max.textContent = `temperatura maksymalna: ${main.temp_max}°C`;
            const temp_min = document.createElement('div');
            temp_min.textContent = `temperatura minimalna: ${main.temp_min}°C`;
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
class AppStorage3 {
    saveToLocalStorage(value) {
        const list = this.getFromLocalStorage('weather');
        const weatherList = JSON.parse(list) || [];
        weatherList.push(value);
        localStorage.setItem('weather', JSON.stringify(weatherList));
    }
    getFromLocalStorage(key) {
        return localStorage.getItem(key);
    }
}
const startApp3 = new App3();
//tsc lab3/SRC/code.ts --outDir lab3/build --target ES2017
