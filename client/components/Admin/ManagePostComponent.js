import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
const { SERVER_URL } = process.env;
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchData } from "../../libs/fetchData";
import { deletePost } from "../../actions/postActions";
import { adminActions } from "../../actions/adminActions";

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" }
}));

const PostTableComponent = ({ isChange }) => {
  const classes = useStyles();
  const columns = [
    {
      title: "Title",
      field: "title",
      width: "50%"
    },
    { title: "Activity", field: "activity" },
    { title: "Author", field: "author" },
    { title: "_id", field: "_id", hidden: true }
  ];
  const [activePost, setActivePost] = useState([]);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    let unmounted = false;
    fetchData(`${SERVER_URL}/post/get-active-post`).then(res => {
      if (!unmounted) {
        setActivePost(
          res.data.map(item => {
            return {
              title: item.title,
              activity: item.activity,
              author: item.fullname,
              _id: item._id
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

  const handleDelete = post => {
    isChange(false);
    deletePost(post._id);
    isChange(true);
  };

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <MaterialTable
      title="Manage Post"
      columns={columns}
      data={activePost}
      localization={{
        body: {
          editRow: {
            deleteText: "Are you sure want to delete this post?"
          }
        }
      }}
      actions={[
        rowData => ({
          icon: () => <div />,
          disabled: true
        })
      ]}
      options={{
        actionsColumnIndex: -1,
        tableLayout: "fixed"
      }}
      editable={{
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              {
                const oldPost = activePost;
                oldPost.splice(oldPost.indexOf(oldData), 1);
                handleDelete(oldData);
                setActivePost([...oldPost]);
              }
              resolve();
            }, 600);
          })
      }}
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    isChange: bindActionCreators(adminActions.isChange, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(PostTableComponent);
