import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const useStyle = makeStyles(theme => ({
  buttonSave: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: "#4fd9ff"
  },
  buttonDelete: {
    marginTop: theme.spacing(1),
    backgroundColor: "#ed4242"
  },
  formButton: {
    marginTop: theme.spacing(5),
    display: "block"
  },
  upload: {
    height: "100%",
    width: "100%",
    opacity: 0,
    position: "inherit",
    position: "absolute"
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(1)
  },
  select: {
    width: "70%",
    display: "flex",
    marginBottom: theme.spacing(1)
  },
  editor: {
    height: 600
  },
  icon: {
    marginRight: theme.spacing(1) - 2
  },
  uploadTitle: {
    marginTop: "-1rem"
  },
  uploadIcon: {
    fontSize: "5rem",
    marginTop: "0rem"
  },
  card: {
    border: "dotted 1.5px",
    height: 200,
    marginBottom: theme.spacing(1)
  },
  uploadContent: {
    display: "block",
    position: "absolute"
  },
  previewImg: {
    maxWidth: "100%",
    maxHeight: "100%"
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
  }
}));

const PostEditor = props => {
  const classes = useStyle();

  const [post, setPost] = useState("");
  const [coverImg, setCoverImg] = useState();

  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "super" }, { script: "sub" }],
      [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],

      ["link", "image", "video", "formula"]
    ]
  };

  function base64(files, callback) {
    var file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      var dataUrl = reader.result;
      callback(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  const handleChange = value => {
    setPost(value);
    console.log(post);
  };

  const onDrop = event => {
    base64(event.target.files, function(data) {
      setCoverImg(data);
    });
  };

  return (
    <div>
      <form>
        <TextField
          className={classes.textField}
          id="title"
          label="Title"
          required
        />
        <FormControl className={classes.select}>
          <InputLabel id="demo-simple-select-label">Activity</InputLabel>
          <Select className={classes.select} id="activity" defaultValue="10">
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <TextField
          className={classes.textField}
          id="description"
          label="Description"
          multiline
          required
        />
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

        <ReactQuill
          theme="snow"
          id="content"
          className={classes.editor}
          value={post}
          modules={modules}
          onChange={handleChange}
        />
        <FormControl className={classes.formButton}>
          <Button className={classes.buttonSave} onClick={console.log(post)}>
            <SaveIcon className={classes.icon} />
            Save
          </Button>
          <Button className={classes.buttonDelete}>
            <DeleteIcon className={classes.icon} />
            Cannel
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default PostEditor;
