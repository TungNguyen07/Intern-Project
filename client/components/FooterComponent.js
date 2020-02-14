import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    lineHeight: "70%",
    maxWidth: "90%"
  },
  title: {
    fontWeight: "bold"
  },
  card: {
    padding: theme.spacing(1.5)
  },
  link: {
    float: "right"
  },
  grid: {
    marginLeft: "10%"
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid className={classes.grid}>
        <Card
          className={classes.card}
          style={{ background: "linear-gradient(#a3f1ff,#03c8ff)" }}
        >
          <h2 className={classes.title}>
            TRUNG TÂM VĂN HÓA - THỂ THAO THÀNH PHỐ LONG XUYÊN
          </h2>
          <p>
            Địa chỉ: Số 268 Nguyễn Trường Tộ, Phường Bình Khánh, Thành phố Long
            Xuyên, Tỉnh An Giang.
          </p>
          <p>Điện thoại: 0123456789</p>
          <p>
            Email:{" "}
            <a href="mailto:ttvhtt.longxuyen@angiang.gov.vn">
              ttvhtt.longxuyen@angiang.gov.vn
            </a>
            <Link href="/login">
              <a className={classes.link}>Login</a>
            </Link>
          </p>
        </Card>
      </Grid>
    </div>
  );
};

export default Footer;
