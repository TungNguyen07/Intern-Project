import React, { useEffect, useState } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    lineHeight: "70%",
    maxWidth: "90%",
    marginBottom: theme.spacing(1),
  },
  title: {
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1.5rem",
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
  },
  card: {
    padding: "1rem 1rem 0rem 1rem",
    textAlign: "center",
    background: "linear-gradient(#a3f1ff,#03c8ff)",
    "& p": {
      "@media (min-width:600px)": {
        fontSize: "0.6rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "0.875rem",
      },
    },
  },
  link: {
    color: "black",
    float: "right",
    textDecoration: "none",
    "& visited": {
      textDecoration: "none",
    },
  },
  grid: {
    marginLeft: "11%",
  },
}));

const Footer = ({ action }) => {
  const classes = useStyles();
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    if (action == "signin") setDisplay(false);
    else setDisplay(true);
  }, [action]);

  return (
    <div className={classes.root}>
      <Grid className={classes.grid}>
        <Card className={classes.card}>
          <Link href="/">
            <h2 className={classes.title}>
              TRUNG TÂM VĂN HÓA - THỂ THAO THÀNH PHỐ LONG XUYÊN
            </h2>
          </Link>
          <p>
            Địa chỉ: số 268, Nguyễn Trường Tộ, Phường Bình Khánh, thành phố Long
            Xuyen, tỉnh An Giang
          </p>
          <p>Số điện thoại: 0296 - 384 - 1732</p>
          <p>
            Email:{" "}
            <a href="mailto:ttvhtt.longxuyen@angiang.gov.vn">
              ttvhtt.longxuyen@angiang.gov.vn
            </a>
          </p>
          <p>
            &copy; 2020, Bản quyền thuộc N S.Tung
            {display && (
              <Link href="/signin">
                <a className={classes.link}>Đăng nhập</a>
              </Link>
            )}
          </p>
        </Card>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    action: state.userReducer.action,
  };
};

export default connect(mapStateToProps, null)(Footer);
