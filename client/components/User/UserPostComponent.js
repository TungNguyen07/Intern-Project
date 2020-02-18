import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    justifyContent: "center",
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  hr: {
    width: "80%"
  },
  root: {
    marginTop: theme.spacing(4)
  },
  info: {
    display: "inline-grid",
    width: "45%"
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
    display: "block"
  }
}));

const UserPostComponent = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const [value, setValue] = useState("1");

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <h1>User Profile</h1>
        <hr className={classes.hr} />
        <Avatar
          alt="image"
          src="https://material-ui.com/static/images/avatar/1.jpg"
          className={classes.large}
        />
        <div className={classes.info}>
          <TextField
            className={classes.infoItem}
            id="fullname"
            label="Fullname"
            variant="outlined"
          />
          <div className={classes.gender}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              className={classes.genderGroup}
              aria-label="gender"
              name="gender"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value="1" control={<Radio />} label="Female" />
              <FormControlLabel value="0" control={<Radio />} label="Male" />
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
          />
          <TextField
            className={classes.infoItem}
            id="phone"
            label="Phone"
            variant="outlined"
          />
          <TextField
            className={classes.infoItem}
            id="address"
            label="Address"
            variant="outlined"
          />
        </div>
      </Paper>
    </React.Fragment>
  );
};
export default UserPostComponent;
