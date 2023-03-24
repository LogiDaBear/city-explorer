import React from "react";

class WeatherDay extends React.Component {
  render() {
    return (
      <li>
        <p>{`Date: ${this.props.date} `}</p>
        <p>{`Description: ${this.props.description}`}</p>
      </li>
    )
  }
};

export default WeatherDay;

