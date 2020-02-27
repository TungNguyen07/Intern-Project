import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Link from "next/link";

const useStyles = makeStyles({
  title: {
    backgroundColor: "#4fd9ff",
    padding: "5px"
  },
  link: {
    textDecoration: "none",
    "&:visited": {
      color: "inherit"
    }
  }
});

function ProfileNav() {
  const classes = useStyles();
  const [user, setUser] = useState({});
  return (
    <Card>
      <CardContent className={classes.title}>
        <Typography variant="h6" component="h6">
          Abc
        </Typography>
      </CardContent>
      <MenuList tabIndex="-1">
        <MenuItem>
          <a className={classes.link} href="/profile">
            <span>Profile</span>
          </a>
        </MenuItem>

        <MenuItem>
          <a className={classes.link} href="#">
            <span>Change Password</span>
          </a>
        </MenuItem>

        <MenuItem>
          <a className={classes.link} href="/create-post">
            <span>Write post</span>
          </a>
        </MenuItem>

        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Card>
  );
}

export default ProfileNav;
