import React from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  stiky: {
    position: "fixed",
    top: 0
  }
}));

const LeftLayout = props => {
  const classes = useStyles();
  useEffect(() => {
    const leftlayout = document.getElementById("leftlayout");
    const bannerHeight = leftlayout.offsetTop;
    const condition = false;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > bannerHeight) {
        condition = true;
      } else {
        condition = false;
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  return (
    <Paper className={condition && classes.stiky} id="leftlayout">
      {props.children}
    </Paper>
  );
};

export default LeftLayout;
