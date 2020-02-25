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
          <Link href="/profile">
            <span>Profile</span>
          </Link>
        </MenuItem>

        <MenuItem>
          <Link href="#">
            <span>Change Password</span>
          </Link>
        </MenuItem>

        <MenuItem>
          <Link href="/create-post">
            <span>Write post</span>
          </Link>
        </MenuItem>

        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Card>
  );
}

export default ProfileNav;
