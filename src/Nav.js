import React from "react";
import Favourite from "./Favourite";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Forecast from "./Forecast";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <div className="nav">
          <ul>
            <li>
              <Link to="/favourite">Favourite</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/favourite" component={Favourite} />
            <Route exact path="/home" component={Home} />
            <Route path="/city/:id" component={Forecast} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default Nav;
