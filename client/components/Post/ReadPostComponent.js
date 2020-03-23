import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { fetchData } from "../../libs/fetchData";

const { SERVER_URL } = process.env;

const useStyles = makeStyles({
  content: {
    padding: 15,
    "& img": {
      maxWidth: "100%"
    },
    "& .ql-align-justify": {
      textAlign: "start"
    }
  }
});

const ReadPostComponent = ({ getTitle }) => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const post_id = localStorage.getItem("post_id");
    fetchData(`${SERVER_URL}/post/get-post/${post_id}`).then(res => {
      setPost(res.data);
      setFetching(false);
      getTitle(post.title);
    });
  }, []);

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.created_at}</p>
      <div
        className={classes.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

// const mapStateToProps = state => {
//   return {
//     post_id: state.postReducer.post_id
//   };
// };

export default ReadPostComponent;
