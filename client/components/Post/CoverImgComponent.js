import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  card: {
    border: "dotted 1.5px",
    height: 200,
    marginBottom: theme.spacing(1)
  },
  cardAction: {
    padding: 0,
    height: "100%",
    display: "flex"
  },
  cardMedia: {
    position: "absolute",
    height: "100%",
    width: "auto"
  },
  uploadIcon: {
    fontSize: "5rem",
    marginTop: "0rem"
  },
  upload: {
    height: "100%",
    width: "100%",
    opacity: 0,
    position: "inherit",
    position: "absolute"
  }
}));

export const CoverImgComponent = ({ prop, getImg }) => {
  const classes = useStyles();
  const [coverImg, setCoverImg] = useState(prop);

  function base64(files, callback) {
    var file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      var dataUrl = reader.result;
      callback(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  const onDrop = event => {
    base64(event.target.files, function(data) {
      setCoverImg(data);
      getImg(data);
    });
  };

  useEffect(() => {
    console.log("right here");
    setCoverImg(prop);
  }, [prop]);

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardAction}>
        {coverImg && (
          <CardMedia
            className={classes.cardMedia}
            component="img"
            image={coverImg}
          />
        )}
        {!coverImg && (
          <div>
            <CloudUploadIcon className={classes.uploadIcon} />
            <h2>Upload your cover image</h2>
          </div>
        )}
        <input
          className={classes.upload}
          type="file"
          accept=".png, .jpg, .jpeg"
          multiple={false}
          onChange={onDrop}
        />
      </CardActionArea>
    </Card>
  );
};
