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

const ReactQuill = dynamic(import("react-quill"), { ssr: false });
// class BlogEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { text: "" }; // You can also pass a Quill Delta here
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(value) {
//     this.setState({ text: value });
//   }

//   modules = {
//     toolbar: [
//       [{ font: [] }, { size: [] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ color: [] }, { background: [] }],
//       [{ script: "super" }, { script: "sub" }],
//       [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
//       [
//         { list: "ordered" },
//         { list: "bullet" },
//         { indent: "-1" },
//         { indent: "+1" }
//       ],

//       ["link", "image", "video", "formula"]
//     ]
//   };

//   render() {
//     return (
//       <ReactQuill
//         value={this.state.text}
//         onChange={this.handleChange}
//         modules={this.modules}
//       />
//     );
//   }
// }

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
    marginBottom: theme.spacing(1)
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
        <Dropzone
          accept="image/jpg, image/png, image/jpeg"
          onDrop={acceptedFiles => console.log(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div className={classes.dropzone} {...getRootProps()}>
                <input {...getInputProps()} />
                <h2>
                  Drag 'n' drop your cover image, or click to select files
                </h2>
              </div>
            </section>
          )}
        </Dropzone>
        <ReactQuill className={classes.editor} value={text} modules={modules} />
        <FormControl className={classes.formButton}>
          <Button className={classes.buttonSave} onClick={console.log(text)}>
            Save
          </Button>
          <Button className={classes.buttonDelete}>Cannel</Button>
        </FormControl>
      </form>
    </div>
  );
};

export default PostEditor;
