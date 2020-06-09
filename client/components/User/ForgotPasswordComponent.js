import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";
import Router from "next/router";
import Alert from "@material-ui/lab/Alert";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { userActions } from "../../actions/userActions";
import { postData } from "../../libs/postData";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "6rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "2rem",
    paddingBottom: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginTop: "4.5rem",
  },
  form: {
    width: "100%",
    marginTop: "1rem",
    paddingBottom: "1rem",
    marginBottom: "2rem",
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
  alert: {
    width: "100%",
    margin: theme.spacing(1),
  },
  root: {
    width: "28%",
    margin: "auto",
  },
  note: {
    marginBottom: "0.5rem",
  },
}));

export const ForgotPasswordComponent = ({ user, setUserDetail }) => {
  const classes = useStyles();
  const [valid, setValid] = useState([]);
  const [error, setError] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const checkUsername = () => {
    postData(`${SERVER_URL}/profile/check-username`, {
      username: username,
    }).then((res) => {
      if (res.success) {
        if (res.email) handleSendMail();
        else
          setValid([
            "Bạn chưa cập nhật email cá nhân, vui lòng liên hệ Quản trị viên để đặt lại mật khẩu",
          ]);
      } else handleWrong();
    });
  };

  const checkValidUsername = () => {
    let arrError = [];
    if (username == "" || username == undefined)
      arrError.push("Tài khoản không được bỏ trống!");
    if (username.length > 0) {
      if (username.length < 5)
        arrError.push("Tài khoản phải dài ít nhất 5 kí tự!");
    }

    if (!arrError.length) {
      setValid([]);
      return true;
    } else {
      setValid(arrError);
      return false;
    }
  };

  const handleCheck = async () => {
    setValid([]);
    setError([]);
    setCorrect([]);
    checkValidUsername() ? checkUsername() : setError([]);
  };

  const handleWrong = () => {
    setError(["Tài khoản không tồn tại!"]);
  };

  const handleSendMail = () => {
    setCorrect([
      "Chúng tôi đã gửi email cho bạn về đường dẫn để đổi mật khẩu. Vui lòng kiểm tra email của bạn!",
    ]);
    const hostname = window.location.href.split("/forgot-password")[0];
    postData(`${SERVER_URL}/profile/get-reset-password-token`, {
      username,
      hostname,
    }).then((res) => {
      if (res.error) setError(res.error);
    });
  };

  useEffect(() => {
    if (localStorage.length) {
      const token = { token: localStorage.getItem("access_token") };
      postData(`${SERVER_URL}/check-token`, token).then((res) => {
        if (res.id) {
          Router.push("/");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (user.fullname) {
      setError([]);
      Router.push("/");
    }
  }, [user]);

  return (
    <Paper className={classes.root}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Quên mật khẩu
          </Typography>
          {valid &&
            valid.map((item, index) => {
              return (
                <Alert className={classes.alert} key={index} severity="warning">
                  {item}
                </Alert>
              );
            })}

          {error &&
            error.map((item, index) => {
              return (
                <Alert className={classes.alert} key={index} severity="error">
                  {item}
                </Alert>
              );
            })}
          {correct &&
            correct.map((item, index) => {
              return (
                <Alert className={classes.alert} key={index} severity="success">
                  {item}
                </Alert>
              );
            })}
          <form className={classes.form} noValidate>
            <Typography className={classes.note}>
              Vui lòng nhập tài khoản của bạn
            </Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Tài khoản"
              name="username"
              autoFocus
              onChange={handleChange}
              value={username}
            />

            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleCheck}
            >
              Xác nhận
            </Button>
          </form>
        </div>
      </Container>
    </Paper>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setUserDetail: bindActionCreators(userActions.setUserDetail, dispatch),
  };
}

function mapStateToProps(state) {
  return { user: state.userReducer.user };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordComponent);
