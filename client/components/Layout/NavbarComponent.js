import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Link from "next/link";

import { fetchData } from "../../libs/fetchData";

const useStyles = makeStyles({
  title: {
    backgroundColor: "#4fd9ff",
    padding: "5px"
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
  }
});

function Nav() {
  const classes = useStyles();
  const [activity, setActivity] = useState([]);

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
      <CardContent className={classes.title}>
        <Typography variant="h6" component="h6">
          Activity
        </Typography>
      </CardContent>
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
    </Card>
  );
}

export default Nav;
