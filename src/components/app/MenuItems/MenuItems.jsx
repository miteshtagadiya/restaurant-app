/* eslint-disable */
import React, { Component } from "react";
import { Table, Radio, Popconfirm, Spin } from "antd";
import Title from "../../ui/Title/Title";
import Button from "../../ui/Button/Button";
import { Modal } from "antd";
import { Input, Select } from "antd";
import { Switch } from "antd";
import { Form, Icon, Row, Col, Checkbox } from "antd";
import "./MenuItems.sass";
import Menu from "./Menu.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Category from "./Category.json";
import Stuffing from "./Stuffing.json";
const { Option } = Select;
const InputGroup = Input.Group;

let id = 0; // id = 0

class MenuItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: Menu,
      type: "Default",
      modelCategoryVisible: false,
      modalSubCategoryVisible: false,
      modelStuffingVisible: false,
      stuffing: Stuffing,
      category: Category,
      filter: "",
      viewBy: "",
      categoryBy: "",
      itemStuffing: 0,
      itemStuffingCost: 0,
      categoryAddName: "",
      stuffingAddName: "",
      addItems: [],
      MenuSpecial_Status: 0,
      editableItem: null,
      itemDesc: null,
      stuffingUpdate: false,
      categoryUpdate: false,
      defaultStuffing: true,
      stuffingCostSelected: false
    };
  }

  ajax$ = [];

  setmodalCategoryVisible(modalCategoryVisible) {
    this.setState({ modalCategoryVisible });
  }

  setmodalSubCategoryVisible(modalSubCategoryVisible) {
    this.setState({ modalSubCategoryVisible });
  }

  setmodalStuffingVisible(modalStuffingVisible) {
    this.setState({ modalStuffingVisible });
  }

  selectType(type) {
    switch (type) {
      case "Veg":
        return (
          <span>
            <span style={{ fontSize: 18, color: "green", marginRight: 10 }}>
              <FontAwesomeIcon icon={["fas", "leaf"]} />
            </span>
            <label className="m-l-10">{type}</label>
          </span>
        );
      case "Nonveg":
        return (
          <span>
            <span style={{ fontSize: 18, color: "red", marginRight: 10 }}>
              <FontAwesomeIcon icon={["fas", "circle"]} />
            </span>
            <label className="m-l-10">{type}</label>
          </span>
        );

      case "Drink":
        return (
          <span>
            <span style={{ fontSize: 18, marginRight: 10 }}>
              <FontAwesomeIcon icon={["fas", "wine-glass-alt"]} />
            </span>
            <label className="m-l-10">{type}</label>
          </span>
        );

      default:
        return (
          <span>
            <label className="m-l-10">{type}</label>
          </span>
        );
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {});
  };

  setValue(value) {
    this.setState({
      viewBy: value
    });
  }

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 0) {
      this.setState({
        stuffingCostSelected: false
      });
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  renderDashboard() {
    let columns = [
      {
        title: "",
        dataIndex: "itemstatus",
        key: "itemstatus",
        render: (type, record) =>
          type === 1 ? (
            <Popconfirm
              title="Are you sure？"
              onConfirm={() => this.itemStatusChange(type, record)}
              okText="Yes"
              cancelText="No"
            >
              <Switch checked={true} onChange={this.onChange} />
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Are you sure？"
              onConfirm={() => this.itemStatusChange(type, record)}
              okText="Yes"
              cancelText="No"
            >
              <Switch checked={false} onChange={this.onChange} />
            </Popconfirm>
          )
      },
      {
        title: "Item Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Stuffing",
        key: "stuffing",
        dataIndex: "stuffing"
      },
      {
        title: "Type",
        key: "type",
        dataIndex: "type",
        render: type => this.selectType(type)
      },

      {
        title: "Cost",
        key: "cost",
        dataIndex: "cost"
      },
      {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <span
            style={
              record.itemstatus === 0 ? { opacity: 0.5 } : { cursor: "pointer" }
            }
            onClick={() => {
              record.itemstatus === 0
                ? null
                : this.setState({ type: "Edit Item", editRecord: record }),
                this.setState({
                  editableItem: record,
                  typeId: record.typeid,
                  MenuSpecial_Status: record.MenuSpecial_Status
                });
              // record.stuffing !== null
              //   ? this.props.form.setFieldsValue({
              //       keys: record.stuffing !== null ? [0] : [],
              //     })
              //   : null,
              this.props.form.getFieldDecorator("itemname", {
                initialValue: record.name
              }),
                this.props.form.getFieldDecorator("itemcost", {
                  initialValue: record.cost
                }),
                this.props.form.getFieldDecorator("menucategory", {
                  initialValue: record.Category_Id
                }),
                record.stuffing === null
                  ? null
                  : record.stuffing === null
                  ? this.setState({
                      defaultStuffing: false
                    })
                  : this.props.form.getFieldDecorator("itemstuffing", {
                      initialValue: record.stuffing
                    });

              this.props.form.getFieldDecorator("itemdescription", {
                initialValue: record.Description
              });
            }}
            alt="Edit"
          >
            <FontAwesomeIcon icon={["fas", "edit"]} />
          </span>
        )
      }
    ];

    let data = [];

    if (this.state.items !== null) {
      data = this.state.items.map((result, index) => ({
        key: index,
        itemstatus: result.itemstatus,
        name: result.name,
        category: result.category,
        stuffing: result.stuffing,
        type: result.type,
        cost: result.cost,
        itemId: result.itemid,
        Category_Id: result.categoryid,
        Type_Id: result.typeid,
        ChefSpecial_Status: result.chefspecialstatus,
        MenuSpecial_Status: result.menuspecialstatus,
        Description: result.description
      }));
    }

    const {
      getFieldDecorator,
      getFieldsError,
      getFieldValue
    } = this.props.form;

    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");

    const formItems =
      this.state.type === "Add Item" || this.state.type === "Edit Item"
        ? keys.map((k, index) => {
            return (
              <div key={index} className="d-flex w-100">
                <div
                  style={{ width: "50%", paddingLeft: 15, paddingRight: 15 }}
                >
                  <Form.Item key={k}>
                    {getFieldDecorator(`names[${k}]`, {
                      rules: [
                        {
                          required: true,
                          message: "Please select stuffing."
                        }
                      ]
                    })(
                      <Select
                        placeholder="Select Stuffing*"
                        onChange={e => this.setState({ itemStuffing: e })}
                      >
                        {this.state.stuffing !== null
                          ? this.state.stuffing.map((data, index) => {
                              return (
                                <Option key={index} value={data.stuffingid}>
                                  {data.name}
                                </Option>
                              );
                            })
                          : null}
                      </Select>
                    )}
                  </Form.Item>
                </div>
                <div
                  style={{ width: "37.5%", paddingLeft: 15, paddingRight: 10 }}
                >
                  <Form.Item key={k}>
                    {getFieldDecorator(`name[${k}]`, {
                      rules: [
                        {
                          required: true,
                          message: "Please input cost."
                        }
                      ],
                      initialValue: null
                    })(
                      <Input
                        type="number"
                        onChange={e =>
                          this.setState({ itemStuffingCost1: e.target.value })
                        }
                        placeholder="Item Cost*"
                      />
                    )}
                  </Form.Item>
                </div>
                <div
                  style={{
                    width: "7%",
                    paddingLeft: 15,
                    paddingRight: 15,
                    textAlign: "right"
                  }}
                >
                  {keys.length <= 1 ? null : ( // /> //   onClick={(this.add)} //   type="plus" //   className="dynamic-delete-button" //   }} //     fontSize: 35, //     marginTop: 0, //     borderRadius: 4, //     padding: 11, //     border: "1px solid #92B9FF", //index === keys.length - 1 ?   style={{ // <Icon
                    <span
                      style={{
                        border: "1px solid #92B9FF",
                        padding: 13,
                        borderRadius: 4,
                        marginTop: 0,
                        fontSize: 35,
                        color: "red"
                      }}
                      className="dynamic-delete-button"
                      type="plus"
                      onClick={() => this.remove(k)}
                    >
                      <FontAwesomeIcon icon={["fas", "trash-alt"]} />
                    </span>
                  )}
                </div>
              </div>
            );
          })
        : null;

    switch (this.state.type) {
      case "Add Item":
        return (
          <div>
            <Title>
              <div
                className="col-xl-9 col-lg-6 col-md-12 col-sm-12"
                style={{ margin: "auto 0px" }}
              >
                <label className="title-label f-s-22">Add Item</label>
              </div>
              {/* {props.children} */}

              <div
                className="col-xl-3 col-lg-6 col-md-6 col-sm-12"
                style={{ margin: "auto 0px", textAlign: "right" }}
              >
                <Button
                  className="f-s-20 secondary"
                  type="back"
                  onClick={() => {
                    this.setState({
                      type: "Default",
                      stuffingCostSelected: false
                    });
                    this.props.form.resetFields();
                  }}
                >
                  Back
                </Button>
                {/* <Button className="f-s-20 m-l-15 primary">Save</Button> */}
              </div>
            </Title>
            <div className="container p-t-15">
              <div className="add-item-form">
                <Form className="add-form">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <Form.Item>
                        {getFieldDecorator("itemname", {
                          rules: [
                            {
                              required: true,
                              message: "Please input item name!"
                            }
                          ]
                        })(
                          <Input
                            onChange={e =>
                              this.setState({ itemName: e.target.value })
                            }
                            placeholder="Item Name*"
                          />
                        )}
                      </Form.Item>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <Form.Item>
                        {getFieldDecorator("itemcost", {
                          rules: [
                            {
                              required:
                                this.state.stuffingCostSelected === false
                                  ? true
                                  : false,
                              message: "Please input item cost!"
                            }
                          ]
                        })(
                          <Input
                            type="number"
                            disabled={this.state.stuffingCostSelected}
                            onChange={e =>
                              this.setState({ itemCost: e.target.value })
                            }
                            placeholder="Item Cost*"
                          />
                        )}
                      </Form.Item>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                      <Form.Item>
                        {getFieldDecorator("menucategory", {
                          rules: [
                            {
                              required: true,
                              message: "Please select menu category!"
                            }
                          ]
                        })(
                          <Select
                            placeholder="Menu Category*"
                            onChange={e => this.setState({ itemCategory: e })}
                          >
                            {this.state.category !== null
                              ? this.state.category.map((data, index) => {
                                  return (
                                    <Option key={index} value={data.categoryid}>
                                      {data.name}
                                    </Option>
                                  );
                                })
                              : null}
                          </Select>
                        )}
                      </Form.Item>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 checktag-form m-t-m-2 m-l-m-5 m-r-m-5">
                      <Form.Item>
                        {getFieldDecorator("menutype", {
                          rules: [
                            {
                              required: false,
                              message: "Please select menu type!"
                            }
                          ]
                        })(
                          <InputGroup
                            size="large"
                            className="m-l-5 m-t-3 type-selector"
                          >
                            <Radio.Group
                              defaultValue={2}
                              size={"large"}
                              onChange={e =>
                                this.setState({
                                  typeId: e.target.value
                                })
                              }
                            >
                              <div className="col-sm-4 p-l-0">
                                <Radio.Button value={2}>
                                  <span
                                    style={{
                                      fontSize: 18,
                                      color: "green",
                                      merginRight: 10
                                    }}
                                  >
                                    <FontAwesomeIcon icon={["fas", "leaf"]} />
                                  </span>
                                  <span className="m-l-10">Veg.</span>
                                </Radio.Button>
                              </div>
                              <div className="col-sm-4 p-l-0 p-r-0">
                                <Radio.Button value={1}>
                                  <span
                                    style={{
                                      fontSize: 18,
                                      color: "red",
                                      merginRight: 10
                                    }}
                                  >
                                    <FontAwesomeIcon icon={["fas", "circle"]} />
                                  </span>
                                  <span className="m-l-10">Non-Veg</span>
                                </Radio.Button>
                              </div>
                              <div className="col-sm-4 p-r-0">
                                <Radio.Button value={3}>
                                  <span
                                    style={{ fontSize: 18, merginRight: 10 }}
                                  >
                                    <FontAwesomeIcon
                                      icon={["fas", "wine-glass-alt"]}
                                    />
                                  </span>
                                  <span className="m-l-10">Drinks</span>
                                </Radio.Button>
                              </div>
                            </Radio.Group>
                          </InputGroup>
                        )}
                      </Form.Item>
                    </div>
                    <div className="w-100">
                      <div>{formItems}</div>
                      {/* {this.state.stuffingCostSelected === false ? ( */}
                      <div
                        className="col-xl-12 col-lg-12 col-md-12 col-sm-12"
                        style={{ marginBottom: 30 }}
                      >
                        <Button
                          className="f-s-20 primary"
                          onClick={() => {
                            this.add(),
                              this.setState({ stuffingCostSelected: true });
                          }}
                        >
                          Add Stuffing
                        </Button>
                      </div>
                      {/* ) : null} */}
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <Form.Item>
                        {getFieldDecorator("itemdescription", {
                          rules: [
                            {
                              required: false,
                              message: "Please add item description!"
                            }
                          ]
                        })(
                          <Input
                            onChange={e =>
                              this.setState({ itemDesc: e.target.value })
                            }
                            placeholder="Item Description"
                          />
                        )}
                      </Form.Item>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <Form.Item className="m-l-15">
                        {getFieldDecorator("checkbox-group")(
                          <Checkbox.Group style={{ width: "100%" }}>
                            <Row>
                              <Col>
                                <Checkbox
                                  value="housespecial"
                                  onChange={e =>
                                    this.setState({
                                      MenuSpecial_Status: e.target.checked
                                    })
                                  }
                                >
                                  House Special
                                </Checkbox>
                              </Col>
                            </Row>
                          </Checkbox.Group>
                        )}
                      </Form.Item>
                    </div>
                    <div
                      className="col-xl-12 col-lg-12 col-md-12 col-sm-12"
                      style={{ textAlign: "right" }}
                    >
                      <Button
                        className="f-s-20 secondary-bordered"
                        onClick={() => {
                          this.setState({
                            type: "Default",
                            stuffingCostSelected: false
                          }),
                            this.props.form.resetFields();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={this.state.itemSaveButton}
                        onClick={() => this.handleSave()}
                        className={"f-s-20 m-l-15 p-l-45 p-r-45 primary"}
                      >
                        {this.state.itemSaveButton ? (
                          <span>
                            <Spin
                              style={{
                                marginLeft: -10,
                                marginRight: 25,
                                color: "#052345"
                              }}
                              indicator={
                                <Icon
                                  type="loading"
                                  style={{ fontSize: 24 }}
                                  spin
                                />
                              }
                            />
                            Saving
                          </span>
                        ) : (
                          "Save"
                        )}
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        );

      case "Edit Item":
        return (
          <div>
            <Title>
              <div
                className="col-xl-9 col-lg-6 col-md-12 col-sm-12"
                style={{ margin: "auto 0px" }}
              >
                <label className="title-label f-s-22">Edit Item</label>
              </div>
              {/* {props.children} */}

              <div
                className="col-xl-3 col-lg-6 col-md-6 col-sm-12"
                style={{ margin: "auto 0px", textAlign: "right" }}
              >
                <Button
                  className="f-s-20 secondary"
                  type="back"
                  onClick={() =>
                    this.setState({ type: "Default", defaultStuffing: true })
                  }
                >
                  Back
                </Button>
              </div>
            </Title>
            <div className="container p-t-15">
              <div className="add-item-form">
                <Form onSubmit={this.handleSubmit} className="edit-form">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <Form.Item>
                        {getFieldDecorator("itemname", {
                          rules: [
                            {
                              required: true,
                              message: "Please input item name!"
                            }
                          ]
                        })(
                          <Input
                            onChange={e =>
                              this.setState({ itemName: e.target.value })
                            }
                            placeholder="Item Name*"
                          />
                        )}
                      </Form.Item>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <Form.Item>
                        {getFieldDecorator("itemcost", {
                          rules: [
                            {
                              required: true,
                              message: "Please input item cost!"
                            }
                          ]
                        })(
                          <Input
                            type="number"
                            onChange={e =>
                              this.setState({ itemCost: e.target.value })
                            }
                            placeholder="Item Cost*"
                          />
                        )}
                      </Form.Item>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                      <Form.Item>
                        {getFieldDecorator("menucategory", {
                          rules: [
                            {
                              required: true,
                              message: "Please select menu category!"
                            }
                          ]
                        })(
                          <Select
                            placeholder="Menu Category*"
                            onChange={e => this.setState({ itemCategory: e })}
                          >
                            {this.state.category
                              ? this.state.category.map((data, index) => {
                                  return (
                                    <Option key={index} value={data.categoryid}>
                                      {data.name}
                                    </Option>
                                  );
                                })
                              : null}
                          </Select>
                        )}
                      </Form.Item>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 checktag-form m-t-m-2 m-l-m-5 m-r-m-5">
                      <Form.Item>
                        {getFieldDecorator("menutype", {
                          rules: [
                            {
                              required: false,
                              message: "Please select menu type!"
                            }
                          ]
                        })(
                          <InputGroup
                            size="large"
                            className="m-l-5 m-t-3 type-selector"
                          >
                            <Radio.Group
                              defaultValue={this.state.typeId}
                              size={"large"}
                              onChange={e =>
                                this.setState({
                                  typeId: e.target.value
                                })
                              }
                            >
                              <div className="col-sm-4 p-l-0">
                                <Radio.Button value={2}>
                                  <span
                                    style={{
                                      fontSize: 18,
                                      color: "green",
                                      merginRight: 10
                                    }}
                                  >
                                    <FontAwesomeIcon icon={["fas", "leaf"]} />
                                  </span>
                                  <span className="m-l-10">Veg.</span>
                                </Radio.Button>
                              </div>
                              <div className="col-sm-4 p-l-0 p-r-0">
                                <Radio.Button value={1}>
                                  <span
                                    style={{
                                      fontSize: 18,
                                      color: "red",
                                      merginRight: 10
                                    }}
                                  >
                                    <FontAwesomeIcon icon={["fas", "circle"]} />
                                  </span>
                                  <span className="m-l-10">Non-Veg</span>
                                </Radio.Button>
                              </div>
                              <div className="col-sm-4 p-r-0">
                                <Radio.Button value={3}>
                                  <span
                                    style={{ fontSize: 18, merginRight: 10 }}
                                  >
                                    <FontAwesomeIcon
                                      icon={["fas", "wine-glass-alt"]}
                                    />
                                  </span>
                                  <span className="m-l-10">Drinks</span>
                                </Radio.Button>
                              </div>
                            </Radio.Group>
                          </InputGroup>
                        )}
                      </Form.Item>
                    </div>
                    {this.state.defaultStuffing === true ? (
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <Form.Item>
                          {getFieldDecorator("itemstuffing", {
                            rules: [
                              {
                                required: false,
                                message: "Please select stuffing!"
                              }
                            ]
                          })(
                            <Select
                              placeholder="Select Stuffing*"
                              onChange={e => this.setState({ itemStuffing: e })}
                            >
                              {this.state.stuffing
                                ? this.state.stuffing.map((data, index) => {
                                    return (
                                      <Option
                                        key={index}
                                        value={data.stuffingid}
                                      >
                                        {data.name}
                                      </Option>
                                    );
                                  })
                                : null}
                            </Select>
                          )}
                        </Form.Item>
                      </div>
                    ) : null}
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <Form.Item>
                        {getFieldDecorator("itemdescription", {
                          rules: [
                            {
                              required: false,
                              message: "Please add item description!"
                            }
                          ]
                        })(
                          <Input
                            onChange={e =>
                              this.setState({ itemDesc: e.target.value })
                            }
                            placeholder="Item Description"
                          />
                        )}
                      </Form.Item>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <Form.Item className="m-l-15">
                        {getFieldDecorator("checkbox-group")(
                          <Row>
                            <Col>
                              <Checkbox
                                checked={this.state.MenuSpecial_Status}
                                value="housespecial"
                                onChange={e =>
                                  this.setState({
                                    MenuSpecial_Status: e.target.checked
                                  })
                                }
                              >
                                House Special
                              </Checkbox>
                            </Col>
                          </Row>
                        )}
                      </Form.Item>
                    </div>
                    <div
                      className="col-xl-12 col-lg-12 col-md-12 col-sm-12"
                      style={{ textAlign: "right" }}
                    >
                      <Button
                        className="f-s-20 secondary-bordered"
                        onClick={() =>
                          this.setState({
                            type: "Default",
                            itemEditButton: false,
                            defaultStuffing: true
                          })
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={this.state.itemEditButton}
                        onClick={() => this.handleEditSave()}
                        className={"f-s-20 m-l-15 p-l-45 p-r-45 primary"}
                      >
                        {this.state.itemEditButton ? (
                          <span>
                            <Spin
                              style={{
                                marginLeft: -10,
                                marginRight: 25,
                                color: "#052345"
                              }}
                              indicator={
                                <Icon
                                  type="loading"
                                  style={{ fontSize: 24 }}
                                  spin
                                />
                              }
                            />
                            Updating
                          </span>
                        ) : (
                          "Update"
                        )}
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <Title>
              <div
                className="col-lg-3 col-md-12 col-sm-12"
                style={{ margin: "auto 0px" }}
              >
                <label className="title-label f-s-22">Menu List</label>
              </div>
            </Title>
            <div className="container card-overflow p-t-15">
              <Table
                loading={this.state.itemsLoading ? true : false}
                columns={columns}
                dataSource={
                  this.state.filter === "" ? data.reverse() : data.reverse()
                }
                bordered
              />
              <div className="m-l-m-10">
                <Button
                  className="m-10 primary"
                  type="plus"
                  onClick={() => {
                    this.setState({ type: "Add Item" }),
                      this.props.form.validateFields();
                  }}
                >
                  Add Item
                </Button>
                <Button
                  onClick={() => this.setmodalCategoryVisible(true)}
                  className="m-10 primary"
                  type="plus"
                >
                  Add Category
                </Button>
                {/* <Button
                  onClick={() => this.setmodalSubCategoryVisible(true)}
                  className="m-10 primary"
                  type="plus"
                >
                  Add Sub Category
                </Button> */}
                <Button
                  onClick={() => this.setmodalStuffingVisible(true)}
                  className="m-10 primary"
                  type="plus"
                >
                  Add Stuffing
                </Button>
              </div>
            </div>
          </div>
        );
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="customer-profile">
        {this.renderDashboard()}
        <Modal
          className="modelView"
          title="Add Category"
          centered
          visible={this.state.modalCategoryVisible}
          onCancel={() => this.setmodalCategoryVisible(false)}
          footer={null}
        >
          <div className="text-right add-item-form">
            <Form onSubmit={this.handleSubmit} className="category-form">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <Form.Item>
                  {getFieldDecorator("category", {
                    rules: [
                      {
                        required: this.state.type === "Default" ? true : false,
                        message: "Please input category name!"
                      }
                    ]
                  })(
                    <Input
                      placeholder="New Category Name*"
                      onChange={e =>
                        this.setState({ categoryAddName: e.target.value })
                      }
                    />
                  )}
                </Form.Item>
              </div>
            </Form>
            <div className="m-l-15 m-r-15">
              <Button
                className="f-s-20 secondary-bordered"
                onClick={() => (
                  this.setmodalCategoryVisible(false),
                  this.props.form.resetFields()
                )}
              >
                Cancel
              </Button>
              <Button
                disabled={this.state.categorySaveButton}
                onClick={() => this.onCategoryAdd()}
                className={"f-s-20 m-l-15 p-l-45 p-r-45 primary"}
              >
                {this.state.categorySaveButton ? (
                  <span>
                    <Spin
                      style={{
                        marginLeft: -10,
                        marginRight: 25,
                        color: "#052345"
                      }}
                      indicator={
                        <Icon type="loading" style={{ fontSize: 24 }} spin />
                      }
                    />
                    Saving
                  </span>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </Modal>
        <Modal
          className="modelView"
          title="Add Sub Category"
          centered
          visible={this.state.modalSubCategoryVisible}
          onCancel={() => this.setmodalSubCategoryVisible(false)}
          footer={null}
        >
          <div className="text-right add-item-form">
            <Form onSubmit={this.handleSubmit} className="sub-category-form">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <Form.Item>
                  {getFieldDecorator("subcategory", {
                    rules: [
                      {
                        required:
                          this.state.type === "Add Item" ||
                          this.state.type === "Edit Item"
                            ? false
                            : true,
                        message: "Please input subcategory name!"
                      }
                    ]
                  })(<Input placeholder="New Sub Category Name*" />)}
                </Form.Item>
              </div>
            </Form>
            <div className="m-l-15 m-r-15">
              <Button
                className="f-s-20 secondary-bordered"
                onClick={() => this.setmodalSubCategoryVisible(false)}
              >
                Cancel
              </Button>
              <Button className="f-s-20 m-l-15 p-l-45 p-r-45 primary">
                Save
              </Button>
            </div>
          </div>
        </Modal>
        <Modal
          className="modelView"
          title="Add Stuffing"
          centered
          visible={this.state.modalStuffingVisible}
          onCancel={() => this.setmodalStuffingVisible(false)}
          footer={null}
        >
          <div className="text-right add-item-form">
            <Form onSubmit={this.handleSubmit} className="stuffing-form">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <Form.Item>
                  {getFieldDecorator("stuffing", {
                    rules: [
                      {
                        required:
                          this.state.type === "Add Item" ||
                          this.state.type === "Edit Item"
                            ? false
                            : true,
                        message: "Please input stuffing name!"
                      }
                    ]
                  })(
                    <Input
                      placeholder="New Stuffing Name*"
                      onChange={e =>
                        this.setState({ stuffingAddName: e.target.value })
                      }
                    />
                  )}
                </Form.Item>
              </div>
            </Form>
            <div className="m-l-15 m-r-15">
              <Button
                className="f-s-20 secondary-bordered"
                onClick={() => (
                  this.setmodalStuffingVisible(false),
                  this.props.form.resetFields()
                )}
              >
                Cancel
              </Button>
              <Button
                disabled={this.state.categorySaveButton}
                onClick={() => this.onStuffingAdd()}
                className={"f-s-20 m-l-15 p-l-45 p-r-45 primary"}
              >
                {this.state.stuffingSaveButton ? (
                  <span>
                    <Spin
                      style={{
                        marginLeft: -10,
                        marginRight: 25,
                        color: "#052345"
                      }}
                      indicator={
                        <Icon type="loading" style={{ fontSize: 24 }} spin />
                      }
                    />
                    Saving
                  </span>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Form.create({ name: "menuitems" })(MenuItems);
