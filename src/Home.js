import React from "react";
import Forecast from "./Forecast";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      cities: [],
      weather: [],
      favourites: []
    };
  }

  dynamicFetchCity = () =>
    fetch(`http://localhost:8089/cities/weather/${this.state.searchValue}`)
      .then(response => response.json())
      .then(response => {
        return this.setState({
          cities: response.data
        });
      });

  getWeather = woeid => {
    fetch(`http://localhost:8089/city/${woeid}/`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          weather: response.data.consolidated_weather
        });
      });
  };

  handleSearch = event => {
    this.setState({
      searchValue: event.target.value
    });
  };

  addFavourites = id => {
    this.setState({
      favourites: this.state.favourites.push(
        this.state.cities[id].title,
        this.state.cities[id].woeid
      )
    });
  };

  render() {
    return (
      <Router>
        <div className="main">
          <div className="input">
            <input
              type="text"
              placeholder="search"
              onChange={event => this.handleSearch(event)}
              value={this.state.searchValue}
            />
            <button onClick={() => this.dynamicFetchCity()}>Submit</button>
          </div>
          <div className="list">
            {this.state.cities.map((city, i) => (
              <div key={i}>
                <span
                  onClick={() => this.getWeather(this.state.cities[i].woeid)}
                >
                  <Link to={`/city/${i}`}>{this.state.cities[i].title}</Link>
                </span>
                <button onClick={() => this.addFavourites(i)}>Add</button>
              </div>
            ))}
          </div>
          <Switch>
            <Route
              exact
              path={"/city/:id"}
              render={() => <Forecast weather={this.state.weather} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default Home;
