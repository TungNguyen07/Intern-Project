import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    height: "12rem",
    "@media (min-width:600px)": {
      height: "8rem",
    },
    [theme.breakpoints.up("md")]: {
      height: "12rem",
    },
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <img
        id="banner"
        className={classes.image}
        src="http://localhost:4000/images/top-banner.jpg"
      />
    </React.Fragment>
  );
};

export default Banner;
