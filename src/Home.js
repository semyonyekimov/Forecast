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

  addFavourites = city => {
    // this.state.favourites.push(
    //   this.state.cities[id].title,
    //   this.state.cities[id].woeid
    // );
    this.state.favourites.push({
      title: city.title,
      woeid: city.woeid
    });

    this.setState({
      favourites: this.state.favourites
    });
    console.log(this.state.favourites);
  };

  deleteFromFavourites = city => {
    this.state.favourites.filter(city => city !== city.woeid);
    this.setState({
      favourites: this.state.favourites
    });
    console.log(city);
    console.log(this.state.favourites);
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
            <div key={city.title}>
              <Link to={`/city/${city.woeid}`}>{city.title}</Link>

              <button onClick={() => this.addFavourites(city)}>Add</button>
              <button onClick={() => this.deleteFromFavourites(city)}>
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

// this.state.favourites.filter(el => el.i != i);

// this.setState(({ favourites }) => {
//   const idx = favourites.findIndex(el => el.id === id);
//   const newFavoutires = [
//     ...favourites.slice(0, idx),
//     favourites.slice(idx + 1)
//   ];
//   return {
//     favourites: newFavoutires
//   };
// });

// this.setState(favourites => ({
//   favourites: [favourites.slice(0, id), favourites.slice(id + 1)]
// }));
