import React from "react";

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="forecast">
        {this.props.weather.map((_, i) => (
          <div key={i}>
            <div className="Forecast-date">
              Date: {this.props.weather[i].applicable_date}
            </div>
            <div className="Forecast-weather">
              The weather is: {this.props.weather[i].weather_state_name}
            </div>
            <div className="Forecast-max">
              Max temperature: {Math.round(this.props.weather[i].max_temp)} C
            </div>
            <div className="Forecast-min">
              Min temperature: {Math.round(this.props.weather[i].min_temp)} C
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Forecast;
