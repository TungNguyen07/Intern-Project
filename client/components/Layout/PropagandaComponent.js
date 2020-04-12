import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import SearchComponent from "../Post/SearchComponent";

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
              src="https://f12.photo.talk.zdn.vn/2048302144937371919/44fe8041ddf626a87fe7.jpg"
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
              src="https://f14.photo.talk.zdn.vn/836643282698433221/19cf9670cbc7309969d6.jpg"
            />
          </CardActionArea>
        </Card>
      </a>
      <a href="http://sovhttdl.angiang.gov.vn/wps/portal/" target="blank">
        <Card className={classes.root}>
          <CardActionArea>
            <img
              className={classes.media}
              src="https://f11.photo.talk.zdn.vn/3666640873223991712/305049e51452ef0cb643.jpg"
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
              src="https://f11.photo.talk.zdn.vn/5302077411369275592/f76e90ddcd6a36346f7b.jpg"
            />
          </CardActionArea>
        </Card>
      </a>
      <img
        className={classes.media}
        src="https://f8.photo.talk.zdn.vn/5720011895907003075/283450870d30f66eaf21.jpg"
      />
      <img
        className={classes.media}
        src="https://b.f3.photo.talk.zdn.vn/3371653541661994894/b793d47d7bca8094d9db.jpg"
      />
      <img
        className={classes.media}
        src="https://b.f4.photo.talk.zdn.vn/5819871661116310597/f7677f89d03e2b60722f.jpg"
      />
    </div>
  );
};

export default Propaganda;
