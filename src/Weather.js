import React, { Component } from 'react'

export default class Weather extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Weather</h3>
        <ul>
          {this.props.weatherData.map((day, idx) => (
            // console.log(day);
            <li key={idx}>
              <p>{`Date: ${day.date} `}</p>
              <p>{`Description: ${day.description}`}</p>

            </li>
          ))}
        </ul>
      </div>
    )
  }
}

