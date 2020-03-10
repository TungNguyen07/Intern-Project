import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { userActions } from "../../actions/userActions";
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

export const InfoComponent = ({ user }) => {
  const classes = useStyles();

  useEffect(() => {
    console.log("info", user);
  }, []);

  return (
    <div>
      {user && (
        <div>
          <div className={classes.root}>
            <Typography variant="h3" className={classes.fullname}>
              {user.fullname}
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
                {parseInt(user.gender) ? "Male" : "Female"}
              </Typography>
              <Typography variant="subtitle1">
                {new Date(user.birth_date).toLocaleDateString()}
              </Typography>
              <Typography variant="subtitle1">{user.phone_number}</Typography>
              <Typography variant="subtitle1">{user.email}</Typography>
              <Typography variant="subtitle1">{user.address}</Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// const mapStateToProps = state => {
//   return { user: state.userReducer.user };
// };

// export default connect(mapStateToProps, null)(InfoComponent);
