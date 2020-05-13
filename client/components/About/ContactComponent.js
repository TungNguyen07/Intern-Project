import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import DescriptionIcon from "@material-ui/icons/Description";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

import MessageDialog from "../Dialog/MessageDialogComponent";
import { postData } from "../../libs/postData";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    maxWidth: "100%",
  },
  title: {
    marginBottom: "0.5rem",
  },
  contact: {
    display: "flex",
  },
  feedback: {
    padding: "0.4rem 0rem 0.4rem 2rem",
  },
  hideIcon: {
    opacity: 0,
  },
  feedbackForm: {
    marginTop: "0.5rem",
  },
  feedbackTitle: {
    paddingLeft: "0.5rem",
  },
  sendButton: {
    marginRight: "1rem",
    backgroundColor: "#1976d2",
  },
  cancelButton: {
    backgroundColor: "#e53935",
    "&:hover": {
      backgroundColor: "#c62828",
    },
  },
  formButton: {
    marginTop: "0.2rem",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  contactUs: {
    marginTop: "0.5rem",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const ContactComponent = () => {
  const classes = useStyles();
  const initInfo = {
    fullname: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    content: "",
  };
  const [contactInfo, setContactInfo] = useState(initInfo);
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState([]);
  const [open, setOpen] = useState(false);

  const handleChange = (prop) => (event) => {
    setContactInfo({ ...contactInfo, [prop]: event.target.value });
  };

  const handleCheck = () => {
    checkValid(contactInfo) ? handleSend() : setDisplay(true);
  };

  const handleCancel = () => {
    setContactInfo(initInfo);
    setMessage([]);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSend = () => {
    handleToggle();
    postData(`${SERVER_URL}/send-feedback`, contactInfo).then((res) => {
      if (res.success) {
        setMessage(["Send feedback successfully!"]);
        handleClose();
        setDisplay(true);
        setContactInfo(initInfo);
      } else {
        setMessage(["Send feedback failed!"]);
        handleClose();
        setDisplay(true);
      }
    });
  };

  useEffect(() => {
    if (!display) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [display]);

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const checkValid = (data) => {
    let error = [];
    if (data.title.trim() == "" || data.title.length == 0)
      error.push("Title is required!");
    if (data.fullname.trim() == "" || data.fullname.length == 0)
      error.push("Fullname is required!");
    if (data.email.trim() == "" || data.email.length == 0)
      error.push("Email is required!");
    else if (!validateEmail(data.email)) error.push("Invalid Email!");
    if (data.phone.trim() == "" || data.phone.length == 0)
      error.push("Phone is required!");
    else if (isNaN(data.phone) || data.phone.length < 10)
      error.push("Invalid phone number!");
    if (data.address.trim() == "" || data.address.length == 0)
      error.push("Address is required!");
    if (data.content.trim() == "" || data.content.lengt == 0)
      error.push("Content is required!");

    if (error.length) {
      setMessage(error);
      return false;
    } else {
      setMessage([]);
      return true;
    }
  };

  return (
    <div>
      <Typography className={classes.title} variant="h4">
        Contact
      </Typography>
      <Typography>
        In order to continuously improve the quality of the service and better
        meet the requirements of our listeners, we look forward to receiving
        feedback. If you have any questions or contributions, please contact us
        at the information below. We will respond to you as soon as possible.
      </Typography>
      <div className={classes.contact}>
        <Grid item xs={5} style={{ lineHeight: "1.25rem" }}>
          <Typography className={classes.contactUs} variant="h6">
            Contact us
          </Typography>
          <p>
            Address: 268, Nguyen Truong To, Binh Khanh Ward, Long Xuyen City, An
            Giang
          </p>
          <p>Phone: 0296 - 384 - 1732</p>
          <p>
            Email:{" "}
            <a href="mailto:ttvhtt.longxuyen@angiang.gov.vn">
              ttvhtt.longxuyen@angiang.gov.vn
            </a>
          </p>
          <p>Vice President's phone: 091 - 907 - 2240</p>
        </Grid>
        <Grid className={classes.feedbackForm} item xs={7}>
          <Typography className={classes.feedbackTitle} variant="h6">
            Send feedback
          </Typography>
          <div className={classes.feedback}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <DescriptionIcon />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  value={contactInfo.title}
                  className={classes.input}
                  label="Title"
                  required
                  onChange={handleChange("title")}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  value={contactInfo.fullname}
                  className={classes.input}
                  label="Fullname"
                  required
                  onChange={handleChange("fullname")}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <EmailIcon />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  value={contactInfo.email}
                  className={classes.input}
                  label="Email"
                  required
                  onChange={handleChange("email")}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <PhoneIcon />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  value={contactInfo.phone}
                  className={classes.input}
                  label="Phone"
                  required
                  onChange={handleChange("phone")}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <HomeIcon />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  value={contactInfo.address}
                  className={classes.input}
                  label="Address"
                  required
                  onChange={handleChange("address")}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <HomeIcon className={classes.hideIcon} />
              </Grid>
              <Grid item xs={9}>
                <TextareaAutosize
                  value={contactInfo.content}
                  className={classes.input}
                  rowsMin={3}
                  placeholder="Content"
                  required
                  onChange={handleChange("content")}
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.formButton}>
            <Button
              className={classes.sendButton}
              variant="contained"
              type="button"
              color="primary"
              onClick={handleCheck}
            >
              Send
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
        </Grid>
      </div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {display && <MessageDialog setError={setDisplay} message={message} />}
    </div>
  );
};

export default ContactComponent;
