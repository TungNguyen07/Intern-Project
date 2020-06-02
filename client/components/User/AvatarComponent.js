import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import CardActionArea from "@material-ui/core/CardActionArea";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { bindActionCreators } from "redux";

import { userActions } from "../../actions/userActions";
import MessageDialog from "../Dialog/MessageDialogComponent";

const useStyles = makeStyles((theme) => ({
  large: {
    width: "12rem",
    height: "12rem",
    "@media (min-width:600px)": {
      width: "9rem",
      height: "9rem",
    },
    [theme.breakpoints.up("md")]: {
      width: "12rem",
      height: "12rem",
    },
  },
  card: {
    borderRadius: "50%",
    width: "12rem",
    height: "12rem",
    marginTop: "2%",
    marginLeft: "15%",
    "@media (min-width:600px)": {
      width: "9rem",
      height: "9rem",
    },
    [theme.breakpoints.up("md")]: {
      width: "12rem",
      height: "12rem",
    },
  },
  reviewAvatar: {
    width: "12rem",
    height: "12rem",
    margin: "auto",
  },
  button: {
    display: "flex",
    margin: "auto",
  },
  input: {
    width: "100%",
    height: "100%",
    opacity: 0,
    position: "absolute",
  },
}));

export const AvatarComponent = ({ user, updateAvatar }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);
  const [display, setDisplay] = useState(false);
  const [mainAvatar, setMainAvatar] = useState(user.avatar);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAvatar(user.avatar);
  };

  function base64(files, callback) {
    var file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      var dataUrl = reader.result;
      callback(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  const onDrop = (event) => {
    base64(event.target.files, function (data) {
      setAvatar(data);
    });
  };

  const handleSave = () => {
    const info = { ...user, avatar: avatar };
    setMainAvatar(avatar);
    updateAvatar(info);
    handleClose();
    setDisplay(true);
  };

  useEffect(() => {
    setAvatar(user.avatar);
  }, [user]);

  return (
    <React.Fragment>
      <CardActionArea className={classes.card} onClick={handleOpen}>
        <Avatar alt="image" src={mainAvatar} className={classes.large} />
      </CardActionArea>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Edit Personal Avatar</DialogTitle>
        <DialogContent>
          <Avatar className={classes.reviewAvatar} src={avatar} />
          <Button className={classes.button}>
            <input
              type="file"
              className={classes.input}
              accept=".png, .jpg, .jpeg"
              multiple={false}
              onChange={onDrop}
            />
            <CameraAltIcon />
            <p> Upload your new Avatar</p>
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {display && (
        <MessageDialog
          setError={setDisplay}
          message={["Update avatar successfully!"]}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { user: state.userReducer.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAvatar: bindActionCreators(userActions.updateAvatar, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AvatarComponent);
