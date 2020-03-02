import React from "react";
import { NavLink } from "react-router-dom";

const DrawerItem = props => {
  return (
    <NavLink {...props} className="navlink" to={props.to}>
      <div
        className={props.menu ? "list drawer-link-menu" : "list drawer-link"}
      >
        <span className="icon-color">{props.icon}</span>
        <label
          className={
            props.menu
              ? "list-title label-color f-s-16 textoverflowads m-l-15"
              : "list-title label-color f-s-16 textoverflowads"
          }
        >
          {props.label}
        </label>
      </div>
    </NavLink>
  );
};

DrawerItem.propTypes = {};

export default DrawerItem;
