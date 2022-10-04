import React from "react";
import { Gmaps, Marker, InfoWindow, Circle } from "react-gmaps";

const params = { v: "3.exp", key: "AIzaSyBZbVWkCG7ehlT4DCF-G7WqMVMnuTyLI-Y" };

class Gmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lat: 0, lng: 0, hover: false };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        marker_lat: pos.coords.latitude,
        marker_lng: pos.coords.longitude
      });
    });
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  onMouseOut(e) {
    this.setState({ hover: false });
  }

  onMouseOver({ name, marker_lat, marker_lng }) {
    this.setState({
      hover: true,
      name: name,
      marker_lat: marker_lat + 0.001,
      marker_lng: marker_lng
    });
  }

  onClick(e) {
    console.log("onClick", e);
  }

  render() {
    const markers = this.props.places.map(p => {
      let name = p.name;
      let marker_lat = p.lat;
      let marker_lng = p.lng;
      return (
        <Marker
          lat={p.lat}
          lng={p.lng}
          draggable={false}
          onDragEnd={this.onDragEnd}
          onMouseOver={e => this.onMouseOver({ name, marker_lat, marker_lng })}
          onMouseOut={this.onMouseOut}
        />
      );
    });
    return (
      <Gmaps
        width={"80%"}
        height={"97.5%"}
        lat={this.state.lat}
        lng={this.state.lng}
        zoom={15}
        loadingMessage={"MediSent"}
        params={params}
        onMapCreated={this.onMapCreated}
      >
        {markers}
        {this.state.hover && (
          <InfoWindow
            lat={this.state.marker_lat}
            lng={this.state.marker_lng}
            content={this.state.name}
            onCloseClick={this.onCloseClick}
          />
        )}
      </Gmaps>
    );
  }
}

export default Gmap;
