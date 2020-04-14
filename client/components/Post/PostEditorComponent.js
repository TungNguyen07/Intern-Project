import React, { useState, useEffect, useCallback } from "react";
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
import CircularProgress from "@material-ui/core/CircularProgress";

import { CoverImgComponent } from "./CoverImgComponent";
import { TextEditorComponent } from "./TextEditorComponent";
import MessageDialog from "../Dialog/MessageDialogComponent";
import { fetchData } from "../../libs/fetchData";
import { newPost } from "../../actions/postActions";

const useStyle = makeStyles((theme) => ({
  buttonSave: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: "#4fd9ff",
  },
  buttonDelete: {
    marginTop: theme.spacing(1),
    backgroundColor: "#ed4242",
  },
  formButton: {
    paddingTop: "2.5rem",
    display: "block",
    "@media (min-width:600px)": {
      paddingTop: "4.1rem",
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: "2.5rem",
    },
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  select: {
    width: "70%",
    display: "flex",
    marginBottom: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1) - 2,
  },
  title: {
    color: "black",
    fontSize: "2.5rem",
    "@media (min-width:600px)": {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.5rem",
    },
  },
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
}));

export const PostEditor = ({ author }) => {
  const classes = useStyle();
  const initPost = { title: "", description: "", content: "", coverImg: "" };
  const [post, setPost] = useState(initPost);
  const [notify, setNotify] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [activity, setActivity] = useState([]);
  const [display, setDisplay] = useState(false);
  const [reload, setReload] = useState(false);

  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    !display && window.scrollTo({ top: 0, behavior: "smooth" });
  }, [display]);

  const handleChange = (prop) => (event) => {
    setReload(false);
    setPost({ ...post, [prop]: event.target.value });
  };

  const getCoverImg = (img) => {
    setReload(false);
    setPost({ ...post, cover_img: img });
  };

  const getContent = (content) => {
    setReload(false);
    setPost({ ...post, content: content });
  };

  const checkValid = (newPost) => {
    let arrError = [];
    if (newPost.title == "" || newPost.title == undefined)
      arrError.push("Title is required!");
    if (newPost.description == "" || newPost.description == undefined)
      arrError.push("Description is required!");
    if (
      newPost.content == "" ||
      newPost.content == undefined ||
      newPost.content == "<p><br></p>"
    )
      arrError.push("Content is required!");
    if (arrError.length) {
      setNotify(arrError);
      return false;
    } else {
      arrError.push(
        "Make new post successfully. Waiting for admin approve your post!"
      );
      !newPost.activity_id && (newPost.activity_id = activity[0].id);
      setNotify(arrError);
      return true;
    }
  };

  const handleSave = () => {
    checkValid(post) ? handleAdd() : handleError();
  };

  const handleError = () => {
    setDisplay(true);
  };

  const handleAdd = () => {
    const new_post = {
      ...post,
      author_id: author.id,
      created_at: new Date().toISOString(),
    };
    newPost(new_post);
    setPost(initPost);
    setReload(true);
    setDisplay(true);
    forceUpdate();
  };

  const handleDelete = () => {
    setPost(initPost);
    setReload(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let unmounted = false;
    fetchData("http://localhost:4000/activity/get-activity").then((res) => {
      if (!unmounted) {
        setActivity(
          res.data.map((item) => {
            return {
              id: item._id,
              name: item.activity_name,
            };
          })
        );
      }
      setFetching(false);
    });
    return () => {
      unmounted = true;
    };
  }, []);

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
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
            defaultValue={activity[0].id}
            onChange={handleChange("activity_id")}
          >
            {activity.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
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

        <CoverImgComponent isReload={reload} getImg={getCoverImg} />
        <TextEditorComponent isReload={reload} getContent={getContent} />

        <div className={classes.formButton}>
          <Button className={classes.buttonSave} onClick={handleSave}>
            <SaveIcon className={classes.icon} />
            Save
          </Button>
          <Button className={classes.buttonDelete} onClick={handleDelete}>
            <DeleteIcon className={classes.icon} />
            Cannel
          </Button>
        </div>
      </form>
      {display && <MessageDialog setError={setDisplay} message={notify} />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { author: state.userReducer.user };
};

export default connect(mapStateToProps, null)(PostEditor);
