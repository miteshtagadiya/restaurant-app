import React, { Component } from "react";
import "./CustomerProfileCard.sass";

class CustomerProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="card customer-profile-card">
        <div className="row m-l-30 m-r-30" style={{ margin: "auto" }}>
          {this.props.img ? <div className="f-s-16 m-r-15">{this.props.img}</div> : null}
          <div>{this.props.label ? this.props.label : null}</div>
        </div>
      </div>
    );
  }
}

export default CustomerProfileCard;
