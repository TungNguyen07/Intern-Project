import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import EditInfoComponent from "./EditInfoComponent";

const useStyles = makeStyles(theme => ({
  fullname: {
    marginLeft: "5rem",
    marginBottom: "1rem"
  },
  otherInfo: {
    textAlign: "left",
    marginLeft: "5rem",
    marginBottom: "1rem"
  },
  groupInfo: {
    display: "flex"
  },
  displayInfo: {
    marginLeft: "3rem",
    textAlign: "left"
  },
  root: {
    display: "flex"
  }
}));

const InfoComponent = props => {
  const classes = useStyles();
  const [info, setInfo] = useState({
    fullname: "Nguyễn Sơn Tùng",
    gender: "1",
    phone_number: "0707071869",
    email: "nstung@gmail.com",
    birth_date: "07/07/1998",
    address: "Long Xuyên"
  });

  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h3" className={classes.fullname}>
          {info.fullname}
        </Typography>
        <EditInfoComponent info={info} />
      </div>

      <div className={classes.groupInfo}>
        <div className={classes.otherInfo}>
          <Typography variant="subtitle1">Gender: </Typography>
          <Typography variant="subtitle1">Birthday: </Typography>
          <Typography variant="subtitle1">Phone: </Typography>
          <Typography variant="subtitle1">Email: </Typography>
          <Typography variant="subtitle1">Address: </Typography>
        </div>
        <div className={classes.displayInfo}>
          <Typography variant="subtitle1">
            {parseInt(info.gender) ? "Male" : "Female"}
          </Typography>
          <Typography variant="subtitle1">{info.birth_date}</Typography>
          <Typography variant="subtitle1">{info.phone_number}</Typography>
          <Typography variant="subtitle1">{info.email}</Typography>
          <Typography variant="subtitle1">{info.address}</Typography>
        </div>
      </div>
    </div>
  );
};

export default InfoComponent;
