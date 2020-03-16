import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { postActions } from "../../actions/postActions";
import { CoverImgComponent } from "./CoverImgComponent";
import { TextEditorComponent } from "./TextEditorComponent";
import Notification from "../Dialog/NotificationComponent";

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
  textField: {
    width: "100%",
    marginBottom: theme.spacing(1)
  },
  select: {
    width: "70%",
    display: "flex",
    marginBottom: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1) - 2
  },
  title: {
    color: "black"
  }
}));

export const PostEditor = ({ author, checkValid, message }) => {
  const classes = useStyle();
  const [post, setPost] = useState({
    title: "",
    description: "",
    content: ""
  });
  const [notify, setNotify] = useState(false);

  const handleChange = prop => event => {
    setPost({ ...post, [prop]: event.target.value });
  };

  const getCoverImg = img => {
    setPost({ ...post, cover_img: img });
  };

  const getContent = content => {
    setPost({ ...post, content: content });
  };

  const handleSave = () => {
    checkValid({
      ...post,
      author_id: author.id,
      created_at: new Date().toISOString()
    });
  };

  const handleDelete = () => {
    setPost({
      title: "",
      description: "",
      content: ""
    });
  };

  useEffect(() => {
    if (message.length) setNotify(true);
    else setNotify(false);
  }, [message]);

  return (
    <div>
      <Typography variant="h3" className={classes.title}>
        Make your new post
      </Typography>
      <form>
        <TextField
          className={classes.textField}
          value={post.title}
          id="title"
          label="Title"
          required
          onChange={handleChange("title")}
        />
        <FormControl className={classes.select}>
          <InputLabel id="demo-simple-select-label">Activity</InputLabel>
          <Select
            className={classes.select}
            id="activity"
            defaultValue="10"
            onChange={handleChange("activity_id")}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <TextField
          className={classes.textField}
          value={post.description}
          id="description"
          label="Description"
          multiline
          required
          onChange={handleChange("description")}
        />

        <CoverImgComponent getImg={getCoverImg} />
        <TextEditorComponent getContent={getContent} />

        <FormControl className={classes.formButton}>
          <Button className={classes.buttonSave} onClick={handleSave}>
            <SaveIcon className={classes.icon} />
            Save
          </Button>
          <Button className={classes.buttonDelete} onClick={handleDelete}>
            <DeleteIcon className={classes.icon} />
            Cannel
          </Button>
        </FormControl>
      </form>
      {notify && (
        <Notification setNotify={setNotify} isOpen={notify} content={message} />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return { author: state.userReducer.user, message: state.postReducer.message };
};

const mapDispatchToProps = dispatch => {
  return {
    checkValid: bindActionCreators(postActions.checkValidPost, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostEditor);
