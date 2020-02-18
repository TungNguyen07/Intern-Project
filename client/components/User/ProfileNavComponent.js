import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

const useStyles = makeStyles({
  root: {},
  title: {
    backgroundColor: "#4fd9ff"
  }
});

function ProfileNav() {
  const classes = useStyles();
  const [user, setUser] = useState({});
  return (
    <Card className={classes.root}>
      <CardContent className={classes.title}>
        <Typography variant="h5" component="h2">
          Abc
        </Typography>
      </CardContent>
      <MenuList selected="2">
        <MenuItem>Profile</MenuItem>
        <MenuItem>Change Password</MenuItem>
        <MenuItem>Write post</MenuItem>
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Card>
  );
}

export default ProfileNav;
