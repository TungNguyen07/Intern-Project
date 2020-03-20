import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const MessageDialog = ({ message, setError }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  useEffect(() => {
    setOpen(true);
  }, [message]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Message dialog"}</DialogTitle>
        <DialogContent>
          {message.map(item => {
            return <DialogContentText key={item}>{item}</DialogContentText>;
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MessageDialog;
