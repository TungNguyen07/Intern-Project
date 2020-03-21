import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { userActions } from "../../actions/userActions";

const useStyles = makeStyles({
  title: {
    backgroundColor: "#4fd9ff",
    padding: "5px"
  },
  profile: {
    marginTop: "0px"
  },
  item: {
    lineHeight: "1.3",
    paddingTop: "4px"
  },
  link: {
    textDecoration: "none",
    "&:visited": {
      color: "inherit"
    }
  }
});

export const ProfileNav = ({ user, Signout }) => {
  const classes = useStyles();

  const signout = () => {
    Signout();
  };

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <Card>
      <CardContent className={classes.title}>
        <Typography variant="h6" component="h6" className={classes.profile}>
          {user.fullname}
        </Typography>
      </CardContent>
      <MenuList tabIndex="-1">
        <MenuItem className={classes.item}>
          <Link href="/profile">
            <span>Profile</span>
          </Link>
        </MenuItem>

        <MenuItem className={classes.item}>
          <Link href="/change-password">
            <span>Change Password</span>
          </Link>
        </MenuItem>

        <MenuItem className={classes.item}>
          <Link href="/create-post">
            <span>Write post</span>
          </Link>
        </MenuItem>

        {/* <MenuItem className={classes.item}>
          <Link href="/create-post">Write post</Link>
        </MenuItem> */}

        {user.role == 1 && (
          <MenuItem className={classes.item}>
            <Link href="/admin">
              <span>Dashboard</span>
            </Link>
          </MenuItem>
        )}

        <MenuItem className={classes.item} onClick={signout}>
          Logout
        </MenuItem>
      </MenuList>
    </Card>
  );
};

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

const mapDispatchToProps = dispatch => {
  return { Signout: bindActionCreators(userActions.Signout, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNav);
