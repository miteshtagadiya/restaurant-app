import React, { Component } from "react";
import Title from "../../ui/Title/Title";
import CustomersCard from "../../ui/CustomersCard/CustomersCard";
import "./Customers.sass";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: null
    };
  }

  render() {
    return (
      <div className="customer">
        <Title>
          <div
            className="col-lg-3 col-md-12 col-sm-12"
            style={{ margin: "auto 0px" }}
          >
            <label className="title-label f-s-22">Customer List</label>
          </div>
        </Title>
        <div className="container">
          {/* <Table columns={columns} dataSource={data} /> */}
          <div className="row">
            <div className="col-12 col-lg-3 col-md-6 col-sm-12 col-xs-12 p-t-15 p-b-15">
              <CustomersCard />
            </div>
            <div className="col-12 col-lg-3 col-md-6 col-sm-12 col-xs-12 p-t-15 p-b-15">
              <CustomersCard />
            </div>
            <div className="col-12 col-lg-3 col-md-6 col-sm-12 col-xs-12 p-t-15 p-b-15">
              <CustomersCard />
            </div>
            <div className="col-12 col-lg-3 col-md-6 col-sm-12 col-xs-12 p-t-15 p-b-15">
              <CustomersCard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Customers;
