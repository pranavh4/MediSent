import React, { Component } from "react";
import TopBar from "./helpers/TopBar";
import Card from "./helpers/Card";
import "./helpers/helper.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="background_helper" classtyle={{ height: "100%" }}>
        <TopBar />
        <Card
          style={{ marginTop: "10%", float: "left", marginLeft: "6%" }}
          header="Donations"
          text="some text"
          link="/Donations"
          image="/Donation.png"
          btext="My Donations"
        />
        <Card
          style={{ marginTop: "10%", float: "left", marginLeft: "6%" }}
          header="Requests"
          text="some text"
          link="/Requests"
          image="/Medicine.jfif"
          btext="My Requests"
        />
        <Card
          style={{ marginTop: "10%", float: "left", marginLeft: "6%" }}
          header="Pharmacies and NGOs"
          text="some text"
          link="/Map"
          image="/NGO.png"
          btext="See In Maps"
        />
      </div>
    );
  }
}

export default Home;
