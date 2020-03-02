import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Switch } from "antd";
import "./CustomersCard.sass";

class CustomersCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = checked => {
    console.log(`switch to ${checked}`);
  };

  render() {
    return (
      <div className="card customers-card">
        <div className="card-header">
          <div className="d-flex">
            <label style={{ color: "white" }}>Name</label>
            <div style={{ width: "100%", textAlign: "end" }}>
              <Switch defaultChecked onChange={this.onChange} />
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row m-l-0 m-r-0 m-b-15">
            <div className="p-l-0 p-r-0 col-2">
              <FontAwesomeIcon icon={["fas", "envelope"]} />
            </div>
            <div className="p-l-0 p-r-0 col-10">
              <label>miteshtagadiya@gmail.com</label>
            </div>
          </div>
          <div className="row m-l-0 m-r-0 m-b-15">
            <div className="p-l-0 p-r-0 col-2">
              <FontAwesomeIcon icon={["fas", "phone-square-alt"]} />
            </div>
            <div className="p-l-0 p-r-0 col-10">
              <label>86349283394</label>
            </div>
          </div>
          <div className="row m-l-0 m-r-0" style={{ height: 50 }}>
            <div className="p-l-0 p-r-0 col-2">
              <FontAwesomeIcon icon={["fas", "map-marker-alt"]} />
            </div>
            <div className="p-l-0 p-r-0 col-10">
              <label>
                dskjhdsakhdkhasdkjsdhfkjsadhsdeerwerwerwerewreewrsdf
              </label>
            </div>
          </div>
        </div>
        <div
          className="card-footer m-t-10"
          onClick={() => this.props.history.push("/customers/profile")}
        >
          View Profile
        </div>
      </div>
    );
  }
}

export default withRouter(CustomersCard);
