import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "next/link";

import { fetchData } from "../../libs/fetchData";
import { ListItem } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    backgroundColor: "#4fd9ff",
    padding: "1px",
    lineHeight: 1
  },
  item: {
    lineHeight: "1.3",
    paddingTop: "4px"
  },
  link: {
    textDecoration: "none",
    color: "black",
    "&:visited": {
      color: "inherit"
    }
  },
  div: {
    width: "85%",
    textAlign: "center"
  }
});

function Nav() {
  const classes = useStyles();
  const [activity, setActivity] = useState([]);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchData("http://localhost:4000/activity/get-activity").then(res => {
      setActivity(
        res.data.map(item => {
          return {
            id: item._id,
            name: item.activity_name
          };
        })
      );
    });
  }, []);

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} variant="h6" component="h6">
        <ListItem button onClick={handleClick}>
          <div className={classes.div}>Activity</div>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Typography>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <MenuList selected="0">
          <MenuItem className={classes.item}>
            <Link href="/">
              <span>Home</span>
            </Link>
          </MenuItem>
          {activity.map(item => {
            return (
              <MenuItem key={item.id} className={classes.item}>
                <Link href={`/activity/${item.name.toLowerCase()}`}>
                  <span>{item.name}</span>
                </Link>
              </MenuItem>
            );
          })}
        </MenuList>
      </Collapse>
    </Card>
  );
}

export default Nav;
