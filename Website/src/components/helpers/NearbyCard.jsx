import React, { Component } from "react";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    maxWidth: "90%",
    margin: "5px auto"
  },
  media: {
    height: 140
  },
  card_header: {
    textAlign: "center"
  }
});

const NearbyCard = props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.card_header}>
        <h5>{props.data.name}</h5>
      </CardContent>
      <CardContent>
        <p>{props.data.rating}/5 Stars</p>
      </CardContent>
      <CardContent>{props.data.address}</CardContent>
    </Card>
  );
};

export default NearbyCard;
