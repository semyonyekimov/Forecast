import React from "react";

class Favourite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="favourite">{this.props.favourites}</div>;
  }
}

export default Favourite;
