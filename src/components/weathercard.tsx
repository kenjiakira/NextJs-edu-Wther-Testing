import React from 'react';

interface WeatherCardProps {
  location: string;
  temperature: number;
  conditions: string;
  aqi?: number;
}

const getAQIStatus = (aqi: number) => {
  switch(aqi) {
    case 1: return { text: 'Tốt', color: 'text-green-600' };
    case 2: return { text: 'Khá', color: 'text-yellow-600' };
    case 3: return { text: 'Trung bình', color: 'text-orange-600' };
    case 4: return { text: 'Kém', color: 'text-red-600' };
    case 5: return { text: 'Rất kém', color: 'text-purple-600' };
    default: return { text: 'Không có dữ liệu', color: 'text-gray-600' };
  }
};

const WeatherCard: React.FC<WeatherCardProps> = ({ location, temperature, conditions, aqi }) => {
  const aqiStatus = aqi ? getAQIStatus(aqi) : null;

  return (
    <div className="weather-card animate-fadeIn">
      <div className="weather-card-content">
        <h2 className="weather-location text-center">{location}</h2>
        <div className="weather-details-container">
          <div className="weather-info">
            <div className="weather-details">
              <p className="weather-temperature">{temperature}°C</p>
              <p className="weather-conditions">{conditions}</p>
              {aqiStatus && (
                <p className={`weather-aqi ${aqiStatus.color}`}>
                  Chất lượng không khí: {aqiStatus.text}
                </p>
              )}
            </div>
            <div className="weather-icon">
              {temperature > 25 ? '🌞' : temperature < 15 ? '❄️' : '⛅'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;