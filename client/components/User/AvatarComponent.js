import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { CardActionArea } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(21),
    height: theme.spacing(21)
    // marginTop: theme.spacing(3),
    // marginLeft: "15%"
  },
  input: {
    opacity: 0,
    position: "absolute"
  },
  card: {
    borderRadius: "50%",
    width: "fit-content",
    height: "fit-content",
    margin: "auto",
    paddingRight: 0
  }
}));

export const AvatarComponent = ({ user }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CardActionArea className={classes.card}>
        <Avatar alt="image" src={user.Avatar} className={classes.large} />
      </CardActionArea>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps, null)(AvatarComponent);
