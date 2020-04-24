import React from "react";
import { Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import ContactComponent from "./ContactComponent";

const useStyles = makeStyles({
  root: {
    color: "black",
  },
  title: {
    fontSize: "2rem",
  },
  hr: {
    width: "80%",
  },
  img: {
    maxWidth: "100%",
    marginBottom: "1rem",
  },
  info: {
    textAlign: "start",
    marginLeft: "10%",
    lineHeight: "0.8rem",
    maxWidth: "80%",
  },
});

const AboutComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        Long Xuyen City Cultural and Sports Center
      </Typography>
      <hr className={classes.hr} />
      <img
        className={classes.img}
        src="https://f5.photo.talk.zdn.vn/6012041281084429359/7b89ad51a70e5d50041f.jpg"
      />
      <div className={classes.info}>
        <Typography>
          Long Xuyen City Cultural and Sports Center was established on
          September 27, 2017
        </Typography>
        <Typography>
          Address: 268, Nguyen Truong To, Binh Khanh Ward, Long Xuyen City, An
          Giang
        </Typography>
        <Typography>Phone: 0296 - 384 - 1732</Typography>
        <Typography>
          Email:{" "}
          <a href="mailto:ttvhtt.longxuyen@angiang.gov.vn">
            ttvhtt.longxuyen@angiang.gov.vn
          </a>
        </Typography>
        <Typography>Tax code: 1602050948</Typography>
        <ContactComponent />
      </div>
    </div>
  );
};

export default AboutComponent;