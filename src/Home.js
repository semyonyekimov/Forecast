import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      cities: [],
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

  handleSearch = event => {
    this.setState({
      searchValue: event.target.value
    });
  };

  addFavourites = id => {
    // this.state.favourites.push(
    //   this.state.cities[id].title,
    //   this.state.cities[id].woeid
    // );
    this.state.favourites.push({
      title: this.state.cities[id].title,
      woeid: this.state.cities[id].woeid
    });

    this.setState({
      favourites: this.state.favourites
    });
    console.log(this.state.favourites);
  };

  deleteFromFavourites = id => {
    for (let i = 0; i < this.state.favourites.length - 1; i++) {
      // тут хуйня
      if (this.state.favourites[i] === id) this.state.favourites.splice(id, 1);
      console.log(this.state.cities[id]);
    }
    this.setState({
      favourites: this.state.favourites
    });
    console.log(this.state.favourites);
    console.log(this.state.favourites[id]);
  };

  render() {
    return (
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
              <Link to={`/city/${city.woeid}`}>{city.title}</Link>
              <button onClick={() => this.addFavourites(i)}>Add</button>
              <button onClick={() => this.deleteFromFavourites(i)}>
                Delete
              </button>
              <br></br>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Home;

{
  /* <Link to={`/city/${city.woeid}`} key={i}>
{city.title}
<button onClick={() => this.addFavourites(i)}>Add</button>
<br></br>
</Link> */
}

// this.state.favourites.splice(id, 1);
// this.setState({
//   favourites: this.state.favourites
// });
// console.log(this.state.favourites);
// };

// this.state.favourites.filter(el => {
//   return el !== el[id];
// });
