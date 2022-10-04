import React, { Component } from "react";
import "./tempo.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import fire from "./firebase";
import { AuthConsumer } from "../AuthContext";
import { Redirect } from "react-router-dom";
import Alert from "./helpers/Alert";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      email: "",
      confirm_pass: "",
      did_submit: false,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  alert_printer() {
    if (this.state.password.length < 6 && this.state.did_submit) {
      return (
        <Alert
          type="danger"
          message="Passwords too short"
          style={{ width: "50%", marginLeft: "30%" }}
        />
      );
    }
    if (this.state.password !== this.state.confirm_pass) {
      return (
        <Alert
          type="danger"
          message="Passwords not matching"
          style={{ width: "50%", float: "center", marginLeft: "26%" }}
        />
      );
    }
    if (this.state.did_submit) {
      if (this.state.error) {
        return (
          <Alert
            type="danger"
            message="Invalid Credentials"
            style={{ width: "50%", marginLeft: "30%" }}
          />
        );
      } else {
        return (
          <Alert
            type="success"
            message="Registration Succesful"
            style={{ width: "50%", marginLeft: "27%" }}
          />
        );
      }
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    var name = this.state.name;
    var user = null;
    var email = this.state.email;
    var password = this.state.password;
    this.setState({ error: false });
    this.setState({ did_submit: false });
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function() {
        user = fire.auth().currentUser;
      })
      .then(function() {
        user.updateProfile({
          displayName: name
        });
        fire.auth().signOut();
        //fire.auth().signInWithEmailAndPassword(email, password);
      })
      .catch(e => {
        this.setState({ error: true });
        console.log(e);
      })
      .finally(this.setState({ did_submit: true }));
  }

  render() {
    return (
      // <AuthConsumer>
      //   {({ isAuth }) =>
      //     isAuth ? (
      //       <Redirect to="/User" />
      //     ) : (
      <div className="background">
        <div className="register">
          <label className="spacing" htmlFor="name">
            Enter Name
          </label>
          <br />
          <TextField
            type="Text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br />
          <label className="spacing" htmlFor="email">
            Enter Email ID
          </label>
          <br />
          <TextField
            type="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />
          <label className="spacing" htmlFor="password">
            Enter Password
          </label>
          <br />
          <TextField
            type="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <label className="spacing" htmlFor="confirm_pass">
            Confirm Password
          </label>
          <br />
          <TextField
            type="Password"
            name="confirm_pass"
            value={this.state.confirm_pass}
            onChange={this.handleChange}
          />
          <br />
          <div className="spacing">
            <Button variant="contained" color="primary" onClick={this.onSubmit}>
              Register
            </Button>
          </div>
          {this.alert_printer()}
        </div>
        <br />
        <br />
        <p>Already a User ?</p>
        <Link to="/">Login</Link>
      </div>
      //     )
      //   }
      // </AuthConsumer>
    );
  }
}

export default Register;
