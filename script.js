const apiKey = `9c7f3debe47c1e26e25972ac1ee001b4`;

        function fetchWeather() {
            const location = document.getElementById('locationInput').value;
            const weatherDetails = document.getElementById('weatherDetails');
            weatherDetails.innerHTML = 'Loading...';

            if (navigator.geolocation && !location) {
                navigator.geolocation.getCurrentPosition(position => {
                    const { latitude, longitude } = position.coords;
                    getWeatherData(`lat=${latitude}&lon=${longitude}`);
                });
            } else {
                getWeatherData(`q=${location}`);
            }
        }

        function getWeatherData(query) {
            const apiURL = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`;

            fetch(apiURL)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        }

        function displayWeather(data) {
            const weatherDetails = document.getElementById('weatherDetails');
            if (data.cod === 200) {
                const { main, weather, name } = data;
                weatherDetails.innerHTML = `
                    <h2>${name}</h2>
                    <p><i class="fas fa-cloud icon-cloud"></i> ${weather[0].description}</p>
                    <p><i class="fas fa-thermometer-half icon-temp"></i>Temperature: ${main.temp}°C</p>
                    <p><i class="fas fa-tint icon-humidity"></i> Humidity: ${main.humidity}%</p>
                    <p><i class="fas fa-tachometer-alt icon-pressure"></i>Pressure: ${main.pressure} hPa</p>
                `;
                if (main.temp < 25) { //  the temperature threshold 
                    createRaindrops();
                } else {
                    clearRaindrops();
                }
            } else {
                weatherDetails.innerHTML = 'Location not found.';
            }
        }
        
        function createRaindrops() {
            const rainContainer = document.getElementById('rain-container');
            rainContainer.innerHTML = '';
            for (let i = 0; i < 100; i++) { // number of raindrops 
                const raindrop = document.createElement('div');
                raindrop.classList.add('raindrop');
                raindrop.style.left = Math.random() * 100 + 'vw';
                raindrop.style.animationDuration = Math.random() * 0.5 + 1.5 + 's'; //  speed of raindrops
                rainContainer.appendChild(raindrop);
            }
        }
        
        function clearRaindrops() {
            const rainContainer = document.getElementById('rain-container');
            rainContainer.innerHTML = '';
        }
          

