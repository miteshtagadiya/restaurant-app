import React, { Component } from "react";
import { Auth } from "aws-amplify";
import LoginLogo from "../../../assets/Logo.png";
import LoginBanner from "../../../assets/login-banner.png";
import "./Register.sass";
import Button from "../../ui/Button/Button";
import { Input, Form } from "antd";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    console.log(this.state.Auth);
    event.preventDefault();
    try {
      await Auth.signIn(this.state.email, this.state.password);
      alert("Logged in");
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-8 login-logo-container">
            <div className="login-form-container">
              <img className="login-logo" src={LoginLogo} alt="logo" />
              <h1 className="login-title">
                Create new account
              </h1>
              <form onSubmit={this.handleSubmit} className="login-form">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 no-padding">
                  <Form.Item>
                    <Input
                      className="input-login"
                      placeholder="Resturant Name"
                      type="text"
                    />
                  </Form.Item>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 no-padding">
                  <Form.Item>
                    <Input
                      type="type"
                      className="input-login"
                      placeholder="IN-Chagre Name"
                    />
                  </Form.Item>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 no-padding">
                  <Form.Item>
                    <Input
                      type="type"
                      className="input-login"
                      placeholder="Resturant Email address"
                    />
                  </Form.Item>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 no-padding">
                  <Form.Item>
                    <Input
                      type="number"
                      className="input-login"
                      placeholder="Mobile Number"
                    />
                  </Form.Item>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 no-padding">
                  <Form.Item>
                    <Input
                      type="password"
                      className="input-login"
                      placeholder="Password"
                    />
                  </Form.Item>
                </div>
                <Button
                  type="submit"
                  class="btn btn-primary login-button"
                  disabled={!this.validateForm()}
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
          <div className="col-md-4 no-padding">
            <img src={LoginBanner} class="login-banner" alt="banner-img" />
          </div>
        </div>
      </div>
    );
  }
}
