import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Weather from './Weather'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      city: '',
      cityData: {},
      error: false,
      errorMessage: '',
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

      let cityDatafromAxios = await axios.get(url);


      console.log(cityDatafromAxios.data[0]);

      let weatherDatafromAxios = await axios.get(`http://localhost:3001/weather?lat=48.86&lon=2.35`);
      console.log('data from server',weatherDatafromAxios);

      // Todo: Set state with the data that comes back from axios
      this.setState({
        cityData: cityDatafromAxios.data[0],
        weatherData: weatherDatafromAxios.data,
        error: false
      });

    } catch (error) {

      //TODO: Set state with the error boolean and the error message
      this.setState({
        error: true,
        errorMessage: error.message
      })

    }
  }

  //**MAP PORTION FOR LAB IMG SRC POINTS TO THIS URL:
  // https://maps.locationiq.com/v3/staticmap?key=pk.83d28f2d25fd251ed72954451ef79273&center=<CITYS LAT>,<CITYS LON>&zoom=13 */

  render() {
    console.log(this.state);
    return (
      <div id='body'>
        <h1>City Explorer</h1>

        <form onSubmit={this.getCityData}>
          <label> Enter in a City:
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <Button type="submit" variant="outline-warning">Explore!</Button>{' '}
        </form>

    {this.state.weatherData && (
      <Weather weatherData={this.state.weatherData}/>
    )}



        {/*TERNARY - WTF */}
        {this.state.error ? <p>{this.state.errorMessage}</p>
          : <p>{this.state.cityData.display_name}</p>}
        <Image class="img-fluid" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`} alt='City map for location selected' />
        <p>{this.state.cityData.lon}</p>
        <p>{this.state.cityData.lat}</p>



      </div>
    )
  }
}








export default App;
