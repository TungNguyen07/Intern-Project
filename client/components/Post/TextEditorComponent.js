import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/styles";

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

const useStyles = makeStyles(theme => ({
  editor: {
    height: 600
  }
}));

export const TextEditorComponent = ({ isReload, getContent }) => {
  const classes = useStyles();
  const [content, setContent] = useState("");

  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [
        { color: ["black", "red", "blue", "white", "yellow"] },
        { background: [] }
      ],
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

  const handleChangeContent = value => {
    setContent(value);
    getContent(value);
  };

  useEffect(() => {
    if (isReload == true) setContent("");
  }, [isReload]);

  return (
    <ReactQuill
      theme="snow"
      id="content"
      className={classes.editor}
      value={content}
      modules={modules}
      onChange={handleChangeContent}
    />
  );
};
