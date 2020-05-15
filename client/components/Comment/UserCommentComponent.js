import { Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ReplyForm from "./ReplyFormComponent";
import UserReply from "./UserReplyComponent";
import { useState, useEffect } from "react";
import { postData } from "../../libs/postData";
import { titleToURL } from "../../libs/changeTitleToURL";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

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
    color: "blue",
    "&:hover, &:focus": {
      cursor: "pointer",
    },
  },
  displayForm: {
    display: "flex",
  },
  hideForm: {
    display: "none",
  },
  moreReplies: {
    paddingLeft: "15%",
    paddingTop: "1rem",
    textDecoration: "underline",
    color: "blue",
    "& a": {
      "&:hover, &:focus": {
        cursor: "pointer",
      },
    },
  },
});

const UserCommment = ({ comment }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [reply, setReply] = useState(
    comment.reply.sort((item1, item2) => {
      return new Date(item2.created_at) - new Date(item1.created_at);
    })
  );
  const [shorcut, setShortcut] = useState(reply.slice(0, 3));

  useEffect(() => {
    if (reply) setShortcut(reply.slice(0, 3));
  }, [reply]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleReply = (info) => {
    setOpen(false);
    setReply(
      [...reply, info].sort((item1, item2) => {
        return new Date(item2.created_at) - new Date(item1.created_at);
      })
    );
    postData(`${SERVER_URL}/comment/post-reply`, info).then((res) => {
      console.log(res);
    });
  };

  const handleMoreReplies = () => {
    const length = shorcut.length + 3;
    setShortcut(reply.slice(0, length));
  };

  useEffect(() => {
    if (comment) setReply(comment.reply);
  }, [comment]);

  return (
    <div className={classes.root}>
      <div className={classes.commentBlock}>
        <Avatar>
          <p>{titleToURL(comment.owner.charAt(0)).toUpperCase()}</p>
        </Avatar>
        <Typography className={classes.name} variant="h6">
          {comment.owner}
        </Typography>
        <Typography className={classes.comment}>{comment.comment}</Typography>
      </div>
      <div className={classes.infoBlock}>
        <a onClick={handleOpen} className={classes.reply}>
          Reply
        </a>
        <Typography>{new Date(comment.created_at).toLocaleString()}</Typography>
      </div>

      {shorcut.length ? (
        shorcut.map((item, index) => {
          return <UserReply key={index} replyItem={item} />;
        })
      ) : (
        <div />
      )}
      {shorcut.length < reply.length ? (
        <div className={classes.moreReplies}>
          <a onClick={handleMoreReplies}>
            Show {reply.length - shorcut.length} replies
          </a>
        </div>
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
