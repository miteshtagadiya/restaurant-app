import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Login from "./app/Login/Login";
import BodyClassName from "react-body-classname";
import Dashboard from "./app/Dashboard/Dashboard";
import Register from "./app/Register/Register";

export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  render() {
    return (
      <BodyClassName className={"fix-header fix-sidebar"}>
        <div>
          {/* <Online> */}
          <React.Fragment>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/" component={Dashboard} />
            </Switch>
          </React.Fragment>
        </div>
      </BodyClassName>
    );
  }
}

export default withRouter(Index);
