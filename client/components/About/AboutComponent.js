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
      {/* <img
        className={classes.img}
        src="http://res.cloudinary.com/djy0l9bwl/image/upload/v1589869374/dh-tdtt-lan-thu-iv_r7cdrt.jpg"
      /> */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1841.1247571422055!2d105.41922958258006!3d10.394341319031966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a73b551bd0a4d%3A0x1400eb82d482ff11!2zVHJ1bmcgdMOibSBWxINuIGjDs2EgLSBUaOG7gyB0aGFvIHRow6BuaCBwaOG7kSBMb25nIFh1ecOqbg!5e0!3m2!1svi!2s!4v1590037974003!5m2!1svi!2s"
        width="600"
        height="450"
        aria-hidden="false"
        tabindex="0"
      ></iframe>
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
