import React, { useState } from "react";
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

const EditInfoComponent = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [gender, setValue] = useState(props.info.gender);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(gender);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date("2020-02-20T21:11:54")
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleChange = event => {
    setValue(event.target.value);
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
              value={props.info.fullname}
              required
            />
            <div className={classes.gender}>
              <FormLabel className={classes.genderTitle}>Gender</FormLabel>
              <RadioGroup
                className={classes.genderGroup}
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={handleChange}
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
                id="birth-date"
                label="Birth-date"
                format="MM/dd/yyyy"
                value={selectedDate}
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
              value={props.info.email}
              required
            />
            <TextField
              className={classes.infoItem}
              id="phone"
              label="Phone"
              variant="outlined"
              value={props.info.phone_number}
              required
            />
            <TextField
              className={classes.infoItem}
              id="address"
              label="Address"
              variant="outlined"
              value={props.info.address}
              required
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditInfoComponent;
