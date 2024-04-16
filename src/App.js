import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Style.css'

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [bgColor, setBgColor] = useState('blue-bg')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)

        // const temp = response.data.main.temp; // Convert temperature from Kelvin to Fahrenheit

        // // Change background color based on temperature
        // if (temp > 60) {
        //   setBgColor('orange-bg');
        // } else {
        //   setBgColor('blue-bg');
        // }        
      })
      setLocation('')
    }
  }

  const handleChange = (event) => {
    setLocation(event.target.value);
  }

  // useEffect(() => {
  //   // Fetch temperature from OpenWeather API
  //   axios.get(url)
  //     .then(response => {
  //       const temp = response.data.main.temp * 9/5 - 459.67; // Convert temperature from Kelvin to Fahrenheit

  //       // Change background color based on temperature
  //       if (temp > 60) {
  //         setBgColor({ backgroundColor: 'orange' });
  //       } else {
  //         setBgColor({ backgroundColor: 'rgb(0, 132, 255)' });
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching temperature:', error);
  //     });
  // }, []);
  //{`${bgColor} app`}

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={handleChange}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;