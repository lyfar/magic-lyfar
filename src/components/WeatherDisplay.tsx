"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  location: string;
  lastUpdated: string;
}

const WeatherDisplay = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      // Fetch directly from HK Observatory JSON API
      const response = await fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en', {
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status}`);
      }

      const weatherData = await response.json();

      // Extract temperature from Hong Kong Observatory
      const observatoryData = weatherData.temperature?.data?.find(
        (item: any) => item.place === 'Hong Kong Observatory'
      );

      if (!observatoryData || !observatoryData.value) {
        throw new Error('Temperature data not found');
      }

      const temperature = observatoryData.value;

      // Extract last update time
      const lastUpdated = weatherData.temperature?.recordTime || 'Recently';

      const weatherInfo = {
        temperature,
        location: 'Hong Kong',
        lastUpdated,
      };

      setWeather(weatherInfo);
      setError(null);
    } catch (err) {
      setError('Weather unavailable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Update weather every 5 minutes
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error || !weather) {
    return <span>Weather unavailable</span>;
  }

  return (
    <span>
      {weather.temperature}°C
    </span>
  );
};

export default WeatherDisplay;
