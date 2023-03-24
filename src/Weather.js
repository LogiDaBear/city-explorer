import React, { Component } from 'react'
import WeatherDay from './WeatherDay.js';

export default class Weather extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Weather</h3>
        <ul>
          let weatherList = {this.props.weatherData.map((day, idx) => (
            <WeatherDay key={idx} description={`Description: ${day.description}`} date={`Date: ${day.date} `}/>
             

            
          ))}
            </ul>
      </div>
    )
  }
}

