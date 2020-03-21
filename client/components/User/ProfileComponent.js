import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Title from "./TitleComponent";
import Avatar from "./AvatarComponent";
import { InfoComponent } from "./InfoComponent";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  hr: {
    width: "80%"
  },
  displayInfo: {
    display: "flex"
  }
}));

export const ProfileComponent = ({ user }) => {
  const classes = useStyles();

  return (
    <Paper>
      <Title />
      <br />
      <hr className={classes.hr} />
      <div className={classes.displayInfo}>
        <Avatar />
        <InfoComponent user={user} />
      </div>
    </Paper>
  );
};

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps, null)(ProfileComponent);
