import React from "react";
import { Icon } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Button.sass";

const Button = props => {
  function icon(type) {
    switch (type) {
      case "plus":
        return (
          <Icon className="icons-plus" type="plus" style={{ fontSize: 18 }} />
        );
      case "back":
        return (
          <span className="m-r-15 f-s-20">
            <FontAwesomeIcon icon={["fas", "arrow-left"]} />
          </span>
        );
      default:
        return;
    }
  }

  return (
    <span className="button-theme">
      <button
        onClick={props.onClick}
        disabled={props.disabled}
        className={
          props.className
            ? props.type === "plus"
              ? props.disabled === true
                ? props.className + "-disabled-type"
                : props.className + "-type"
              : props.disabled === true
              ? props.className + "-disabled"
              : props.className
            : "primary"
        }
      >
        {props.type ? icon(props.type) : null}

        {props.children}
      </button>
    </span>
  );
};

export default Button;
