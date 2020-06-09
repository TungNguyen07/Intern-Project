import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import ListItem from "@material-ui/core/ListItem";
import Link from "next/link";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

import { fetchData } from "../../libs/fetchData";
import { activityActions } from "../../actions/activityActions";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: "#4fd9ff",
    padding: "1px",
    lineHeight: 1,
    fontSize: "1.25rem",
    "@media (min-width:600px)": {
      fontSize: "0.875rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.25rem",
    },
  },
  item: {
    lineHeight: "1.3",
    paddingTop: "4px",
    fontSize: "1rem",
    "@media (min-width:600px)": {
      fontSize: "0.750rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  },
  div: {
    width: "85%",
    textAlign: "center",
  },
  button: {
    padding: "8px 16px 8px 16px",
  },
}));

const Nav = ({ activeActivity }) => {
  const classes = useStyles();
  const [activity, setActivity] = useState([]);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let unmouted = false;
    fetchData(`${SERVER_URL}/activity/get-activity`).then((res) => {
      if (!unmouted) {
        setActivity(
          res.data.map((item) => {
            return {
              id: item._id,
              name: item.activity_name,
            };
          })
        );
      }
    });
    return () => {
      unmouted = true;
    };
  }, []);

  const dispatchActivity = (activity_id) => {
    activeActivity(activity_id);
  };

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} variant="h6" component="h6">
        <ListItem className={classes.button} button onClick={handleClick}>
          <div className={classes.div}>Hoạt động</div>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Typography>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <MenuList selected="0">
          <MenuItem className={classes.item}>
            <Link href="/">
              <span>Trang chủ</span>
            </Link>
          </MenuItem>
          {activity.map((item) => {
            return (
              <MenuItem
                key={item.id}
                className={classes.item}
                onClick={() => dispatchActivity(item.id)}
              >
                <Link
                  href={`/activity/[activity_name]`}
                  as={`/activity/${item.name.toLowerCase()}`}
                >
                  <span>{item.name}</span>
                </Link>
              </MenuItem>
            );
          })}
          <MenuItem className={classes.item}>
            <Link href="/about">
              <span>Giới thiệu</span>
            </Link>
          </MenuItem>
        </MenuList>
      </Collapse>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    activeActivity: bindActionCreators(activityActions.setActivity, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Nav);
