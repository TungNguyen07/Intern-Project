import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { userActions } from "../../actions/userActions";

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: "3rem"
  },
  button: {
    marginLeft: theme.spacing(2),
    marginTop: "-1rem"
  },
  infoItem: {
    marginBottom: theme.spacing(2)
  },
  datePicker: {
    marginBottom: theme.spacing(2),
    width: "fit-content"
  },
  gender: {
    display: "flex",
    marginBottom: theme.spacing(2)
  },
  genderGroup: {
    display: "block",
    marginLeft: theme.spacing(2)
  },
  genderTitle: {
    marginTop: theme.spacing(2) - 2
  },
  form: {
    width: "100%"
  }
}));

export const AddNewUserComponent = ({ isOpen, addUser }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    idStaff: "",
    fullname: "",
    username: ""
  });

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = prop => event => {
    setInfo({ ...info, [prop]: event.target.value });
  };

  const handleSave = () => {
    addUser(info);
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Add new user</DialogTitle>
        <DialogContent>
          <FormControl id="info" className={classes.form}>
            <TextField
              className={classes.infoItem}
              id="idStaff"
              label="Id Staff"
              variant="outlined"
              value={info.idStaff}
              required
              onChange={handleChange("idStaff")}
            />
            <TextField
              className={classes.infoItem}
              id="fullname"
              label="Fullname"
              variant="outlined"
              value={info.fullname}
              required
              onChange={handleChange("fullname")}
            />
            <TextField
              className={classes.infoItem}
              id="username"
              label="Username"
              variant="outlined"
              value={info.username}
              required
              onChange={handleChange("username")}
            />
          </FormControl>
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

const mapDispatchToProps = dispatch => {
  return {
    addUser: bindActionCreators(userActions.addUser, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(AddNewUserComponent);
