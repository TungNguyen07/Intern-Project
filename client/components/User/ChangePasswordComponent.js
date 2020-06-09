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
  checkbox: {
    marginBottom: theme.spacing(1),
    width: "55%",
    textAlign: "start",
    margin: "auto",
  },
  saveButton: {
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: "#1976d2",
  },
  cancelButton: {
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: "#e53935",
    "&:hover": {
      backgroundColor: "#c62828",
    },
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
      arrError.push("Mật khẩu hiện tại không được bỏ trống!");
    else if (
      password.newPassword == "" ||
      password.confirmPassword == undefined
    )
      arrError.push("Mật khẩu mới không được bỏ trống!");
    else if (
      password.confirmPassword == "" ||
      password.confirmPassword == undefined
    )
      arrError.push("Xác nhận mật khẩu không được bỏ trống!");

    if (
      password.currentPassword.length < 6 ||
      password.newPassword.length < 6 ||
      password.confirmPassword.length < 6
    )
      arrError.push("Mật khẩu phải dài ít nhất 6 kí tự!");

    if (password.newPassword != password.confirmPassword)
      arrError.push("Xác nhận mật khẩu không chính xác!");

    const checked = await checkCurrentPassword({
      id: user.id,
      currentPassword: password.currentPassword,
    });

    if (!checked.result) arrError.push("Mật khẩu hiện tại không chính xác!");

    if (!arrError.length) {
      setMessage(["Đổi mật khẩu thành công!"]);
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
        Đổi mật khẩu
      </Typography>
      <div className={classes.div}>
        <form>
          <TextField
            className={classes.textField}
            value={passwordInfo.currentPassword}
            label="Mật khẩu hiện tại"
            required
            type={showPassword ? "text" : "password"}
            variant="outlined"
            onChange={handleChange("currentPassword")}
          />
          <TextField
            className={classes.textField}
            value={passwordInfo.newPassword}
            label="Mật khẩu mới"
            required
            type={showPassword ? "text" : "password"}
            variant="outlined"
            onChange={handleChange("newPassword")}
          />
          <TextField
            className={classes.textField}
            value={passwordInfo.confirmPassword}
            label="Xác nhận lại mật khẩu"
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
        Hiển thị mật khẩu
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.saveButton}
        onClick={handleCheck}
      >
        Đổi mật khẩu
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.cancelButton}
        onClick={handleClear}
      >
        Xóa
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
