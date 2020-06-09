import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { userActions } from "../../actions/userActions";

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
  link: {
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
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

export const ProfileNav = ({ user, Signout }) => {
  const classes = useStyles();

  const signout = () => {
    Signout();
  };

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card>
      <Typography variant="h6" component="h6" className={classes.title}>
        <ListItem className={classes.button} button onClick={handleClick}>
          <div className={classes.div}>{user.fullname}</div>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Typography>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <MenuList tabIndex="-1">
          <Link href="/profile">
            <MenuItem className={classes.item}>
              <span>Cá nhân</span>
            </MenuItem>
          </Link>

          <Link href="/change-password">
            <MenuItem className={classes.item}>
              <span>Đổi mật khẩu</span>
            </MenuItem>
          </Link>

          <Link href="/write-post">
            <MenuItem className={classes.item}>
              <span>Viết bài viết</span>
            </MenuItem>
          </Link>

          {/* <MenuItem className={classes.item}>
            <Link href="/write-post">Write post</Link>
          </MenuItem> */}

          {user.role == 1 && (
            <Link href="/admin">
              <MenuItem className={classes.item}>
                <span>Dashboard</span>
              </MenuItem>
            </Link>
          )}

          <MenuItem className={classes.item} onClick={signout}>
            Đăng xuất
          </MenuItem>
        </MenuList>
      </Collapse>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return { user: state.userReducer.user };
};

const mapDispatchToProps = (dispatch) => {
  return { Signout: bindActionCreators(userActions.Signout, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNav);
