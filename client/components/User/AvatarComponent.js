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
import CardMedia from "@material-ui/core/CardMedia";

import { userActions } from "../../actions/userActions";

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(21),
    height: theme.spacing(21)
    // marginTop: "2%",
    // marginLeft: "15%"
  },
  card: {
    borderRadius: "50%",
    width: theme.spacing(21),
    height: theme.spacing(21),
    marginTop: "2%",
    marginLeft: "15%"
  },
  reviewAvatar: {
    width: theme.spacing(21),
    height: theme.spacing(21),
    margin: "auto"
  },
  button: {
    display: "flex",
    margin: "auto"
  },
  input: {
    width: "100%",
    height: "100%",
    opacity: 0,
    position: "absolute"
  }
}));

export const AvatarComponent = ({ user, update }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);

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

  const onDrop = event => {
    base64(event.target.files, function(data) {
      setAvatar(data);
    });
  };

  const handleSave = () => {
    const info = { ...user, avatar: avatar };
    update(info);
    handleClose();
  };

  useEffect(() => {
    setAvatar(user.avatar);
  }, [user]);

  return (
    <React.Fragment>
      <CardActionArea className={classes.card} onClick={handleOpen}>
        <Avatar alt="image" src={user.avatar} className={classes.large} />
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

const mapDispatchToProps = dispatch => {
  return { update: bindActionCreators(userActions.updateInfo, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(AvatarComponent);
