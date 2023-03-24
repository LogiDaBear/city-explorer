import React from "react";

class Movies extends React.Component {
  render() {
    return (
      <>
        <p>{`Movies: ${this.props.movies.title}`}</p>
        <p>{`Overview: ${this.props.movies.overview}`}</p>
      </>
    )
  }
};

export default Movies;