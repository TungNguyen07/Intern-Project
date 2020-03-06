import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import EditInfoComponent from "./EditInfoComponent";

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

export const InfoComponent = props => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h3" className={classes.fullname}>
          {props.fullname}
        </Typography>
        <EditInfoComponent />
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
            {parseInt(props.gender) ? "Male" : "Female"}
          </Typography>
          <Typography variant="subtitle1">{props.birth_date}</Typography>
          <Typography variant="subtitle1">{props.phone_number}</Typography>
          <Typography variant="subtitle1">{props.email}</Typography>
          <Typography variant="subtitle1">{props.address}</Typography>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userReducer
  };
};

export default connect(mapStateToProps, null)(InfoComponent);
