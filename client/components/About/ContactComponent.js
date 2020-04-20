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

import MessageDialog from "../Dialog/MessageDialogComponent";

const useStyles = makeStyles({
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
});

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
  const [notify, setNotify] = useState([]);

  const handleChange = (prop) => (event) => {
    setContactInfo({ ...contactInfo, [prop]: event.target.value });
  };

  const handleSend = () => {
    setNotify(["Send feedback successfully!"]);
    setDisplay(true);
  };

  const handleCancel = () => {
    setContactInfo(initInfo);
  };

  useEffect(() => {
    if (!display) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [display]);

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
              onClick={handleSend}
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
      {display && <MessageDialog setError={setDisplay} message={notify} />}
    </div>
  );
};

export default ContactComponent;
