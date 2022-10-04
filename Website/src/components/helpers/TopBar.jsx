import React from "react";
import Popper from "@material-ui/core/Popper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./helper.css";
import { AuthConsumer } from "../../AuthContext";

const TopBar = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const link_items = props.link_items;
  var link_disp = "";
  if (link_items) {
    link_disp = link_items.map(li => {
      return (
        <Link
          to={li.path}
          style={{ float: "left", width: "20%", textDecoration: "none" }}
        >
          <div
            className="list-group-item list-group-item-action list-group-item-dark"
            style={{ textAlign: "center" }}
            key={props.text}
          >
            {li.text}
          </div>
        </Link>
      );
    });
  }
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <AuthConsumer>
      {({ user, logout }) => (
        <header
          className="bar_top"
          style={{ marginBottom: "1%", verticalAlign: "center" }}
        >
          <img
            // style={{ top: "10" }}
            src="/user_default.png"
            style={{ float: "right", padding: "10px" }}
            height="50"
            width="50"
            onClick={handleClick}
            className="rounded-circle"
          ></img>
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            style={{ backgroundColor: "white", width: "10%", padding: "10px" }}
            className="border_cust rounded"
          >
            <div style={{ textAlign: "center" }}>{user}</div>
            <br />
            <div
              style={{
                display: "inline-block",
                marginLeft: "22.5%"
              }}
            >
              <Button variant="contained" color="primary" onClick={logout}>
                Logout
              </Button>
            </div>
          </Popper>
          {link_disp}
        </header>
      )}
    </AuthConsumer>
  );
};

export default TopBar;
