import React, { Component } from "react";
import Button from "../../ui/Button/Button";
import { Table } from "antd";
import Title from "../../ui/Title/Title";
import Cash from "../../../assets/cash.png";
import Paytm from "../../../assets/paytm.png";
import Instamojo from "../../../assets/instamojo.png";
import { Badge } from "antd";
import { Menu, Dropdown } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomerProfileCard from "../../ui/CustomerProfileCard/CustomerProfileCard";
import "./CustomerProfile.sass";

class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: null
    };
  }

  selectBadge(type) {
    switch (type) {
      case "Delivered":
        return (
          <span>
            <Badge status="success" /> <label>{type}</label>
          </span>
        );
      case "Cancelled":
        return (
          <span>
            <Badge status="error" /> <label>{type}</label>
          </span>
        );
      case "Rejected":
        return (
          <span>
            <Badge status="warning" /> <label>{type}</label>
          </span>
        );
      default:
    }
  }

  selectPayment(type) {
    switch (type) {
      case "Cash":
        return (
          <span>
            <img src={Cash} alt="Cash" />
            <label className="m-l-10">{type}</label>
          </span>
        );
      case "Paytm":
        return (
          <span>
            <img src={Paytm} alt="Paytm" />
            <label className="m-l-10">{type}</label>
          </span>
        );
      case "Instamojo":
        return (
          <span>
            <img src={Instamojo} alt="Instamojo" />
            <label className="m-l-10">{type}</label>
          </span>
        );
      default:
    }
  }

  selectOrderType(type) {
    switch (type) {
      case "Pick Up":
        return (
          <span>
            <FontAwesomeIcon icon={["fas", "truck-pickup"]} />{" "}
            <label className="m-l-10">{type}</label>
          </span>
        );
      case "Delivery":
        return (
          <span>
            <FontAwesomeIcon icon={["fas", "truck-loading"]} />{" "}
            <label className="m-l-10">{type}</label>
          </span>
        );

      default:
    }
  }

  render() {
    const columns = [
      {
        title: "Order ID",
        dataIndex: "orderid",
        key: "orderid",
        render: text => <label>{text}</label>
      },
      {
        title: "Order Type",
        dataIndex: "ordertype",
        key: "ordertype",
        render: type => this.selectOrderType(type)
      },
      {
        title: "Branch Name",
        dataIndex: "branchname",
        key: "branchname"
      },
      {
        title: "Order Status",
        key: "orderstatus",
        dataIndex: "orderstatus",
        render: status => this.selectBadge(status)
      },
      {
        title: "Payment Type",
        key: "paymenttype",
        dataIndex: "paymenttype",
        render: type => this.selectPayment(type)
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <label>Delete</label>
          </span>
        )
      }
    ];

    const data = [
      {
        key: "1",
        orderid: "12345665",
        ordertype: "Pick Up",
        branchname: "New York No. 1 Lake Park",
        orderstatus: "Delivered",
        paymenttype: "Cash"
      },
      {
        key: "2",
        orderid: "34524675",
        ordertype: "Delivery",
        branchname: "New York No. 1 Lake Park",
        orderstatus: "Cancelled",
        paymenttype: "Paytm"
      },
      {
        key: "3",
        orderid: "64342431",
        ordertype: "Pick Up",
        branchname: "New York No. 1 Lake Park",
        orderstatus: "Rejected",
        paymenttype: "Instamojo"
      }
    ];

    const menu = (
      <Menu>
        <Menu.Item key="0">1st menu item</Menu.Item>
        <Menu.Item key="1">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    );
    return (
      <div className="customer-profile">
        <Title>
          <div
            className="col-lg-9 col-md-12 col-sm-12"
            style={{ margin: "auto 0px" }}
          >
            <label className="title-label f-s-22">Customer Profile</label>
          </div>
          {/* {props.children} */}

          <div
            className="col-lg-3 col-md-6 col-sm-12"
            style={{ margin: "auto 0px", textAlign: "right" }}
            onClick={() => this.props.history.push("/customers")}
          >
            <Button className="f-s-20 secondary" type="back">
              Back
            </Button>
          </div>
        </Title>
        <div className="container p-t-15">
          <div className="row">
            <div className="col-12 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-t-15 p-b-15">
              <CustomerProfileCard
                label={<label> Jesse L. Riedle </label>}
                img={<FontAwesomeIcon icon={["fas", "user"]} />}
              />
            </div>

            <div className="col-12 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-t-15 p-b-15">
              <CustomerProfileCard
                label={<label> miteshtagadiya@gmail.com </label>}
                img={<FontAwesomeIcon icon={["fas", "envelope"]} />}
              />
            </div>

            <div className="col-12 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-t-15 p-b-15">
              <CustomerProfileCard
                label={<label> 631-432-2345 </label>}
                img={<FontAwesomeIcon icon={["fas", "phone-alt"]} />}
              />
            </div>

            <div className="col-12 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-t-15 p-b-15">
              <CustomerProfileCard
                label={
                  <label> 206 grove street fishers island, ny 11234 </label>
                }
                img={<FontAwesomeIcon icon={["fas", "map-marker-alt"]} />}
              />
            </div>

            <div className="col-12 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-t-15 p-b-15">
              <CustomerProfileCard
                label={
                  <div>
                    <label className="m-l-10">
                      Status :{" "}
                      <span style={{ color: "#5ABA55", marginLeft: 10 }}>
                        Active
                      </span>
                    </label>
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <span
                        className="ant-dropdown-link"
                        style={{ position: "absolute", right: 25 }}
                      >
                        <span
                          className="m-t-7"
                          style={{
                            fontSize: 18,
                            marginRight: 10
                          }}
                        >
                          <FontAwesomeIcon icon={["fas", "sort-down"]} />
                        </span>
                      </span>
                    </Dropdown>
                  </div>
                }
              />
            </div>
          </div>
          <label className="f-s-25 m-t-25 m-b-10">Order History</label>
          <Table columns={columns} dataSource={data} bordered />
        </div>
      </div>
    );
  }
}

export default CustomerProfile;
