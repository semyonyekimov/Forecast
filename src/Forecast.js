import React from "react";

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(this.props);
    fetch(`http://localhost:8089/city/${id}/`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          weather: response.data.consolidated_weather
        });
      });
  }

  render() {
    return (
      <div className="forecast">
        {this.state.weather.map((_, i) => (
          <div key={i}>
            <div className="Forecast-date">
              Date: {this.state.weather[i].applicable_date}
            </div>
            <div className="Forecast-weather">
              The weather is: {this.state.weather[i].weather_state_name}
            </div>
            <div className="Forecast-max">
              Max temperature: {Math.round(this.state.weather[i].max_temp)} C
            </div>
            <div className="Forecast-min">
              Min temperature: {Math.round(this.state.weather[i].min_temp)} C
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Forecast;
