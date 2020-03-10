import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Router from "next/router";

import { userActions } from "../../actions/userActions";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4)
  },

  icon: {
    fontSize: "3rem"
  },
  radio: {
    fontSize: "1em"
  },
  top: {
    display: "flex",
    marginBottom: "-1rem"
  },
  title: {
    margin: "auto",
    paddingTop: "1rem"
  },
  signout: {
    textAlign: "end"
  }
}));

export const TitleComponent = ({ user, Signout }) => {
  const classes = useStyles();

  useEffect(() => {
    console.log("user", user);
  }, []);

  const signout = () => {
    Signout();
    Router.push("/signin");
  };

  return (
    <div className={classes.top}>
      <Link href="/">
        <IconButton color="primary" aria-label="Edit" component="span">
          <ArrowBackIcon className={classes.icon} />
        </IconButton>
      </Link>
      <h1 className={classes.title}>{user.fullname}'s Profile</h1>
      <IconButton
        color="primary"
        aria-label="Edit"
        component="span"
        onClick={signout}
      >
        <ExitToAppIcon className={classes.icon} />
      </IconButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return { Signout: bindActionCreators(userActions.Signout, dispatch) };
};

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps, mapDispatchToProps)(TitleComponent);
