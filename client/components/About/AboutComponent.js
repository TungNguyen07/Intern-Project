import React from "react";
import { Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import ContactComponent from "./ContactComponent";
import PositionComponent from "./PositionComponent";
import RoleComponent from "./RoleComponent";

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
        Trung tâm Văn hóa - Thể thao thành phố Long Xuyên
      </Typography>
      <hr className={classes.hr} />
      <div className={classes.info}>
        <PositionComponent />
        <RoleComponent />
        <ContactComponent />
      </div>
    </div>
  );
};

export default AboutComponent;
