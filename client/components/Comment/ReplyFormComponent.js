import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  TextareaAutosize,
  makeStyles,
  Button,
} from "@material-ui/core";

import MessageDialog from "../Dialog/MessageDialogComponent";

const useStyles = makeStyles({
  root: {
    display: "grid",
    marginLeft: "5%",
    width: "90%",
    marginBottom: "1rem",
    marginTop: "0.5rem",
  },
  name: {
    marginBottom: "0.5rem",
    width: "45%",
  },
  email: {
    marginBottom: "0.5rem",
    width: "53%",
    marginLeft: "2%",
  },
  opinion: {
    resize: "none",
    borderRadius: "4px",
    padding: "0.6rem",
    fontSize: "1.25rem",
  },
  buttonForm: {
    textAlign: "end",
    marginTop: "0.5rem",
  },
  commentButton: {
    marginRight: "1rem",
    backgroundColor: "#1976d2",
  },
  cancelButton: {
    backgroundColor: "#e53935",
    "&:hover": {
      backgroundColor: "#c62828",
    },
  },
});

const ReplyForm = ({ action, cmtId }) => {
  const classes = useStyles();
  const initInfo = {
    owner: "",
    repComment: "",
    email: "",
    created_at: "",
    cmtId: "",
  };
  const [info, setInfo] = useState(initInfo);
  const [display, setDisplay] = useState(false);
  const [notify, setNotify] = useState([]);

  const handleCancel = () => {
    setInfo(initInfo);
  };

  const handleChange = (prop) => (event) => {
    setInfo({ ...info, [prop]: event.target.value });
  };

  const handleSave = () => {
    if (validate(info)) {
      action({
        ...info,
        created_at: new Date().toISOString(),
        cmtId: cmtId,
        url: window.location.href,
      });
      setInfo(initInfo);
    } else setDisplay(true);
  };

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validate = (checkInfo) => {
    let error = [];
    if (checkInfo.owner.trim() == "" || checkInfo.owner.trim() == undefined)
      error.push("Name is required!");
    if (checkInfo.email.trim() == "" || checkInfo.email.trim() == undefined)
      error.push("Email is required!");
    else if (!validateEmail(checkInfo.email)) error.push("Invalid Email!");
    if (
      checkInfo.repComment.trim() == "" ||
      checkInfo.repComment.trim() == undefined
    )
      error.push("Content is required!");
    if (error.length) {
      setNotify(error);
      return false;
    } else {
      setNotify([]);
      return true;
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <TextField
          className={classes.name}
          label="Name"
          variant="outlined"
          value={info.owner}
          onChange={handleChange("owner")}
        />
        <TextField
          className={classes.email}
          label="Email"
          variant="outlined"
          value={info.email}
          onChange={handleChange("email")}
        />
      </div>
      <TextareaAutosize
        className={classes.opinion}
        rowsMin={3}
        placeholder="Your opinion"
        required
        value={info.repComment}
        onChange={handleChange("repComment")}
      />
      <div className={classes.buttonForm}>
        <Button
          className={classes.commentButton}
          variant="contained"
          type="button"
          color="primary"
          onClick={handleSave}
        >
          Reply
        </Button>
        <Button
          className={classes.cancelButton}
          variant="contained"
          type="button"
          color="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
      {display && <MessageDialog setError={setDisplay} message={notify} />}
    </div>
  );
};

export default ReplyForm;
