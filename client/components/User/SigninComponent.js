import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";
import Router from "next/router";
import Alert from "@material-ui/lab/Alert";

import { userActions } from "../../actions/userActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "fit-content",
    margin: "auto",
    marginBottom: theme.spacing(4),
    paddingBottom: theme.spacing(2)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(1, 0, 1)
  },
  alert: {
    width: "100%",
    margin: theme.spacing(1)
  }
}));

export const LoginComponent = ({ user, error, Signin }) => {
  const classes = useStyles();
  const [isValid, setIsValid] = useState(true);
  const [isCorrect, setIsCorrect] = useState(true);
  const [info, setInfo] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = prop => event => {
    setInfo({ ...info, [prop]: event.target.value });
  };

  const submit = () => {
    if (info.username == "" || info.password == "") setIsValid(false);
    else {
      setIsValid(true);
      setIsCorrect(true);
      Signin(info);
    }
  };

  useEffect(() => {
    if (localStorage.length) {
      const token = { token: localStorage.getItem("access_token") };
      if (token) Router.push("/");
    }
  }, []);

  useEffect(() => {
    if (error.length > 0) setIsCorrect(false);
    console.log("Checking...", error.length);
  }, [error]);

  useEffect(() => {
    if (user.fullname) {
      setIsCorrect(true);
      Router.push("/");
    }
    console.log("user1", user);
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
            Sign in
          </Typography>
          {!isValid && (
            <Alert className={classes.alert} severity="warning">
              Invalid Username or Password
            </Alert>
          )}
          {!isCorrect && (
            <Alert className={classes.alert} severity="error">
              Incorrect Username or Password
            </Alert>
          )}
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
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
              label="Password"
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
            Show password
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
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
    Signin: bindActionCreators(userActions.Signin, dispatch)
  };
}

function mapStateToProps(state) {
  return { user: state.userReducer.user, error: state.userReducer.error };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
