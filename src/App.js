import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Weather from './Weather'
import Movie from './Movie'
import Container from 'react-bootstrap/Container';
import './App.css';
// import image from './img/loficity.gif';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      city: '',
      cityData: {},
      error: false,
      errorMessage: '',
      weatherData: null,
      showMap: false,
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value

    });
  };
  //** async/await */
  getCityData = async (event) => {
    event.preventDefault();

    try {
      // TODO: Use axios to get the data from LocationIQ - using city in state
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      // `${process.env.REACT_APP_SERVER}/weather?lat=${}&lon=${}&searchQuery=${this.state.city}}`;

      let cityDatafromAxios = await axios.get(url);

      console.log(cityDatafromAxios.data[0]);

      let weatherDatafromAxios = await axios.get(`http://localhost:3001/weather?lat=${cityDatafromAxios.data[0].lat}&lon=${cityDatafromAxios.data[0].lon}`);
      console.log('data from server', weatherDatafromAxios);

      let movieResultsfromAxios = await axios.get(`http://localhost:3001/movies?title=${this.state.city}`);

      // Todo: Set state with the data that comes back from axios
      this.setState({
        cityData: cityDatafromAxios.data[0],
        weatherData: weatherDatafromAxios.data,
        error: false,
        showMap: true,
        movieData: movieResultsfromAxios.data,
        
      });

    } catch (error) {

      //TODO: Set state with the error boolean and the error message
      this.setState({
        error: true,
        showMap: false,
        errorMessage: error.message
      })

    }
  }

  //**MAP PORTION FOR LAB IMG SRC POINTS TO THIS URL:
  // https://maps.locationiq.com/v3/staticmap?key=pk.83d28f2d25fd251ed72954451ef79273&center=<CITYS LAT>,<CITYS LON>&zoom=13 */

  render() {
    console.log(this.state);
    return (
      <Container>
        {/* <div style={{backgroundImage:`url(${image})`,backgroundRepeat: "no-repeat",  backgroundSize: "100%",
  backgroundPosition: "center"}}> */}
        {/* <div id="container-body"> */}
        <h1>City Explorer</h1>

        <form onSubmit={this.getCityData}>
          <label> Enter in a City:
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <Button type="submit" variant="outline-warning">Explore!</Button>{' '}
        </form>



        {/*TERNARY - WTF */}
        {this.state.error ? <p>{this.state.errorMessage}</p>
          : <p>{this.state.cityData.display_name}</p>}
        {this.state.showMap && <Image class="img-fluid" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`} alt='City map for location selected' />}
        <p>{this.state.cityData.lon}</p>
        <p>{this.state.cityData.lat}</p>



        {this.state.weatherData && (
          <Weather weatherData={this.state.weatherData} />
        )}

        {this.state.movieData && (
          <Movie movieData={this.state.movieData} />
        )}

        {/* </div> */}
      </Container>
    )
  }
}








export default App;
