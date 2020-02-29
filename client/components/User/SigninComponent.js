import React, { useState } from "react";
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
import { useCookies } from "react-cookie";

import { postData } from "../../libs/postData";

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
  }
}));

export default function LoginComponent() {
  const classes = useStyles();
  const [cookie, setCookie] = useCookies("");
  const [info, setInfo] = useState({
    username: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = prop => event => {
    setInfo({ ...info, [prop]: event.target.value });
  };

  const submit = () => {
    postData("http://localhost:4000/signin", info)
      .then(res => {
        setCookie("access_token", res.token);
        Router.push("/");
      })
      .catch(err => console.log(err));
  };

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
}
