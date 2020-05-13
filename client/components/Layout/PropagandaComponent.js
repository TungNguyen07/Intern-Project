import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import SearchComponent from "../Post/SearchComponent";
import VirusInfoComponent from "../Covid-19/VirusInfoComponent";

const useStyles = makeStyles({
  root: {
    marginBottom: 16,
  },
  media: {
    width: "100%",
  },

  paper: {
    marginBottom: "1rem",
  },
});

const Propaganda = () => {
  const classes = useStyles();

  return (
    <div>
      <SearchComponent />
      <a href="http://dangcongsan.vn" target="blank">
        <Card className={classes.root}>
          <CardActionArea>
            <img
              className={classes.media}
              src="http://res.cloudinary.com/djy0l9bwl/image/upload/v1589164331/unnamed_cpigdj.png"
            />
          </CardActionArea>
        </Card>
      </a>
      <a
        href="https://dichvucong.gov.vn/p/home/dvc-trang-chu.html"
        target="blank"
      >
        <Card className={classes.root}>
          <CardActionArea>
            <img
              className={classes.media}
              src="http://res.cloudinary.com/djy0l9bwl/image/upload/v1589164332/congdvcongquocgia_g3f8yz.jpg"
            />
          </CardActionArea>
        </Card>
      </a>
      <a href="http://sovhttdl.angiang.gov.vn/wps/portal/" target="blank">
        <Card className={classes.root}>
          <CardActionArea>
            <img
              className={classes.media}
              src="http://res.cloudinary.com/djy0l9bwl/image/upload/v1589164331/unnamed_poixch.jpg"
            />
          </CardActionArea>
        </Card>
      </a>
      <a
        href="https://vpdt.angiang.gov.vn/cong-khai-van-ban-an-giang"
        target="blank"
      >
        <Card className={classes.root}>
          <CardActionArea>
            <img
              className={classes.media}
              src="http://res.cloudinary.com/djy0l9bwl/image/upload/v1589164332/VB_CHI_DAO_DIEU_HANH_a5zzee.png"
            />
          </CardActionArea>
        </Card>
      </a>
      <img
        className={classes.media}
        src="https://res.cloudinary.com/djy0l9bwl/image/upload/v1589164332/virus_corona-hotline-S_i6efxg.jpg"
      />
      <img
        className={classes.media}
        src="https://res.cloudinary.com/djy0l9bwl/image/upload/v1589164331/Hotline_tplx_gf6lt4.gif"
      />
      <img
        className={classes.media}
        src="https://res.cloudinary.com/djy0l9bwl/image/upload/v1589164331/Hotline_tinh_uwzehj.gif"
      />
      <VirusInfoComponent />
    </div>
  );
};

export default Propaganda;
