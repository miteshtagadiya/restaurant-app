import React, { Component } from "react";
import Header from "../../ui/NavigationHeader/NavigationHeader";
import Sidebar from "../../ui/NavigationDrawer/NavigationDrawer";
import DrawerItem from "../../ui/NavigationDrawer/DrawerItem/DrawerItem";
import DrawerExpandItem from "../../ui/NavigationDrawer/DrawerExpandItem/DrawerExpandItem";
import { Switch, Route } from "react-router-dom";
import DrawerButton from "../../ui/NavigationHeader/DrawerButton/DrawerButton";
import { Icon, Drawer, Switch as Switch1, Popconfirm, Radio } from "antd";
import ContentArea from "../../ui/ContentArea/ContentArea";
import "./Dashboard.sass";
import Customers from "../Customers/Customers";
import CustomerProfile from "../CustomerProfile/CustomerProfile";
import Orders from "../Orders/Orders";
import MenuItems from "../MenuItems/MenuItems";
import SpecialMenuItems from "../SpecialMenuItems/SpecialMenuItems";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
      visible: false,
      placement: "left",
      restaurant: null,
      selectedRestaurant: "",
      Restaurant_AddressId: "",
      Restaurant_Name: "All"
    };
  }

  handleDrawerButtonClick = () => {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  };

  renderShopNavigation() {
    let arr = this.props.history.location.pathname.split("/");
    return (
      <React.Fragment>
        <DrawerItem
          label="Customers"
          icon={<Icon type="team" />}
          to={`/customers`}
          onClick={() =>
            this.setState({
              isDrawerOpen: !this.state.isDrawerOpen
            })
          }
        />

        <DrawerItem
          label="Orders"
          icon={<Icon type="shopping-cart" />}
          to={`/orders`}
          onClick={() =>
            this.setState({
              isDrawerOpen: !this.state.isDrawerOpen
            })
          }
        />

        <DrawerExpandItem
          isActive={
            arr[1] === "menu" || arr[1] === "specialmenu" ? true : false
          }
          label="Menu"
          icon={<Icon type="book" />}
          to={`/menu`}
        >
          <DrawerItem
            menu={"true"}
            onClick={() =>
              this.setState({
                isDrawerOpen: !this.state.isDrawerOpen
              })
            }
            label={"Menu Items"}
            to={`/menu`}
          />
          <DrawerItem
            menu={"true"}
            onClick={() =>
              this.setState({
                isDrawerOpen: !this.state.isDrawerOpen
              })
            }
            label={"Special Menu Items"}
            to={`/specialmenu`}
          />
        </DrawerExpandItem>
      </React.Fragment>
    );
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  onRestaurantChange(row) {
    this.setState({
      Restaurant_AddressId: "",
      Restaurant_Name: row
    });
  }

  render() {
    return (
      <div className="main-wrapper h-100">
        <Header>
          <DrawerButton
            className="hidden-1024-up"
            onClick={this.handleDrawerButtonClick}
          />
        </Header>
        <Sidebar
          onClose={() => this.setState({ isDrawerOpen: false })}
          open={this.state.isDrawerOpen}
        >
          <div
            key="main-item"
            style={{
              padding: "15px 25px",
              display: "flex",
              alignItems: "center",
              color: "#ffffff",
              borderBottom: "2px solid #ffffff",
              cursor: "pointer"
            }}
            onClick={this.showDrawer}
          >
            <div className="sub">
              <span className="icon-color">{this.props.icon}</span>
              <label className="f-s-20 list-title label-color">
                Branch :{"  "}
                {this.state.Restaurant_Name}
              </label>
            </div>
            <div className="arrow">
              <Icon type={"right"} />
            </div>
          </div>
          {this.renderShopNavigation()}
        </Sidebar>

        <Drawer
          title="Branch"
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Radio.Group
            value={this.state.selectedRestaurant}
            onChange={e =>
              this.setState({ selectedRestaurant: e.target.value })
            }
          >
            {this.state.restaurant !== null
              ? this.state.restaurant.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex p-20 justify-content-between"
                      style={{ borderBottom: "1px solid #999999" }}
                    >
                      <div>
                        <Radio
                          value={data.Restaurant_AddressId}
                          onClick={() =>
                            this.setState({ Restaurant_Name: data.Branch_Name })
                          }
                        >
                          {data.Branch_Name}
                        </Radio>
                      </div>
                      <div className="m-t-4">
                        {data.Status === 1 ? (
                          <Popconfirm
                            title="Are you sure？"
                            onConfirm={() =>
                              this.itemStatusChange(
                                data.Status,
                                data.Restaurant_AddressId
                              )
                            }
                            okText="Yes"
                            cancelText="No"
                          >
                            <Switch1 checked={true} />
                          </Popconfirm>
                        ) : data.Status === 0 ? (
                          <Popconfirm
                            title="Are you sure？"
                            onConfirm={() =>
                              this.itemStatusChange(
                                data.Status,
                                data.Restaurant_AddressId
                              )
                            }
                            okText="Yes"
                            cancelText="No"
                          >
                            <Switch1 checked={false} />
                          </Popconfirm>
                        ) : null}
                      </div>
                    </div>
                  );
                })
              : null}
          </Radio.Group>
        </Drawer>

        <ContentArea>
          <Switch>
            <Route exact path="/" component={Customers} />
            <Route path="/customers/profile" component={CustomerProfile} />
            <Route path="/customers" component={Customers} />
            <Route path="/orders" component={Orders} />
            <Route path="/menu" component={MenuItems} />
            <Route path="/specialmenu" component={SpecialMenuItems} />
          </Switch>
        </ContentArea>
      </div>
    );
  }
}

export default Dashboard;
