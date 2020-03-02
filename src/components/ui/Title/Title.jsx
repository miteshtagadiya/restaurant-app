import React, { Component } from "react";
import "./Title.sass";

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
    };
  }

  handleDrawerButtonClick = () => {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  };
  render() {
    return (
      <div
        className="container-fluid title"
        style={{
          background: "white",
          boxShadow: "0px 5px 20px -13px rgba(1,78,255,1)",
        }}
      >
        <div className="row h-100 m-r-15 m-l-15">{this.props.children}</div>
      </div>
    );
  }
}

export default Title;
