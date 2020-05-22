import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Link from "next/link";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import ListApprovedPost from "../Post/ListApprovedPostComponent";
import ListPendingPost from "../Post/ListPendingPostComponent";
import ListRejectedPost from "../Post/ListRejectedPostComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  hr: {
    width: "80%",
  },
  cardImage: {
    borderRadius: 5,
    width: "90%",
    height: "13rem",
    "@media (min-width:600px)": {
      height: "9rem",
    },
    [theme.breakpoints.up("md")]: {
      height: "13rem",
    },
  },
  cardItem: {
    width: "30%",
    margin: "2% 1% 1% 2%",
    "& p": {
      textAlign: "start",
    },
  },
  title: {
    paddingTop: "1rem",
    display: "inline-flex",
    fontSize: "1.6rem",
    "@media (min-width:600px)": {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.6rem",
    },
  },
  icon: {
    fontSize: "2.5rem",
    marginBottom: "-0.5rem",
    marginLeft: theme.spacing(1),

    "@media (min-width:600px)": {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.5rem",
    },
  },
  link: {
    "&:visited": {
      color: "inherit",
    },
  },
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
  postTitle: {
    fontSize: "1.3rem",
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.3rem",
    },
  },
  description: {
    "@media (min-width:600px)": {
      fontSize: "0.8rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "0.875rem",
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export const UserPostComponent = ({ user }) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = React.useState("approved");

  return (
    <div>
      <Paper className={classes.root}>
        <h1 className={classes.title}>{user.fullname}'s Post</h1>
        <Link href="/write-post">
          <a className={classes.link}>
            <PostAddIcon className={classes.icon} />
          </a>
        </Link>
        <hr className={classes.hr} />
        <div>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab value="approved" label="Approved Post" />
            <Tab value="pending" label="Pending Post" />
            <Tab value="rejected" label="Rejected Post" />
          </Tabs>
          <TabPanel value={value} index="approved">
            <ListApprovedPost />
          </TabPanel>
          <TabPanel value={value} index="pending">
            <ListPendingPost />
          </TabPanel>
          <TabPanel value={value} index="rejected">
            <ListRejectedPost />
          </TabPanel>
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps, null)(UserPostComponent);
