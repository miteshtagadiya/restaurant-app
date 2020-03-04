import React from "react";
import ReactDOM from "react-dom";
import "./styles/global-styles.sass";
import "./index.css";
import App from "./components/index";
import { BrowserRouter as Router } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fab, fas);

const application = (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(application, document.getElementById("root"));
