import React from "react";
import "./ContentArea.sass";
const ContentArea = props => {
  return <div className="content-wrapper">{props.children}</div>;
};

export default ContentArea;
