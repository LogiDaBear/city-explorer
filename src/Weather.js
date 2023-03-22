import React, { Component } from 'react'

export default class Weather extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Weather</h3>
        {this.props.weatherData.map(day =>{
          console.log(day);
          <ul>
            Object-Brain is fried. 1 am ...
          </ul>
        })}
      </div>
    )
  }
}

