'use client';

import React, { useState } from 'react';
import SearchBar from '../components/searchbar';
import WeatherCard from '../components/weathercard';

const API_KEY = '1230a8fdc6457603234c68ead5f3f967';

export default function Home() {
  const [weather, setWeather] = useState<{
    location: string;
    temperature: number;
    conditions: string;
    aqi?: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (location: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric&lang=vi`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Không tìm thấy thông tin thời tiết cho địa điểm này');
      }

      const weatherData = await weatherResponse.json();
      
      const aqiResponse = await fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${API_KEY}`
      );
      
      let aqiData = null;
      if (aqiResponse.ok) {
        const aqiJson = await aqiResponse.json();
        aqiData = aqiJson.list[0].main.aqi;
      }

      setWeather({
        location: weatherData.name,
        temperature: Math.round(weatherData.main.temp),
        conditions: weatherData.weather[0].description,
        aqi: aqiData
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Không thể lấy dữ liệu thời tiết');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Thời tiết hôm nay</h1>
        <p className="app-subtitle">Nhập tên thành phố để xem thông tin thời tiết</p>
      </header>

      <main className="main-content">
        <div className="search-container">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="weather-container">
          {isLoading && <div className="loading">Đang tải...</div>}
          {error && <div className="error">{error}</div>}
          {weather && (
            <WeatherCard
              location={weather.location}
              temperature={weather.temperature}
              conditions={weather.conditions}
              aqi={weather.aqi}
            />
          )}
        </div>
      </main>

            <footer className="app-footer">
              <p>© {new Date().getFullYear()} Weather App</p>
            </footer>
          </div>
        );
      }