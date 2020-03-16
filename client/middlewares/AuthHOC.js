import React, { useEffect } from "react";
import Router from "next/router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { checkTokenNGetUser, verifyUser } from "./auth";
import { userActions } from "../actions/userActions";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" }
}));

const withAuth = WrappedComponent => {
  const MiddlewareAuth = ({ setUserDetail, props, isLoading }) => {
    // static async getInitialProps(ctx) {
    //     const { store } = ctx;
    //     if (!store.getState().get('auth').get('loaded')) {
    //         let unsubscribe;
    //         await new Promise((resolve) => {
    //             unsubscribe = store.subscribe(() => {
    //                 if (store.getState().get('auth').get('loaded')) {
    //                     resolve();
    //                 }
    //             });
    //         });
    //         unsubscribe();
    //     }

    //     const token = checkAuth(store.getState().get('auth'), role, ctx);
    //     const componentProps = WrappedComponent.getInitialProps
    //             && (await WrappedComponent.getInitialProps(ctx));

    //     return { ...componentProps, token };
    // }

    const classes = useStyles();

    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (!token) Router.push("/signin");
      else
        checkTokenNGetUser(token).then(res => {
          if (verifyUser(res)) {
            saveUser(res);
            setUserDetail(res);
          } else Router.push("/signin");
        });
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
  return connect(mapStateToProps, mapDispatchToProps)(MiddlewareAuth);
};

function mapDispatchToProps(dispatch) {
  return {
    setUserDetail: bindActionCreators(userActions.setUserDetail, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    isLoading: state.userReducer.isLoading
  };
}

export default withAuth;
