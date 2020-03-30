import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/styles";
import { Button, Typography } from "@material-ui/core";
import axios from "axios";

import MessageDialog from "../Dialog/MessageDialogComponent";

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
    width: "100%"
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
  },
  div: {
    textAlign: "end"
  },
  saveButton: {
    marginRight: "1rem",
    backgroundColor: "#1976d2"
  },
  cancelButton: {
    backgroundColor: "#e53935",
    "&:hover": {
      backgroundColor: "#c62828"
    }
  }
}));

const ChangeBannerComponent = () => {
  const classes = useStyles();
  const bannerUrl = "http://localhost:4000/images/top-banner.jpg";
  const [displayBanner, setDisplayBanner] = useState(bannerUrl);
  const [banner, setBanner] = useState();
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState([]);

  function base64(files, callback) {
    if (files.length) {
      var file = files[0];
      setBanner(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        var dataUrl = reader.result;
        callback(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  const onDrop = event => {
    base64(event.target.files, function(data) {
      setDisplayBanner(data);
    });
  };

  const hanldeSave = () => {
    const formData = new FormData();
    formData.append("banner", banner);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("http://localhost:4000/upload-banner", formData, config)
      .then(res => {
        if (res.data.success) {
          setDisplay(true);
          setMessage(["Change banner successfully!"]);
        }
      });
  };

  const handleCancel = () => {
    setDisplayBanner(bannerUrl);
    setBanner();
  };

  return (
    <div>
      <Typography variant="h5">Change banner image</Typography>
      <br />
      <Card className={classes.card}>
        <CardActionArea className={classes.cardAction}>
          {displayBanner && (
            <img className={classes.cardMedia} src={displayBanner} />
          )}
          {!displayBanner && (
            <div>
              <CloudUploadIcon className={classes.uploadIcon} />
              <h2>Upload your banner image</h2>
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
      <br />
      <div className={classes.div}>
        <Button
          className={classes.saveButton}
          variant="contained"
          type="button"
          color="primary"
          onClick={hanldeSave}
        >
          Save
        </Button>
        <Button
          className={classes.cancelButton}
          variant="contained"
          type="button"
          color="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
      {display && <MessageDialog setError={setDisplay} message={message} />}
    </div>
  );
};

export default ChangeBannerComponent;
