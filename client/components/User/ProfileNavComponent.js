import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Link from "next/link";

const useStyles = makeStyles({
  root: {},
  title: {
    backgroundColor: "#4fd9ff",
    padding: "5px"
  }
});

function ProfileNav() {
  const classes = useStyles();
  const [user, setUser] = useState({});
  return (
    <Card className={classes.root}>
      <CardContent className={classes.title}>
        <Typography variant="h6" component="h6">
          Abc
        </Typography>
      </CardContent>
      <MenuList>
        <Link href="/profile">
          <MenuItem>Profile</MenuItem>
        </Link>
        <MenuItem>Change Password</MenuItem>
        <Link href="/create-post">
          <MenuItem>Write post</MenuItem>
        </Link>
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Card>
  );
}

export default ProfileNav;
