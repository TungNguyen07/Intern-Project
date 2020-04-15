import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { fetchData } from "../../libs/fetchData";
const { SERVER_URL } = process.env;

const useStyles = makeStyles({
  description: {
    textAlign: "start",
    fontWeight: "bold",
    padding: "0px 16px 0px 16px",
  },
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
  content: {
    padding: 15,
    "& p": {
      textAlign: "start",
    },
    "& img": {
      margin: "auto",
      display: "flex",
      maxWidth: "100%",
    },
  },
});

const PreviewPostComponent = ({ rowData, isOpen, isClose }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({});
  const [fetching, setFetching] = useState(true);

  const handleClose = () => {
    setOpen(false);
    isClose(false);
  };

  useEffect(() => {
    let unmounted = false;
    if (rowData._id) {
      fetchData(`${SERVER_URL}/post/get-post/${rowData._id}`)
        .then((res) => {
          if (!unmounted) {
            setPost(res.data);
            setFetching(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      unmounted = true;
    };
  }, [rowData]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return fetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <Dialog maxWidth="md" open={open} onClose={handleClose} scroll="paper">
        <DialogTitle>Preview</DialogTitle>
        <DialogContent dividers={true}>
          <Typography variant="h5">{post.title}</Typography>
          <p className={classes.description}>{post.description}</p>
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Approve
          </Button>
          <Button onClick={handleClose} color="primary">
            Refuse
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default PreviewPostComponent;
