import React, { Component } from "react";
// import "./NewWork.css";
import { Button } from "@material-ui/core";
class DonationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick() {}
  render() {
    return (
      <div
        style={{ display: "inline-block", marginBottom: "5%", width: "50%" }}
      >
        <div className="card">
          <img
            className="card-img-top"
            src={this.props.data.img_name}
            alt="Med Image"
            height="400"
          />
          <br />
          <div className="card-body pt-0">
            <h5 className="card-title">Donation</h5>
            <p className="card-text">
              Medicine Name: {this.props.data.med_name}
            </p>
            <p className="card-text">Expiry date: {this.props.data.expiry}</p>
            <p className="card-text">Quantity: {this.props.data.quantity}</p>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClick}
            >
              See Requests
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default DonationCard;
