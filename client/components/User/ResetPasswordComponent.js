import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";
import Router from "next/router";
import Alert from "@material-ui/lab/Alert";

import { postData } from "../../libs/postData";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "fit-content",
    margin: "auto",
    marginBottom: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
  alert: {
    width: "100%",
    marginTop: "0.3rem",
    marginBottom: "0.3rem",
  },
}));

export const ResetPasswordComponent = () => {
  const classes = useStyles();
  const [expired, setExpired] = useState(true);
  const [valid, setValid] = useState([]);
  const [info, setInfo] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [success, setSuccess] = useState(false);
  const [user_id, setUser_id] = useState("");

  const handleChange = (prop) => (event) => {
    setInfo({ ...info, [prop]: event.target.value });
  };

  const checkSigninInfo = () => {
    let arrError = [];
    if (info.confirm_password == "" || info.confirm_password == undefined)
      arrError.push("Xác nhận lại mật khẩu không được bỏ trống!");
    if (info.confirm_password.length > 0) {
      if (info.confirm_password.length < 6)
        arrError.push("Mật khẩu phải dài ít nhất 6 kí tự!");
      else if (info.confirm_password != info.new_password)
        arrError.push(["Xác nhận lại mật khẩu không chính xác!"]);
    }
    if (info.new_password == "" || info.new_password == undefined)
      arrError.push("Mật khẩu mới không được bỏ trống!");
    if (info.new_password.length > 0) {
      if (info.new_password.length < 6)
        arrError.push("Mật khẩu phải dài ít nhất 6 kí tự!");
    }

    if (!arrError.length) {
      setValid([]);
      return true;
    } else {
      setValid(arrError);
      return false;
    }
  };

  const handleCheck = () => {
    checkSigninInfo() && handleChangePassword();
  };

  const handleChangePassword = () => {
    postData(`${SERVER_URL}/profile/reset-password-by-email`, {
      ...info,
      user_id: user_id,
    }).then((res) => {
      if (res.success) setSuccess(true);
      else setSuccess(false);
    });
  };

  useEffect(() => {
    let unmouted = false;
    const token = Router.query.token;
    postData(`${SERVER_URL}/profile/check-reset-password-token`, {
      token,
    }).then((res) => {
      if (!unmouted) {
        if (res.success) {
          setExpired(false);
          setUser_id(res.user_id);
        }
      }
    });

    return () => {
      unmouted = true;
    };
  }, []);

  return (
    <Paper className={classes.paper}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đặt lại mật khẩu
          </Typography>
          {expired ? (
            <div>
              <Alert className={classes.alert} severity="warning">
                Token đã hết hạn hoặc không chính xác!
              </Alert>
              <Link href="/forgot-password">
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Trở lại
                </Button>
              </Link>
            </div>
          ) : success ? (
            <div>
              <Alert className={classes.alert} severity="success">
                Thay đổi mật khẩu thành công! Vui lòng đăng nhập lại!
              </Alert>
              <Link href="/signin">
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Đăng nhập
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              {valid &&
                valid.map((item, index) => {
                  return (
                    <Alert
                      className={classes.alert}
                      key={index}
                      severity="warning"
                    >
                      {item}
                    </Alert>
                  );
                })}
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="new_password"
                  label="Mật khẩu mới"
                  name="new_password"
                  type="password"
                  autoFocus
                  onChange={handleChange("new_password")}
                  value={info.new_password}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Xác nhận lại mật khẩu"
                  type="password"
                  id="confirmPassword"
                  onChange={handleChange("confirm_password")}
                  value={info.confirm_password}
                />

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleCheck}
                >
                  Đổi mật khẩu
                </Button>
              </form>{" "}
            </div>
          )}
        </div>
      </Container>
    </Paper>
  );
};

export default ResetPasswordComponent;
