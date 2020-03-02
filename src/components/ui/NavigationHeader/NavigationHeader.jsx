import React, { Component } from "react";
import "./NavigationHeader.sass";

class NavigationHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header className="app-header no-margin no-padding">
        {this.props.children}
      </header>
    );
  }
}

export default NavigationHeader;
