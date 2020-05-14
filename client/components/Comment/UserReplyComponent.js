import { Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CommentForm from "./CommentFormComponent";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  replyBlock: {
    display: "flex",
    marginLeft: "5rem",
    borderLeft: "solid",
    paddingLeft: "1rem",
    marginTop: "0.5rem",
  },
  reply: {
    paddingTop: "0.35rem",
    paddingLeft: "0.5rem",
  },
  name: {
    marginLeft: "0.5rem",
  },
  infoBlock: {
    display: "flex",
    marginLeft: "10rem",
  },
});

const UserReply = ({ replyItem }) => {
  const classes = useStyles();

  return (
    <div>
      {replyItem ? (
        <div>
          <div className={classes.replyBlock}>
            <Avatar>
              <p>{replyItem.owner.charAt(0).toUpperCase()}</p>
            </Avatar>
            <Typography className={classes.name} variant="h6">
              {replyItem.owner}
            </Typography>
            <Typography className={classes.reply}>
              {replyItem.repComment}
            </Typography>
          </div>
          <div className={classes.infoBlock}>
            <Typography>{replyItem.created_at}</Typography>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default UserReply;
