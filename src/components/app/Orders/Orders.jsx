/* eslint-disable */
import React, { Component } from "react";
import { Table, Divider } from "antd";
import Title from "../../ui/Title/Title";
import Button from "../../ui/Button/Button";
import Cash from "../../../assets/cash.png";
import Paytm from "../../../assets/paytm.png";
import Instamojo from "../../../assets/instamojo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import ReactToPrint from "react-to-print";
import { Badge } from "antd";
import { Modal } from "antd";
import OrdersData from "./OrdersData.json";
import "./Orders.sass";
var moment = require("moment");

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
      subtotal: 0,
      grandtotal: 0,
      ordersDetails: null,
      orderCounts: null,
      labelPicker: "Custom Range",
      startDate: moment()
        .startOf("day")
        .format("YYYY-MM-DD HH:mm"),
      endDate: moment()
        .endOf("day")
        .format("YYYY-MM-DD HH:mm"),
      dateLabel: "Today",
      gst: 0,
      ordersPrintDetails: null,
      modelViewVisible: false,
      modelPrintVisible: false,
      orderType: null,
      filter: "",
      selectedOrderType: "",
      orderStatusId: "",
      statusChanged: false,
      orderStatus: null,
      taxSlab: 0
    };
  }

  setModalViewVisible(modalViewVisible) {
    this.setState({ modalViewVisible });
  }

  setModalPrintVisible(modalPrintVisible) {
    this.setState({ modalPrintVisible });
  }

  selectBadge(type, record) {
    switch (type) {
      case "Delivered":
        return (
          <span>
            <Badge status="success" /> <label>{type}</label>
          </span>
        );
      case "Accepted":
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
      case "Pending":
        return (
          <span>
            <Badge status="warning" /> <label>{type}</label>
          </span>
        );
      default:
    }
  }

  selectPaymentBadge(type) {
    switch (type) {
      case "cashondelivery":
        return (
          <span>
            <Badge status="warning" />{" "}
            <label style={{ marginBottom: 0 }}>{"-"}</label>
          </span>
        );
      case "paid":
        return (
          <span>
            <Badge status="success" />{" "}
            <label style={{ marginBottom: 0 }}>{type}</label>
          </span>
        );
      case "unpaid":
        return (
          <span>
            <Badge status="error" />{" "}
            <label style={{ marginBottom: 0 }}>{type}</label>
          </span>
        );
      default:
        return (
          <span>
            <Badge status="warning" />{" "}
            <label style={{ marginBottom: 0 }}>{type}</label>
          </span>
        );
    }
  }

  selectPayment(type, record) {
    switch (type) {
      case "cash":
        return (
          <span>
            {this.selectPaymentBadge(record.paymentstatus)}
            <Tooltip title={type}>
              <img
                style={{ marginLeft: 15, marginBottom: 5 }}
                src={Cash}
                alt="Cash"
              />
            </Tooltip>
          </span>
        );
      case "paytm":
        return (
          <span>
            {this.selectPaymentBadge(record.paymentstatus)}
            <Tooltip title={"Paytm"}>
              <img
                style={{ marginLeft: 15, marginBottom: 5 }}
                src={Paytm}
                alt="Paytm"
              />
            </Tooltip>
          </span>
        );
      case "instamojo":
        return (
          <span>
            {this.selectPaymentBadge(record.paymentstatus)}
            <Tooltip title={"Instamojo"}>
              <img
                style={{ marginLeft: 15, marginBottom: 5 }}
                src={Instamojo}
                alt="Instamojo"
              />
            </Tooltip>
          </span>
        );
      default:
        return <span>{this.selectPaymentBadge(record.paymentstatus)}</span>;
    }
  }

  showOrderDetails(record) {
    this.setState({
      ordersDetails: record.items
    });
  }

  showOrderPrintDetails(record) {
    this.setState({
      printorderId: record.orderid,
      printorderDate: record.created
    });

    let data;

    let array = [];
    array.push(record.items);

    let total = 0;
    let gst = 0;
    record.items.map(
      (result, index) => (total += result.quantity * result.price)
    );

    this.setState({
      ordersPrintDetails: record.items,
      selectedOrdersDetails: record,
      subtotal: total.toFixed(2),
      taxSlab: record.tax_slab,
      gst: (total * record.tax_slab) / 100,
      grandtotal: (total + (total * record.tax_slab) / 100).toFixed(2)
    });
  }

  totalsum = 0;

  findTotalPrice = record => {
    let total = (record.price * record.quantity).toFixed(2);
    return <label>{total}</label>;
  };

  onOk = value => {
    this.setState({
      startDate: value[0].format("YYYY-MM-DD HH:mm"),
      endDate: value[1].format("YYYY-MM-DD HH:mm")
    });
  };

  handleEvent = (event, picker) => {
    let sDate = moment(picker.startDate);
    let eDate = moment(picker.endDate);
    this.setState({
      startDate: picker.startDate.format("YYYY-MM-DD HH:mm"),
      endDate: picker.endDate.format("YYYY-MM-DD HH:mm"),
      dateLabel: eDate.from(sDate),
      labelPicker: picker.chosenLabel
    });
  };

  render() {
    const columns = [
      {
        title: "Order ID",
        dataIndex: "orderid",
        key: "orderid",
        render: (text, record) => (
          <span>
            <label className="m-l-10">{record.orderid}</label>
          </span>
        )
      },
      {
        title: "Created Date",
        dataIndex: "created",
        key: "created",
        render: (text, record) => {
          let current_datetime = new Date(text);
          let formatted_date =
            current_datetime.getFullYear() +
            "-" +
            (current_datetime.getMonth() + 1) +
            "-" +
            current_datetime.getDate() +
            " " +
            current_datetime.getHours() +
            ":" +
            current_datetime.getMinutes();
          return moment(text).format("MMM D YYYY HH : mm");
        }
      },
      // {
      //   title: "Customer Name",
      //   dataIndex: "customername",
      //   key: "customername",
      // },
      {
        title: "Branch Name",
        dataIndex: "branchname",
        key: "branchname"
      },
      {
        title: "Item Details",
        dataIndex: "itemdetails",
        key: "itemdetails",
        width: 200,
        render: (item, record) => (
          <span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.setModalViewVisible(true);
                this.showOrderDetails(record);
              }}
            >
              <FontAwesomeIcon icon={["fas", "info"]} />
            </span>
            <label className="m-l-10">
              {item > 1 ? item + " items" : item + " item"}
            </label>
          </span>
        )
      },
      // {
      //   title: "Coupon ID",
      //   dataIndex: "couponid",
      //   key: "couponid",
      // },
      {
        title: "Order Status",
        key: "orderstatus",
        dataIndex: "orderstatus",
        width: 180,
        render: (status, record) => this.selectBadge(status, record)
      },
      {
        title: "Payment Type",
        key: "paymenttype",
        dataIndex: "paymenttype",
        width: 180,
        render: (type, record) => this.selectPayment(type, record)
      },
      {
        title: "Action",
        key: "action",
        width: 100,
        render: (text, record) => (
          <span>
            <span
              style={{ cursor: "pointer", color: "#03002e", fontSize: 20 }}
              onClick={() => {
                this.setModalViewVisible(true), this.showOrderDetails(record);
              }}
            >
              <FontAwesomeIcon icon={["fas", "eye"]} />
            </span>

            <Divider type="vertical" />
            <span
              style={{ cursor: "pointer", color: "#03002e", fontSize: 20 }}
              onClick={() => {
                this.setModalPrintVisible(true),
                  this.showOrderPrintDetails(record);
              }}
            >
              {" "}
              <FontAwesomeIcon icon={["fas", "print"]} />
            </span>
          </span>
        )
      }
    ];

    if (this.state.orders !== null) {
      data = this.state.orders[0].map((result, index) => ({
        key: index,
        created: result.CreatedAt,
        orderid: result.Order_Id,
        ordertype: result.TypeName,
        customername: "",
        branchname: result.Branch_Name,
        itemdetails: result.TotalItem,
        couponid: result.Coupon_Id,
        orderstatus: result.Status_Name,
        paymenttype: result.Order_PaymentType,
        paymentstatus: result.PaymentStatus
      }));
    }

    let tbData = [];
    {
      this.state.filter !== ""
        ? (tbData = this.state.orders[0].filter(item => {
            let d = Object.values(item);
            return d
              .toString()
              .toLowerCase()
              .includes(this.state.filter.toLowerCase());
          }))
        : null;
    }

    if (tbData.length > 0) {
      tbData = tbData.map((result, index) => ({
        key: index,
        orderid: result.Order_Id,
        ordertype: result.TypeName,
        customername: "",
        branchname: result.Branch_Name,
        itemdetails: result.TotalItem,
        couponid: result.Coupon_Id,
        orderstatus: result.Status_Name,
        paymenttype: result.Order_PaymentType
      }));
    }

    const columnsView = [
      {
        title: "Item Name",
        dataIndex: "itemname",
        key: "itemname"
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity"
      },
      {
        title: "Stuffing",
        dataIndex: "stuffing",
        key: "stuffing"
      },
      {
        title: "Comments",
        dataIndex: "comments",
        key: "comments"
      }
    ];

    let dataView = [];

    if (this.state.ordersDetails !== null) {
      dataView = this.state.ordersDetails.map((result, index) => ({
        key: index,
        itemname: result.itemname,
        quantity: result.quantity,
        stuffing: result.stuffing,
        comments: result.comments
      }));
    }

    const columnsPrint = [
      {
        title: "Item Name",
        dataIndex: "itemname",
        key: "itemname"
      },
      {
        title: "Stuffing",
        dataIndex: "stuffing",
        key: "stuffing"
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity"
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        width: 150
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        width: 150,
        render: (text, record) => {
          this.totalsum += record.price * record.quantity;
          return this.findTotalPrice(record);
        }
      }
    ];

    const columnsPrintPayment = [
      {
        title: "Order Status",
        dataIndex: "orderstatus",
        key: "orderstatus"
      },
      {
        title: "Payment",
        dataIndex: "payment",
        key: "payment"
      },
      {
        title: "Order Status",
        dataIndex: "ordertype",
        key: "ordertype"
      },
      {
        title: "Payment Status",
        dataIndex: "paymentstatus",
        key: "paymentstatus"
      },
      {
        title: "TransactionId",
        dataIndex: "transactionid",
        key: "transactionid"
      }
    ];

    let dataPrint = [];

    let dataPrintPayment = [];

    let array = [];
    if (this.state.ordersPrintDetails !== null) {
      array.push(this.state.selectedOrdersDetails.items);
      if (this.state.ordersPrintDetails !== null) {
        dataPrint = this.state.selectedOrdersDetails.items.map(
          (result, index) => ({
            key: index,
            itemname: result.itemname,
            stuffing: result.stuffing,
            quantity: result.quantity,
            comments: result.comments,
            price: result.price,
            total: result.price
          })
        );
      }

      if (this.state.ordersPrintDetails !== null) {
        dataPrintPayment.push({
          key: 0,
          orderstatus: this.state.selectedOrdersDetails.orderstatus,
          payment: this.state.selectedOrdersDetails.paymenttype,
          ordertype: this.state.selectedOrdersDetails.orderstatus,
          paymentstatus: this.state.selectedOrdersDetails.paymentstatus,
          transactionid: this.state.selectedOrdersDetails.transactionid
        });
      }
    }
    return (
      <div className="orders">
        <Title>
          <div
            className="col-xl-3 col-lg-4 col-md-12 col-sm-12"
            style={{ margin: "auto 0px" }}
          >
            <label className="title-label f-s-22">Order List</label>
          </div>
        </Title>
        <div className="container p-t-15">
          <Table
            loading={this.state.ordersLoading ? true : false}
            columns={columns}
            dataSource={OrdersData}
            bordered
          />
          <Modal
            className="modelView"
            title="Item Information"
            centered
            visible={this.state.modalViewVisible}
            onCancel={() => this.setModalViewVisible(false)}
            footer={null}
          >
            <Table
              pagination={
                this.state.ordersDetails !== null
                  ? this.state.ordersDetails.length > 10
                    ? true
                    : false
                  : false
              }
              columns={columnsView}
              loading={this.state.ordersDetailsLoading ? true : false}
              dataSource={dataView.reverse()}
              bordered
            />
            <div className="p-r-15 p-b-15 p-t-0 text-right">
              <Button
                onClick={() => this.setModalViewVisible(false)}
                className="p-l-50 p-r-50 f-s-20 primary"
              >
                Done
              </Button>
            </div>
          </Modal>

          <Modal
            className="modelPrint"
            title={
              <div>
                <span style={{ color: "white" }}>
                  <FontAwesomeIcon icon={["fas", "file-invoice"]} />
                </span>
                <label className="f-s-25 m-l-15">Order</label>
                <label className="f-s-16 m-l-15">
                  {"/#"}
                  {this.state.ordersPrintDetails !== null
                    ? this.state.selectedOrdersDetails.orderid
                    : null}
                </label>
              </div>
            }
            centered
            visible={this.state.modalPrintVisible}
            onCancel={() => this.setModalPrintVisible(false)}
            footer={null}
          >
            <React.Fragment>
              <div ref={el => (this.componentRef = el)}>
                <div>
                  <div className="d-flex justify-content-between">
                    <label className="f-s-25 p-l-15 p-r-15 p-t-15">
                      {this.state.ordersPrintDetails !== null
                        ? this.state.selectedOrdersDetails.restaurantname
                        : null}{" "}
                    </label>
                    {/* <label className="f-s-25 p-l-15 p-r-15 p-t-15">
                      {this.state.ordersPrintDetails !== null
                        ? this.state.ordersPrintDetails.body[0].Restaurant_Name
                        : null}
                    </label> */}
                  </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{ borderBottom: "1px solid #92B9FF" }}
                  >
                    <div className="p-l-15 p-r-15 p-b-15">
                      <label className="f-s-16 m-b-0">
                        Branch:{" "}
                        {this.state.ordersPrintDetails !== null
                          ? this.state.selectedOrdersDetails.branchname
                          : null}
                      </label>
                      <br />
                      <label className="f-s-16 m-b-0" style={{ width: 325 }}>
                        Address:{" "}
                        {this.state.ordersPrintDetails !== null
                          ? this.state.selectedOrdersDetails.address
                          : null}
                      </label>

                      <br />
                    </div>
                    <div className="f-s-16 p-l-15 p-r-15 p-b-15">
                      <label className="f-s-16">
                        Order Date:{" "}
                        {moment(this.state.printorderDate).format(
                          "MMM D YYYY HH:mm"
                        )}
                      </label>
                      <br />
                      <label className="f-s-16">
                        Invoice Date: {moment().format("MMM D YYYY HH:mm")}
                      </label>
                      <br />

                      <div
                        style={{
                          padding: "10px 30px",
                          border: "1px solid #92B9FF",
                          borderRadius: 5,
                          textAlign: "center"
                        }}
                      >
                        <label className="f-s-16 m-b-0"> Amount: </label>
                        <br />
                        <label className="f-s-20">
                          {this.state.grandtotal}
                        </label>
                      </div>
                    </div>
                  </div>
                  <Table
                    loading={this.state.ordersPrintDetailsLoading}
                    pagination={false}
                    columns={columnsPrint}
                    dataSource={dataPrint.reverse()}
                    bordered
                  />
                  {this.state.ordersPrintDetailsLoading === false ? (
                    <div>
                      <div className="d-flex justify-content-end">
                        <div
                          style={{
                            width: 302,
                            textAlign: "center",
                            padding: 10,
                            marginTop: -7,
                            borderLeft: "1px solid #92B9FF",
                            borderBottom: "1px solid #92B9FF"
                          }}
                        >
                          <label
                            className="f-s-18"
                            style={{ padding: "0px 20px" }}
                          >
                            Sub Total
                          </label>
                          :
                          <label
                            className="f-s-18"
                            style={{ padding: "0px 20px" }}
                          >
                            {this.state.subtotal}
                          </label>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <div
                          style={{
                            width: 302,
                            textAlign: "center",
                            padding: 10,
                            marginTop: -7,
                            borderLeft: "1px solid #92B9FF",
                            borderBottom: "1px solid #92B9FF"
                          }}
                        >
                          <label
                            className="f-s-18"
                            style={{ padding: "0px 20px" }}
                          >
                            CGST {this.state.taxSlab}%
                          </label>
                          :
                          <label
                            className="f-s-18"
                            style={{ padding: "0px 20px" }}
                          >
                            {(this.state.gst / 2).toFixed(2)}
                          </label>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <div
                          style={{
                            width: 302,
                            textAlign: "center",
                            padding: 10,
                            marginTop: -7,
                            borderLeft: "1px solid #92B9FF",
                            borderBottom: "1px solid #92B9FF"
                          }}
                        >
                          <label
                            className="f-s-18"
                            style={{ padding: "0px 20px" }}
                          >
                            SGST {this.state.taxSlab}%
                          </label>
                          :
                          <label
                            className="f-s-18"
                            style={{ padding: "0px 20px" }}
                          >
                            {(this.state.gst / 2).toFixed(2)}
                          </label>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <div
                          style={{
                            width: 302,
                            textAlign: "center",
                            padding: 10,
                            marginTop: -7,
                            borderLeft: "1px solid #92B9FF",
                            borderBottom: "1px solid #92B9FF"
                          }}
                        >
                          <label
                            className="f-s-18"
                            style={{ padding: "0px 20px" }}
                          >
                            Grand Total
                          </label>{" "}
                          <label
                            className="f-s-18"
                            style={{ padding: "0px 20px" }}
                          >
                            {this.state.grandtotal}
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div
                  style={{
                    borderTop: "1px solid #92B9FF",
                    marginBottom: 50,
                    marginTop: 50
                  }}
                >
                  <Table
                    loading={this.state.ordersPrintDetailsLoading}
                    pagination={false}
                    columns={columnsPrintPayment}
                    dataSource={dataPrintPayment}
                    bordered
                  />
                </div>
              </div>
              <div className="p-t-0 d-flex justify-content-between">
                <ReactToPrint
                  trigger={() => (
                    <Button
                      onClick={() => this.setModalViewVisible(false)}
                      className="button-radius-left f-s-20 primary"
                    >
                      Print Invoice
                    </Button>
                  )}
                  content={() => this.componentRef}
                />

                <Button
                  onClick={() => this.setModalViewVisible(false)}
                  className="button-radius f-s-20 primary"
                >
                  <label className="f-s-18" style={{ padding: "0px 10px" }}>
                    Grand Total
                  </label>

                  <label className="f-s-18" style={{ padding: "0px 20px" }}>
                    {this.state.grandtotal}
                  </label>
                </Button>
              </div>
            </React.Fragment>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Orders;
