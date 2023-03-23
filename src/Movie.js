import React, { Component } from 'react'

export default class Movie extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Movies</h3>
        <ul>
          {this.props.movieData.map((movie) =>(
            <li key={movie}>
              <p>{`Movies: ${movie.title}`}</p>
              <p>{`Movies: ${movie.overview}`}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}


