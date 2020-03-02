import React from "react";
import { Tag } from "antd";
import "./CheckTag.sass";
const { CheckableTag } = Tag;

class CheckTag extends React.Component {
  state = { checked: true };

  handleChange = checked => {
    this.setState({ checked });
  };

  render() {
    return (
      <CheckableTag
        {...this.props}
        checked={this.props.checked}
        onChange={this.props.onChange}
      />
    );
  }
}

export default CheckTag;
