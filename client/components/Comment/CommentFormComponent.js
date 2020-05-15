import React, { useState } from "react";
import {
  TextField,
  TextareaAutosize,
  makeStyles,
  Button,
} from "@material-ui/core";
import Router from "next/router";

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
  const initInfo = { owner: "", comment: "", created_at: "", reply: [] };
  const [info, setInfo] = useState(initInfo);
  const [display, setDisplay] = useState(false);
  const [notify, setNotify] = useState([]);
  const post_id = Router.query.post.split("-").slice(-1).pop();

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
        }),
        setInfo(initInfo))
      : setDisplay(true);
  };

  const validate = (checkInfo) => {
    let error = [];
    if (checkInfo.owner.trim() == "" || checkInfo.owner.trim() == undefined)
      error.push("Name is required!");
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
      <TextField
        className={classes.name}
        label="Name"
        variant="outlined"
        value={info.owner}
        onChange={handleChange("owner")}
      />
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
