import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

const useStyles = makeStyles({
  root: {},
  title: {
    backgroundColor: "#4fd9ff",
    padding: "5px"
  }
});

function Nav() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.title}>
        <Typography variant="h6" component="h6">
          Activity
        </Typography>
      </CardContent>
      <MenuList selected="2">
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Card>
  );
}

export default Nav;
