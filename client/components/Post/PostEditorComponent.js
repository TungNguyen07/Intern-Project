import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import Dropzone from "react-dropzone";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const useStyle = makeStyles(theme => ({
  buttonSave: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: "#00ddff"
  },
  buttonDelete: {
    marginTop: theme.spacing(1),
    backgroundColor: "#ed4242"
  },
  formButton: {
    marginTop: theme.spacing(5),
    display: "block"
  },
  dropzone: {
    height: 200,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    border: "dotted 1.5px"
  },
  title: {
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
  dropTitle: {
    marginTop: "-1rem"
  },
  uploadIcon: {
    fontSize: "5rem",
    marginTop: "2rem"
  }
}));

const PostEditor = props => {
  const [text, setText] = useState("");
  const classes = useStyle();
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

  const onDrop = image => {
    var data = image[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      console.log("RESULT", reader.result);
    };
    reader.readAsDataURL(data);
  };

  return (
    <div>
      <form>
        <TextField className={classes.title} id="title" label="Title" />
        <FormControl className={classes.select}>
          <InputLabel id="demo-simple-select-label">Activity</InputLabel>
          <Select className={classes.select} id="activity">
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Dropzone accept="image/jpg, image/png, image/jpeg" onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div className={classes.dropzone} {...getRootProps()}>
                <input {...getInputProps()} />
                <CloudUploadIcon className={classes.uploadIcon} />
                <h2 className={classes.dropTitle}>
                  Drag 'n' drop your cover image, or click to select image
                </h2>
              </div>
            </section>
          )}
        </Dropzone>
        <ReactQuill className={classes.editor} value={text} modules={modules} />
        <FormControl className={classes.formButton}>
          <Button className={classes.buttonSave} onClick={console.log(text)}>
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
