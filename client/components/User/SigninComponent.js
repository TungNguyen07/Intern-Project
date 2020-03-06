import React, { useState, useEffect, useContext, useReducer } from "react";
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

export const LoginComponent = props => {
  const classes = useStyles();
  const [isValid, setIsValid] = useState(true);
  const [info, setInfo] = useState({
    username: "",
    password: ""
  });

  //const [user, dispatch] = useReducer(UserReducer, initialUser);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = prop => event => {
    setInfo({ ...info, [prop]: event.target.value });
  };

  const { Signin } = props;
  const submit = () => {
    if (info.username == "" || info.password == "") setIsValid(false);
    else {
      Signin(info);

      Router.push("/profile");
    }
    // if (dispatch({ type: "IS_SIGNED_IN" })) Router.push("/");
    // else setError("Incorect Username or Password!");
  };

  useEffect(() => {
    if (localStorage.length) {
      const token = { token: localStorage.getItem("access_token") };
      if (token) Router.push("/");
    }
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
            Sign in
          </Typography>
          {!isValid && (
            <Alert className={classes.alert} severity="warning">
              Invalid Username or Password
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

export default connect(null, mapDispatchToProps)(LoginComponent);
