import React, { useEffect, useState } from "react";
import Router from "next/router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { checkTokenNGetUser, verifyAdmin } from "./auth";
import { userActions } from "../actions/userActions";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" }
}));

const withAuthAdmin = WrappedComponent => {
  const MiddlewareAuth = ({ setUserDetail, props }) => {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      let unmounted = false;
      const token = localStorage.getItem("access_token");
      if (!token) Router.push("/signin");
      else
        checkTokenNGetUser(token).then(res => {
          if (!unmounted) {
            if (verifyAdmin(res)) {
              saveUser(res);
              setUserDetail(res);
              setLoading(false);
            } else Router.push("/");
          }
        });
      return () => {
        unmounted = true;
      };
    }, []);

    const saveUser = data => {
      props = data;
    };

    return isLoading ? (
      <div className={classes.div}>
        <CircularProgress className={classes.loading} />
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
  };
  return connect(null, mapDispatchToProps)(MiddlewareAuth);
};

function mapDispatchToProps(dispatch) {
  return {
    setUserDetail: bindActionCreators(userActions.setUserDetail, dispatch)
  };
}

export default withAuthAdmin;
