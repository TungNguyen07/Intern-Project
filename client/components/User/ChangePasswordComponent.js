import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "react-redux";

import MessageDialog from "../Dialog/MessageDialogComponent";
import { postData } from "../../libs/postData";
import { changePassword } from "../../actions/userActions";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    marginBottom: theme.spacing(1.5),
    fontSize: "1rem",
  },
  title: {
    color: "black",
    "@media (min-width:600px)": {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
  },
  div: {
    marginTop: theme.spacing(3),
    width: "55%",
    margin: "auto",
  },
  button: {
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  checkbox: {
    marginBottom: theme.spacing(1),
    width: "55%",
    textAlign: "start",
    margin: "auto",
  },
}));

export const ChangePasswordComponent = ({ user }) => {
  const classes = useStyles();
  const initPassword = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [passwordInfo, setPasswordInfo] = useState(initPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState([]);
  const [display, setDisplay] = useState(false);

  const checkCurrentPassword = (checkInfo) => {
    const check = postData(
      `${SERVER_URL}/profile/check-current-password`,
      checkInfo
    ).then((res) => {
      return res;
    });
    return check;
  };

  const checkValidPassword = async (password) => {
    let arrError = [];
    if (password.currentPassword == "" || password.currentPassword == undefined)
      arrError.push("Current password is required!");
    else if (
      password.newPassword == "" ||
      password.confirmPassword == undefined
    )
      arrError.push("New password is required!");
    else if (
      password.confirmPassword == "" ||
      password.confirmPassword == undefined
    )
      arrError.push("Confirm password is required!");

    if (
      password.currentPassword.length < 6 ||
      password.newPassword.length < 6 ||
      password.confirmPassword.length < 6
    )
      arrError.push("Password must be at least 6 characters!");

    if (password.newPassword != password.confirmPassword)
      arrError.push("Confirm password is incorrect!");

    const checked = await checkCurrentPassword({
      id: user.id,
      currentPassword: password.currentPassword,
    });

    if (!checked.result) arrError.push("Current password is incorrect!");

    if (!arrError.length) {
      setMessage(["Change password successfully!"]);
      return true;
    } else {
      setMessage(arrError);
      return false;
    }
  };

  const handleChange = (prop) => (event) => {
    setPasswordInfo({ ...passwordInfo, [prop]: event.target.value });
  };

  const handleClear = () => {
    setPasswordInfo(initPassword);
  };

  const handleCheck = async () => {
    (await checkValidPassword(passwordInfo))
      ? handleUpdate()
      : setDisplay(true);
  };

  const handleUpdate = () => {
    changePassword({ id: user.id, newPassword: passwordInfo.newPassword });
    setDisplay(true);
    handleClear();
  };

  return (
    <React.Fragment>
      <Typography variant="h3" className={classes.title}>
        Change password
      </Typography>
      <div className={classes.div}>
        <form>
          <TextField
            className={classes.textField}
            value={passwordInfo.currentPassword}
            label="Current Password"
            required
            type={showPassword ? "text" : "password"}
            variant="outlined"
            onChange={handleChange("currentPassword")}
          />
          <TextField
            className={classes.textField}
            value={passwordInfo.newPassword}
            label="New Password"
            required
            type={showPassword ? "text" : "password"}
            variant="outlined"
            onChange={handleChange("newPassword")}
          />
          <TextField
            className={classes.textField}
            value={passwordInfo.confirmPassword}
            label="Confirm Password"
            required
            type={showPassword ? "text" : "password"}
            variant="outlined"
            onChange={handleChange("confirmPassword")}
          />
        </form>
      </div>
      <div className={classes.checkbox}>
        <Checkbox
          checked={showPassword}
          onChange={() => {
            setShowPassword(!showPassword);
          }}
          color="primary"
        />{" "}
        Show password
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleCheck}
      >
        Change password
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClear}
      >
        Clear
      </Button>
      {display && <MessageDialog setError={setDisplay} message={message} />}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, null)(ChangePasswordComponent);
