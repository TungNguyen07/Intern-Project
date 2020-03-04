import React, { useState, useEffect, useReducer, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import EditInfoComponent from "./EditInfoComponent";
import { UserContext } from "../../contexts/userContext";

const useStyles = makeStyles(theme => ({
  fullname: {
    marginLeft: "5rem",
    marginBottom: "1rem"
  },
  otherInfo: {
    textAlign: "left",
    marginLeft: "5rem",
    marginBottom: "1rem"
  },
  groupInfo: {
    display: "flex"
  },
  displayInfo: {
    marginLeft: "3rem",
    textAlign: "left"
  },
  root: {
    display: "flex"
  }
}));

const InfoComponent = props => {
  const classes = useStyles();
  // const [user, dispatch] = useReducer(UserContext);

  useEffect(() => {
    console.log(props.user);
  }, []);

  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h3" className={classes.fullname}>
          {props.user.fullname}
        </Typography>
        <EditInfoComponent info={props.user} />
      </div>

      <div className={classes.groupInfo}>
        <div className={classes.otherInfo}>
          <Typography variant="subtitle1">Gender: </Typography>
          <Typography variant="subtitle1">Birthday: </Typography>
          <Typography variant="subtitle1">Phone: </Typography>
          <Typography variant="subtitle1">Email: </Typography>
          <Typography variant="subtitle1">Address: </Typography>
        </div>
        <div className={classes.displayInfo}>
          <Typography variant="subtitle1">
            {parseInt(props.user.gender) ? "Male" : "Female"}
          </Typography>
          <Typography variant="subtitle1">{props.user.birth_date}</Typography>
          <Typography variant="subtitle1">{props.user.phone_number}</Typography>
          <Typography variant="subtitle1">{props.user.email}</Typography>
          <Typography variant="subtitle1">{props.user.address}</Typography>
        </div>
      </div>
    </div>
  );
};

export default InfoComponent;
