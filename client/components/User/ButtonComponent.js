import React from "react";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: "3rem"
  }
}));

const ButtonComponent = () => {
  const classes = useStyles();
  return (
    <div>
      <Tooltip title="Home">
        <IconButton color="primary" aria-label="Home" component="span">
          <Link href="/">
            <HomeIcon className={classes.icon} />
          </Link>
        </IconButton>
      </Tooltip>
      <Tooltip title="Save">
        <IconButton color="primary" aria-label="Home" component="span">
          <SaveIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton color="primary" aria-label="Home" component="span">
          <EditIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ButtonComponent;
