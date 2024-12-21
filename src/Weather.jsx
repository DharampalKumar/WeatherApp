import React, { useState } from "react";
import axios from "axios";
import './App.css'; // Import CSS

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    setError(null); // Reset error state
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eb9d013c76d562458ffb7b1e2f5816ab`
      );
      setWeather(response.data);
    } catch (error) {
      setError("Error fetching weather data. Please try again.");
    }
  };

  const handleClick = () => {
    fetchWeather();
  };

  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);
  const kelvinToFahrenheit = (kelvin) =>
    (((kelvin - 273.15) * 9) / 5 + 32).toFixed(2);

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
      />
      <br />
      <button onClick={handleClick}>Get Weather</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <p>Temperature: {kelvinToCelsius(weather.main.temp)}°C</p>
          <p>Temperature: {kelvinToFahrenheit(weather.main.temp)}°F</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;

