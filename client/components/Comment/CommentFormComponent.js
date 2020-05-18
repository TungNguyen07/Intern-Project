import React, { useState, useEffect } from "react";
import {
  TextField,
  TextareaAutosize,
  makeStyles,
  Button,
} from "@material-ui/core";
import Router from "next/router";
import Link from "next/link";

import MessageDialog from "../Dialog/MessageDialogComponent";

const useStyles = makeStyles({
  root: {
    display: "grid",
    marginLeft: "5%",
    width: "90%",
    marginBottom: "0rem",
    marginTop: "0.5rem",
    paddingBottom: "0.5rem",
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

const CommentForm = ({ action }) => {
  const classes = useStyles();
  const initInfo = {
    owner: "",
    comment: "",
    email: "",
    created_at: "",
    reply: [],
  };
  const [info, setInfo] = useState(initInfo);
  const [display, setDisplay] = useState(false);
  const [notify, setNotify] = useState([]);
  const [post_id, setPost_id] = useState("");

  useEffect(() => {
    const id = Router.asPath.split("-").pop();
    setPost_id(id);
  }, []);

  const handleCancel = () => {
    setInfo(initInfo);
  };

  const handleChange = (prop) => (event) => {
    setInfo({ ...info, [prop]: event.target.value });
  };

  const handleSave = () => {
    validate(info)
      ? (action({
          ...info,
          created_at: new Date().toISOString(),
          post_id: post_id,
          url: window.location.href,
        }),
        setInfo(initInfo))
      : setDisplay(true);
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
    if (checkInfo.comment.trim() == "" || checkInfo.comment.trim() == undefined)
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
        value={info.comment}
        onChange={handleChange("comment")}
      />
      <div className={classes.buttonForm}>
        <Button
          className={classes.commentButton}
          variant="contained"
          type="button"
          color="primary"
          onClick={handleSave}
        >
          Comment
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

export default CommentForm;
