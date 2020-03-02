import React, { Component } from "react";
import { Icon } from "antd";
import "./DrawerExpandItem.sass";

class DrawerExpandItem extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }
  render() {
    return [
      <div
        className={this.props.isActive ? "sidebar-expand" : null}
        key={"parent-link"}
        onClick={() => this.setState({ open: !this.state.open })}
        style={{ textDecoration: "none", cursor: "pointer" }}
      >
        <div key="main-item" className="list drawer-link">
          <div className="sub">
            <span className="icon-color">{this.props.icon}</span>
            <label className="f-s-16 list-title label-color">
              {this.props.label}
            </label>
          </div>
          <div className="arrow">
            <Icon type={this.state.open ? "down" : "right"} />
          </div>
        </div>
      </div>,
      <div
        key="subitem-container"
        className={this.state.open ? "show" : "none"}
      >
        {this.props.children}
      </div>,
    ];
  }
}

DrawerExpandItem.defaultProps = {
  to: "/",
  label: "",
  icon: null,
};

export default DrawerExpandItem;
