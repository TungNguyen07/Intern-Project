import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Avatar from "@material-ui/core/Avatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { fetchData } from "../../libs/fetchData";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

const useStyles = makeStyles((theme) => ({
  otherInfo: {
    textAlign: "left",
    marginLeft: "5rem",
    marginBottom: "1rem",
  },
  groupInfo: {
    display: "flex",
  },
  displayInfo: {
    marginLeft: "3rem",
    textAlign: "left",
  },
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
  reviewAvatar: {
    width: theme.spacing(21),
    height: theme.spacing(21),
  },
}));

const ViewProfileComponent = ({ user, isOpen, isClose }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(isOpen);
  const [info, setInfo] = useState({});
  const [isFetching, setFetching] = useState(true);

  const handleClose = () => {
    setOpen(false);
    isClose(false);
    setInfo({});
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    let unmounted = false;
    if (user) {
      fetchData(`${SERVER_URL}/profile/${user.staff_id}`).then((res) => {
        if (!unmounted) {
          setInfo(res.data);
          setFetching(false);
        }
      });
    }
    return () => {
      unmounted = true;
    };
  }, [user]);

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
        <DialogTitle id="form-dialog-title">
          {user.fullname}'s Profile
        </DialogTitle>
        <DialogContent>
          {isFetching ? (
            <div className={classes.div}>
              <CircularProgress className={classes.loading} />
            </div>
          ) : (
            <div className={classes.groupInfo}>
              <Avatar className={classes.reviewAvatar} src={info.avatar} />
              <div className={classes.otherInfo}>
                <Typography variant="subtitle1">Staff ID: </Typography>
                <Typography variant="subtitle1">Gender: </Typography>
                <Typography variant="subtitle1">Birthday: </Typography>
                <Typography variant="subtitle1">Phone: </Typography>
                <Typography variant="subtitle1">Email: </Typography>
                <Typography variant="subtitle1">Address: </Typography>
              </div>
              <div className={classes.displayInfo}>
                <Typography variant="subtitle1">{info.staff_id}</Typography>
                <Typography variant="subtitle1">
                  {parseInt(info.gender) ? "Male" : "Female"}
                </Typography>
                <Typography variant="subtitle1">
                  {new Date(info.birth_date).toLocaleDateString()}
                </Typography>
                <Typography variant="subtitle1">{info.phone_number}</Typography>
                <Typography variant="subtitle1">{info.email}</Typography>
                <Typography variant="subtitle1">{info.address}</Typography>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ViewProfileComponent;
