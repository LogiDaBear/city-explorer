import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

    // TODO: USE AXIOS TO MAKE CALL OUT TO API
    let data = await axios.get('')

// TODO: SET THAT DATA INTO STATE
this.setState({
  city: ''
  cityData: {},
  error: false,
  errorMessage: '',


}

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value

    }

  //** async/await */
  getCityData = async (event) => {
        event.preventDefault();

        try {
          // TODO: Use axios to get the data from LocationIQ - using city in state
          let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

          let cityDatafromAxios = await axios.get(url);

          console.log(cityDatafromAxios.data[0]);

          // Todo: Set state with the data that comes back from axios
          this.setState({
            cityData: cityDatafromAxios.data[0]
            error: false
          });
        } catch (error) {

          //TODO: Set state with the error boolean and the error message
          this.setState({
            error: true,
            errorMessage: error.message
          })

        }

        //**MAP PORTION FOR LAB IMG SRC POINTS TO THIS URL:
        https://maps.locationiq.com/v3/staticmap?key=pk.83d28f2d25fd251ed72954451ef79273&center=<CITYS LAT>,<CITYS LON>&zoom=13 */

        render(){
          return (
            <>
              <h1>City Explorer</h1>

              <form onSubmit{this.getCityData}>
                <label> Enter in a City:
                  <input type="text" onChange={this.handleCityInput} />
                </label>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                    <Button type="submit" variant="outline-warning">Explore!</Button>{' '}

                  </Card.Body>
                </Card>

              </form>
              {/*TERNARY - WTF */}
              {this.state.error ? <p>{this.state.errorMessage}</p>
                : <p>{this.state.cityData.display_name}</p>}

              <p>{this.state.cityData.lon}</p>
              <p>{this.state.cityData.lat}</p>



            </>
          )
        }
      }








export default App;
