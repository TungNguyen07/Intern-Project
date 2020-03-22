import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import CardPostItem from "./CardPostItemComponent";
import { fetchData } from "../../libs/fetchData";
import { connect } from "react-redux";
const { SERVER_URL } = process.env;

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" },
  card: { marginTop: theme.spacing(1) }
}));

const ActivityPostComponent = ({ activity_id }) => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    console.log(activity_id);
    fetchData(`${SERVER_URL}/activity/${activity_id}`).then(res => {
      console.log(res);
      setPost(
        res.data.map(item => {
          return {
            cover_img: item.cover_img,
            title: item.title,
            description:
              item.description.length > 200
                ? item.description.slice(0, 200) + "..."
                : item.description,
            _id: item._id
          };
        })
      );
      setFetching(false);
    });
  }, [activity_id]);

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      {post.map(item => (
        <CardPostItem className={classes.card} key={item._id} post={item} />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return { activity_id: state.activityReducer.activity_id };
};

export default connect(mapStateToProps, null)(ActivityPostComponent);
