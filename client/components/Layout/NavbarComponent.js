import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

const useStyles = makeStyles({
  title: {
    backgroundColor: "#4fd9ff",
    padding: "5px"
  },
  item: {
    lineHeight: "1.3",
    paddingTop: "4px"
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
      <MenuList selected="0">
        <MenuItem className={classes.item}>Profile</MenuItem>
        <MenuItem className={classes.item}>My account</MenuItem>
        <MenuItem className={classes.item}>Logout</MenuItem>
      </MenuList>
    </Card>
  );
}

export default Nav;
