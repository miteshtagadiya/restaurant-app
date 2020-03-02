import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Observable } from "rxjs";
import "./NavigationDrawer.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NavigationDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open
        ? this.props.open && window.innerWidth < 1025
        : false,
      isLargeScreen: window.innerWidth > 1025 ? true : false
    };
  }

  handleKeypress = e =>
    e.keyCode === 27 ? this.setState({ open: false }) : null;

  isOpen = () => (this.state.open ? "open" : "not-open");

  componentWillReceiveProps = nextProps => {
    let { open } = nextProps;
    this.setState({ open });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.open === false && prevState.open === true) {
      this.onClose();
    }

    if (this.state.open) this.onOpen();
  };
  resize$ = null;
  componentDidMount = () => {
    this.resize$ = Observable.fromEvent(window, "resize")
      .map(e => ({ width: e.target.innerWidth, height: e.target.innerHeight }))
      .subscribe(size => {
        if (size.width > 1025) {
          this.setState({ isLargeScreen: true });
        } else {
          this.setState({
            isLargeScreen: false,
            open: false
          });
        }
      });
  };

  onOpen = () => {
    window.addEventListener("keydown", this.handleKeypress);
    let { onOpen } = this.props;
    if (onOpen) onOpen();
  };
  onClose = () => {
    window.removeEventListener("keydown", this.handleKeypress);
    let { onClose } = this.props;
    if (onClose) onClose();
  };

  render() {
    return (
      <div className={"app-drawer no-margin no-padding " + this.isOpen()}>
        <div
          onClick={() => this.setState({ open: false })}
          style={{
            display:
              !this.state.isLargeScreen && this.props.open === true
                ? "block"
                : "none"
          }}
          className="ui-drawer-overlay"
        />

        <div className="drawer">
          <div className="logo-container container">
            <Link to="/">
              <span style={{ color: "white", fontSize: 70 }}>
                <FontAwesomeIcon icon={["fab", "app-store-ios"]} />
              </span>{" "}
              <span className="logo-title" />
            </Link>
          </div>
          <nav
            className="nav-scroll"
            onClick={() => this.setState({ open: true })}
          >
            <ul className="drawer-menu" style={{ fontSize: 14 }}>
              {this.props.children}
            </ul>
          </nav>
          <div>
            {/* <label className="f-s-20">Copyright &copy; 2019 Datavizz</label> */}
            <div className="bottom-profile-container align-self-center">
              <span style={{ color: "white", fontSize: 50 }}>
                <FontAwesomeIcon icon={["fas", "id-card-alt"]} />
              </span>{" "}
              <div className="align-middle" style={{ margin: "auto 10px" }}>
                <label className="logo-title m-l-20 f-s-20">John Doe</label>
                <br />
                <label className="logo-title m-l-20">Sign Out</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NavigationDrawer.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.func
};

export default NavigationDrawer;
