import React, { Component } from "react";
import "./tempo.css";
import { AuthConsumer } from "../AuthContext";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import fire from "./firebase";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    background: "black"
  },
  input: {
    color: "white"
  }
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isloggedIn: false,
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <AuthConsumer>
        {({ login, isAuth, invalid_cred }) =>
          isAuth ? (
            <Redirect to="/Home" />
          ) : (
            <div className="background">
              <header className="wrap">
                <p style={{ float: "left", margin: "1%", color: "white" }}>
                  Email
                </p>
                <div className="login_inp">
                  <TextField
                    InputProps={{
                      className: classes.input
                    }}
                    type="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <p style={{ float: "left", margin: "1%", color: "white" }}>
                  Password
                </p>
                <div className="login_inp">
                  <TextField
                    InputProps={{
                      className: classes.input
                    }}
                    type="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="login_inp">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={e => {
                      login({
                        event: e,
                        email: this.state.email,
                        pass: this.state.password
                      });
                    }}
                  >
                    Log In
                  </Button>
                </div>
                <div className="login_inp" style={{ float: "right" }}>
                  <Link to="/register">Register</Link>
                </div>
                {invalid_cred && (
                  <p
                    style={{
                      float: "left",
                      borderColor: "red"
                    }}
                    class="alert alert-danger"
                    role="alert"
                  >
                    Invalid Credentials
                  </p>
                )}
              </header>
            </div>
          )
        }
      </AuthConsumer>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
