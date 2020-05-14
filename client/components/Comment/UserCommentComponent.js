import { Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ReplyForm from "./ReplyFormComponent";
import UserReply from "./UserReplyComponent";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  root: {
    marginBottom: "1rem",
  },
  commentBlock: {
    display: "flex",
    marginLeft: "3rem",
  },
  comment: {
    paddingTop: "0.35rem",
    paddingLeft: "0.5rem",
  },
  name: {
    marginLeft: "0.5rem",
  },
  infoBlock: {
    display: "flex",
    marginLeft: "5rem",
  },
  reply: {
    marginRight: "1.5rem",
    marginLeft: "1.5rem",
    "&:hover, &:focus": {
      cursor: "pointer",
      color: "blue",
    },
  },
  displayForm: {
    display: "flex",
  },
  hideForm: {
    display: "none",
  },
});

const UserCommment = ({ comment }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [reply, setReply] = useState(comment.reply);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleReply = (info) => {
    setOpen(false);
    setReply([...reply, info]);
  };

  return (
    <div className={classes.root}>
      <div className={classes.commentBlock}>
        <Avatar>
          <p>{comment.owner.charAt(0).toUpperCase()}</p>
        </Avatar>
        <Typography className={classes.name} variant="h6">
          {comment.owner}
        </Typography>
        <Typography className={classes.comment}>{comment.text}</Typography>
      </div>
      <div className={classes.infoBlock}>
        <a onClick={handleOpen} className={classes.reply}>
          Reply
        </a>
        <Typography>{comment.created_at}</Typography>
      </div>

      {reply.length ? (
        reply.map((item, index) => {
          return <UserReply key={index} replyItem={item} />;
        })
      ) : (
        <div />
      )}

      <div className={open ? classes.displayForm : classes.hideForm}>
        <ReplyForm action={handleReply} cmtId={comment._id} />
      </div>
    </div>
  );
};

export default UserCommment;
