import React from "react";
import { Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    color: "black",
  },
  title: {
    marginBottom: "0.5rem",
  },
  hr: {
    width: "80%",
  },
  img: {
    maxWidth: "100%",
    marginBottom: "1rem",
  },
  info: {
    textAlign: "start",
    marginLeft: "10%",
    lineHeight: "0.8rem",
    maxWidth: "80%",
  },
  map: {
    display: "flex",
    margin: "auto",
  },
});

const PositionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h4">
        1. Vị trí
      </Typography>
      {/* <hr className={classes.hr} /> */}
      {/* <img
        className={classes.img}
        src="http://res.cloudinary.com/djy0l9bwl/image/upload/v1589869374/dh-tdtt-lan-thu-iv_r7cdrt.jpg"
      /> */}
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1841.1247571422055!2d105.41922958258006!3d10.394341319031966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a73b551bd0a4d%3A0x1400eb82d482ff11!2zVHJ1bmcgdMOibSBWxINuIGjDs2EgLSBUaOG7gyB0aGFvIHRow6BuaCBwaOG7kSBMb25nIFh1ecOqbg!5e0!3m2!1svi!2s!4v1590037974003!5m2!1svi!2s"
          width="600"
          height="450"
          className={classes.map}
        ></iframe>
      </div>
      <div>
        <Typography>
          Trung tâm văn hóa thể thao thành phố Long Xuyên được thành lập vào
          ngày 27 tháng 9 năm 2017
        </Typography>
        <Typography>
          Địa chỉ: số 268, Nguyễn Trường Tộ, Phường Bình Khánh, thành phố Long
          Xuyen, tỉnh An Giang
        </Typography>
        <Typography>Số điện thoại: 0296 - 384 - 1732</Typography>
        <Typography>
          Email:{" "}
          <a href="mailto:ttvhtt.longxuyen@angiang.gov.vn">
            ttvhtt.longxuyen@angiang.gov.vn
          </a>
        </Typography>
      </div>
    </div>
  );
};

export default PositionComponent;
