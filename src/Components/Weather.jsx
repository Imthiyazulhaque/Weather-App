import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css"
import searchIcon from "../assets/search.png"
import clearIcon from "../assets/clear.png"
import cloudIcon from "../assets/cloud.png"
import drizzleIcon from "../assets/drizzle.png"
import humidityIcon from "../assets/humidity.png"
import rainIcon from "../assets/rain.png"
import windIcon from "../assets/wind.png"
import snowIcon from "../assets/snow.png"

const Weather = () => {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(true)
  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": clearIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon

  }

  const search = async (city) => {
    try {
      if (city === "") {
        alert("Enter City Name")
        return;
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url)
      console.log('kkk',response)
      const data = await response.json()
      if (!response.ok) {
        alert(data.message)
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clearIcon
      setWeatherData({
        icon: icon,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description
      })
    } catch (error) {
      setWeatherData(true)
      console.error(error)
    }

  }
  useEffect(() => {
    search("Tenkasi")
  }, [])
  return (
    <div className='weather'>
      <div className="search-Bar">
        <input ref={inputRef} type="text" placeholder='search' onKeyDown={(e) => {
          if (e.key === "Enter") {
            search(inputRef.current.value.trim());
          }
        }} />
        <img src={searchIcon} alt="" onClick={() => search(inputRef.current.value.trim())} />
      </div>
      {weatherData ? <> <img src={weatherData.icon} alt="" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°c</p>
        <p className='description'>{weatherData.description}</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidityIcon} alt="" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={windIcon} alt="" />
            <div>
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div></> : <></>}
    </div>

  )
}

export default Weather
