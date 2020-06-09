import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Checkbox from "@material-ui/core/Checkbox";
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
    margin: theme.spacing(1),
  },
  link: {
    color: "darkblue",
    "& visited": {
      color: "inherit",
    },
  },
}));

export const LoginComponent = ({ user, setUserDetail }) => {
  const classes = useStyles();
  const [valid, setValid] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (prop) => (event) => {
    setInfo({ ...info, [prop]: event.target.value });
  };

  const checkPassword = (signInfo) => {
    const check = postData(`${SERVER_URL}/signin`, signInfo).then((res) => {
      return res;
    });
    return check;
  };

  const checkSigninInfo = () => {
    let arrError = [];
    if (info.username == "" || info.username == undefined)
      arrError.push("Tài khoản không được bỏ trống!");
    if (info.username.length > 0) {
      if (info.username.length < 5)
        arrError.push("Tài khoản phải lớn hơn hoặc bằng 5 kí tự!");
    }
    if (info.password == "" || info.password == undefined)
      arrError.push("Mật khẩu không được bỏ trống!");
    if (info.password.length > 0) {
      if (info.password.length < 6)
        arrError.push("Mật khẩu phải lớn hơn hoặc bằng 6 kí tự!");
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
    setValid([]);
    setCorrect([]);
    checkSigninInfo() ? handleSignin() : console.log("false");
  };

  const handleSignin = async () => {
    const result = await checkPassword(info);
    if (result.user && result.token) {
      localStorage.setItem("access_token", result.token);
      setUserDetail(result.user);
      Router.push("/");
    } else {
      handleWrong();
    }
  };

  const handleWrong = () => {
    setCorrect(["Tài khoản hoặc mật khẩu không chính xác!"]);
  };

  useEffect(() => {
    if (localStorage.length) {
      const token = { token: localStorage.getItem("access_token") };
      postData(`${SERVER_URL}/check-token`, token).then((res) => {
        if (res._id) {
          console.log(res);
          Router.push("/");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (user.fullname) {
      setCorrect([]);
      Router.push("/");
    }
  }, [user]);

  return (
    <Paper className={classes.paper}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          {valid &&
            valid.map((item, index) => {
              return (
                <Alert className={classes.alert} key={index} severity="warning">
                  {item}
                </Alert>
              );
            })}

          {correct &&
            correct.map((item, index) => {
              return (
                <Alert className={classes.alert} key={index} severity="error">
                  {item}
                </Alert>
              );
            })}
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Tài khoản"
              name="username"
              autoFocus
              onChange={handleChange("username")}
              value={info.username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={handleChange("password")}
              value={info.password}
            />
            <Checkbox
              checked={showPassword}
              onChange={() => {
                setShowPassword(!showPassword);
              }}
              color="primary"
            />{" "}
            Hiển thị mật khẩu
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleCheck}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password">
                  <a className={classes.link}>Quên mật khẩu?</a>
                </Link>
              </Grid>
            </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
