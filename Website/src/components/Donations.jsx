import React, { Component } from "react";
import TopBar from "./helpers/TopBar";
import fire, { db } from "./firebase";
import DonationCard from "./helpers/DonationCard";
import "./tempo.css";

class Donations extends Component {
  constructor(props) {
    super(props);
    this.state = { donations: [] };
  }
  componentDidUpdate() {
    console.log(this.state);
  }
  componentDidMount() {
    let uid = fire.auth().currentUser.uid;
    console.log(uid);
    db.collection("donations")
      .where("uid", "==", uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          //   donations.push(doc.data());
          fire
            .storage()
            .ref("donations/" + uid)
            .child(doc.data().img_name)
            .getDownloadURL()
            .then(url => {
              this.setState(state => {
                let dat = doc.data();
                dat.img_name = url;
                let new_don = state.donations.concat(dat);
                return { ...state, donations: new_don };
              });
            });
          // .this.setState(state => {
          //   let new_don = state.donations.concat(doc.data());

          //   return { ...state, donations: new_don };
          // });
        });
      })
      //   .then(this.setState({ donations: donations }))
      .catch(error => {
        console.log("Error getting documents: ", error);
      });

    // let don = donations.get();
    // this.setState({ donations: donations });
    // db.collection("donations")
    //   .doc("random")
    //   .set({ test: "test" });
    // console.log(donations);
  }
  render() {
    let don = this.state.donations.map(d => <DonationCard data={d} />);
    return (
      <div className="background" style={{ textAlign: "center" }}>
        <TopBar
          link_items={[
            { text: "HOME", path: "/Home" },
            { text: "MAPS", path: "/Map" },
            { text: "REQUESTS", path: "/Requests" }
          ]}
        />
        <div style={{ marginTop: "3%" }}>{don}</div>
      </div>
    );
  }
}

export default Donations;
