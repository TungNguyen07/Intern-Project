import React, { useEffect } from "react";
import Router from "next/router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { checkTokenNGetUser, verifyUser } from "./auth";
import { userActions } from "../actions/userActions";

const withAuth = WrappedComponent => {
  const MiddlewareAuth = ({ setUserDetail, props }) => {
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

    useEffect(() => {
      checkTokenNGetUser().then(res => {
        if (verifyUser(res)) {
          saveUser(res);
          setUserDetail(res);
        } else Router.push("/signin");
      });
    });

    const saveUser = data => {
      props = data;
      console.log("props", props);
    };

    return <WrappedComponent {...props} />;
  };
  return connect(null, mapDispatchToProps)(MiddlewareAuth);
};

function mapDispatchToProps(dispatch) {
  return {
    setUserDetail: bindActionCreators(userActions.setUserDetail, dispatch)
  };
}

export default withAuth;
