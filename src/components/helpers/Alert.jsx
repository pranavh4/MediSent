import React, { Component } from "react";
import "../tempo.css";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.type === "danger" ? "red" : "green"
    };
  }
  render() {
    return (
      <div className="register" style={this.props.style}>
        <p
          style={{
            float: "left",
            borderColor: this.state.color
          }}
          className={"alert alert-" + this.props.type}
          role="alert"
        >
          {this.props.message}
        </p>
      </div>
    );
  }
}

export default Alert;
