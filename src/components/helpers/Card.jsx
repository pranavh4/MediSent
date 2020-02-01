import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Cards.css";
import { Link } from "react-router-dom";
import { display } from "@material-ui/system";
class Card extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      //   <div style={{ ...this.props.style, display: "inline-block" }}>
      <div className="col-md-4" style={this.props.style}>
        <div className="card profile-card-5">
          <div className="card-img-block">
            <img
              className="card-img-top"
              src={this.props.image}
              alt="Card image cap"
              height="400"
            />
          </div>
          <div className="card-body pt-0">
            <h5 className="card-title">{this.props.header}</h5>
            <p className="card-text">{this.props.text}</p>
            <Link to={this.props.link} className="btn btn-primary">
              {this.props.btext}
            </Link>
          </div>
        </div>
      </div>
      //   </div>
    );
  }
}
export default Card;
