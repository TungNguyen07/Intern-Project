import React from "react";
import Link from "next/link";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles({
  root: {
    marginBottom: 16
  },
  media: {
    width: 280
  }
});

const Propaganda = () => {
  const classes = useStyles();
  return (
    <div>
      <a href="http://dangcongsan.vn" target="blank">
        <Card className={classes.root}>
          <CardActionArea>
            <img
              className={classes.media}
              src="http://trungtamvanhoathethaotanbinh.vn:7777/mediaroot/media/userfiles/useruploads/800/image/%C4%90%E1%BA%A3ng%20CS.PNG"
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
              src="http://media.angiang.gov.vn/pictures/2018/12/32/congdvcongquocgia.jpg"
            />
          </CardActionArea>
        </Card>
      </a>
      <a href="http://sovhttdl.angiang.gov.vn/wps/portal/" target="blank">
        <Card className={classes.root}>
          <CardActionArea>
            <img
              className={classes.media}
              src="https://lh3.googleusercontent.com/proxy/UVnA4SWs1JHC2dk56x43ZB6O5EU8Z1iF0YmtDn2D8b6OAhzTDUJDNXx1xS7k2-Ves2sF5b8-SikSfEbgi9UQePJcXdr7srle0WoY4XIZ5IuwXxobPuLCduUvjmxhcI3tbC-qYIV_bTI64Ec6LvsE7mCB_MuWb0U_bDO-yseEyyudyrPZmzX7R18owHkSUqdm0TcaSjdXN2q9Be59gn-OFkgyVDstctuPR_ZFEoAin-Zm7YVAxZ4"
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
              src="http://media.angiang.gov.vn/pictures/2018/12/32/VB%20CHI%20DAO%20DIEU%20HANH.png"
            />
          </CardActionArea>
        </Card>
      </a>
      <img src="http://media.angiang.gov.vn/thu%20tuc%20hanh%20chanh/KQ-TTHC/2020/1/virus%20corona-hotline-S.jpg" />
      <img
        className={classes.media}
        src="http://longxuyen.angiang.gov.vn/wps/wcm/connect/5467ee004289fc118e34cf3d881d2cb8/Hotline_tplx.gif?MOD=AJPERES&CACHEID=5467ee004289fc118e34cf3d881d2cb8"
      />
      <img
        className={classes.media}
        src="http://longxuyen.angiang.gov.vn/wps/wcm/connect/9dc329804289fb8e8e25cf3d881d2cb8/Hotline_tinh.gif?MOD=AJPERES&CACHEID=9dc329804289fb8e8e25cf3d881d2cb8"
      />
    </div>
  );
};

export default Propaganda;
