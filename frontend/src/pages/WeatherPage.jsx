// src/pages/WeatherPage.jsx
import React, { useState } from 'react';

const WeatherPage = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const fetchWeather = async (city) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/weather', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ city }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };


    return (
        <div>
            <h1>Weather Tracker</h1>
            <form onSubmit={fetchWeather}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    required
                />
                <button type="submit">Get Weather</button>
            </form>

            {weather && (
                <div>
                    <h2>Weather Forecast for {weather.city}, {weather.country}</h2>
                    <ul>
                        {weather.forecast.map((day, index) => (
                            <li key={index}>
                                <strong>Date:</strong> {day.dt_txt} <br />
                                <strong>Temperature:</strong> {day.main.temp}°C <br />
                                <strong>Weather:</strong> {day.weather[0].description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default WeatherPage;
