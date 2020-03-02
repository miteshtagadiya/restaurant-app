import React from "react";
import { Icon } from 'antd';
import "./DrawerButton.sass";
const DrawerButton = props => {
  return (
    <div className={props.className}>
      <div className="nav">
      <Icon type="menu-unfold" onClick={props.onClick} style={{ ...props.style }} />
      </div>
    </div>
  );
};

DrawerButton.propTypes = {};

export default DrawerButton;
