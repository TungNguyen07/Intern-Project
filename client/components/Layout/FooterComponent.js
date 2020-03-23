import React, { useState, useEffect } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    lineHeight: "70%",
    maxWidth: "90%",
    marginBottom: theme.spacing(1)
  },
  title: {
    fontWeight: "bold"
  },
  card: {
    padding: theme.spacing(1.5)
  },
  link: {
    float: "right"
  },
  grid: {
    marginLeft: "11%"
  }
}));

const Footer = () => {
  const classes = useStyles();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const access_user = JSON.parse(localStorage.getItem("access_user"));
    if (access_user) {
      if (access_user.isSignedIn) setIsSignedIn(true);
    }
  });

  return (
    <div className={classes.root}>
      <Grid className={classes.grid}>
        <Card
          className={classes.card}
          style={{ background: "linear-gradient(#a3f1ff,#03c8ff)" }}
        >
          <h2 className={classes.title}>
            CENTER FOR CULTURAL AND SPORTS IN LONG XUYEN CITY
          </h2>
          <p>
            Address: 268 Nguyen Truong To, Binh Khanh Ward, Long Xuyen City, An
            Giang
          </p>
          <p>Fax: 0123456789</p>
          <p>
            Email:{" "}
            <a href="mailto:ttvhtt.longxuyen@angiang.gov.vn">
              ttvhtt.longxuyen@angiang.gov.vn
            </a>
            {!isSignedIn && (
              <a href="/signin" className={classes.link}>
                Signin
              </a>
            )}
          </p>
        </Card>
      </Grid>
    </div>
  );
};

export default Footer;
