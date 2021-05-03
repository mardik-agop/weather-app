import React, {useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";

// api key and base
const api = {
  key: "0624c6091c11be12543d536559438c53",
  base: "https://api.openweathermap.org/data/2.5/"
}

const Profile = () => {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const { user, isAuthenticated } = useAuth0();

  // search abou city
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  return (
    isAuthenticated && ( 
     <div>
       <main>
        <div className="search-container">
          <input 
            type="text"
            className="search"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div className="weather-box">
          <div>
            <div className="city">City: {weather.name}, {weather.sys.country}</div>
          </div>
          <div className="temp-box">
            <div className="temp">Tempritor: {Math.round(weather.main.temp)}°c</div>
            <div className="feels">Feeling Like: {Math.round(weather.main.feels_like)}°c</div>
            <div className="hum">Humidity: {weather.main.humidity}</div>
            <div className="sky">Sky: {weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
      </div>
    )
  )
}

export default Profile