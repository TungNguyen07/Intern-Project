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

export const EditInfoComponent = ({ user, update }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(user);

  useEffect(() => {
    console.log("info", info);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = date => {
    setInfo({ ...info, birth_date: date.toISOString() });
  };

  const handleChange = prop => event => {
    setInfo({ ...info, [prop]: event.target.value });
  };

  const handleSave = () => {
    update(info);
    handleClose();
  };

  return (
    <React.Fragment>
      <Tooltip title="Edit">
        <IconButton
          color="primary"
          aria-label="Edit"
          component="span"
          className={classes.button}
          onClick={handleClickOpen}
        >
          <EditIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
        <DialogTitle id="form-dialog-title">
          Edit Personal Infomation
        </DialogTitle>
        <DialogContent>
          <FormControl id="info" className={classes.form}>
            <TextField
              className={classes.infoItem}
              id="fullname"
              label="Fullname"
              variant="outlined"
              value={info.fullname}
              required
              onChange={handleChange("fullname")}
            />
            <div className={classes.gender}>
              <FormLabel className={classes.genderTitle}>Gender</FormLabel>
              <RadioGroup
                className={classes.genderGroup}
                aria-label="gender"
                name="gender"
                value={info.gender}
                onChange={handleChange("gender")}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio className={classes.radio} />}
                  label="Female"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio className={classes.radio} />}
                  label="Male"
                />
              </RadioGroup>
            </div>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                className={classes.datePicker}
                variant="outlined"
                id="birth_date"
                label="birth_date"
                format="MM/dd/yyyy"
                value={info.birth_date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              className={classes.infoItem}
              id="email"
              label="Email"
              variant="outlined"
              value={info.email}
              required
              onChange={handleChange("email")}
            />
            <TextField
              className={classes.infoItem}
              id="phone"
              label="Phone"
              variant="outlined"
              value={info.phone_number}
              required
              onChange={handleChange("phone_number")}
            />
            <TextField
              className={classes.infoItem}
              id="address"
              label="Address"
              variant="outlined"
              value={info.address}
              required
              onChange={handleChange("address")}
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

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

const mapDispatchToProps = dispatch => {
  return {
    update: bindActionCreators(userActions.updateInfo, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInfoComponent);
