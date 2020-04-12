import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    lineHeight: "70%",
    maxWidth: "90%",
    marginBottom: theme.spacing(1),
  },
  title: {
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1.5rem",
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
  },
  card: {
    padding: theme.spacing(1.5),
    background: "linear-gradient(#a3f1ff,#03c8ff)",
    "& p": {
      "@media (min-width:600px)": {
        fontSize: "0.6rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "0.875rem",
      },
    },
  },
  link: {
    color: "black",
    float: "right",
    textDecoration: "none",
    "& visited": {
      textDecoration: "none",
    },
  },
  grid: {
    marginLeft: "11%",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.grid}>
        <Card className={classes.card}>
          <Link href="/">
            <h2 className={classes.title}>
              CENTER FOR CULTURAL AND SPORTS IN LONG XUYEN CITY
            </h2>
          </Link>
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
            <Link href="/signin">
              <a className={classes.link}>Signin</a>
            </Link>
          </p>
        </Card>
      </Grid>
    </div>
  );
};

export default Footer;
