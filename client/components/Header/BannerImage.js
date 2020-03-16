import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  image: {
    width: "100%"
  }
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <img
        id="banner"
        className={classes.image}
        src="../../static/images/top-banner.jpg"
      />
    </React.Fragment>
  );
};

export default Banner;
