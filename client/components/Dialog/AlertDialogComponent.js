import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  title: {
    display: "flex",
    color: "black",
    fontSize: "1rem",
  },
});

const AlertDialog = ({ message, btnOK, setDisplay, expectedResult }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setDisplay(false);
  };

  useEffect(() => {
    setOpen(true);
  }, [message]);

  const handleOK = () => {
    btnOK(expectedResult);
    setOpen(false);
    setDisplay(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Alert dialog"}</DialogTitle>
        <DialogContent>
          <div
            className={classes.title}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOK} color="primary">
            OK
          </Button>
          <Button onClick={handleClose} color="secondary">
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
