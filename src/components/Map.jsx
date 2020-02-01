import React, { Component } from "react";
import Gmap from "./helpers/Gmap";
import { AuthConsumer } from "../AuthContext";
import "./tempo.css";
import TopBar from "./helpers/TopBar";
import { Scrollbars } from "react-custom-scrollbars";
import NearbyCard from "./helpers/NearbyCard";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      data: [{ name: "", lat: "", lng: "", rating: "", address: "" }]
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      fetch("/api", {
        method: "POST", // or 'PUT'
        body: JSON.stringify({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            data: res.data
          });
        });
    });
  }

  // async componentDidMount() {
  //   const pos = await navigator.geolocation.getCurrentPosition(async pos => {
  //     const res = await fetch("/api", {
  //       method: "POST", // or 'PUT'
  //       body: JSON.stringify({
  //         lat: pos.coords.latitude,
  //         lng: pos.coords.longitude
  //       }), // data can be `string` or {object}!
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     });
  //     const res_j = res.json();
  //     this.setState({
  //       lat: pos.coords.latitude,
  //       lng: pos.coords.longitude,
  //       data: res_j.data
  //     });
  //     console.log(this.state);
  //   });
  // }
  // fetch("/api", {
  //   method: "POST", // or 'PUT'
  //   body: JSON.stringify({ lat: this.state.lat, lng: this.state.lng }), // data can be `string` or {object}!
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // });
  // fetch("/api", {
  //   method: "POST",
  //   body: JSON.stringify({ lat: this.state.lat, lng: this.state.lng })
  // }).then(res => console.log(res.body));
  // }
  render() {
    let card_items = [];
    let count = 0;
    if (this.state.data)
      card_items = this.state.data.map(ci => (
        <NearbyCard key={count++} data={ci} />
      ));
    return (
      // <AuthConsumer>
      //   {({ user, logout }) => (
      <div style={{ height: "100%" }}>
        <TopBar
          link_items={[
            { text: "HOME", path: "/Home" },
            { text: "DONATIONS", path: "/Donations" },
            { text: "REQUESTS", path: "/Requests" }
          ]}
        />
        <br />
        <Gmap
          places={this.state.data.map(d => {
            return { lat: d.lat, lng: d.lng, name: d.name };
          })}
        />
        <Scrollbars
          style={{
            position: "fixed",
            bottom: "0",
            right: "0",
            height: "95%",
            width: "20%",
            backgroundColor: "#42444e"
          }}
        >
          {card_items}
        </Scrollbars>
      </div>
      //   )}
      // </AuthConsumer>
    );
  }
}

export default Map;
