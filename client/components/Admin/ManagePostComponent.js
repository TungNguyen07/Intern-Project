import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { fetchData } from "../../libs/fetchData";
import { deletePost } from "../../actions/postActions";
import { adminActions } from "../../actions/adminActions";
import PreviewPostConponent from "../Dialog/PreviewPostComponent";

const useStyles = makeStyles((theme) => ({
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
}));

const PostTableComponent = ({ isChange }) => {
  const classes = useStyles();
  const columns = [
    {
      title: "Title",
      field: "title",
      width: "50%",
    },
    { title: "Activity", field: "activity" },
    { title: "Author", field: "author" },
    { title: "_id", field: "_id", hidden: true },
  ];
  const [activePost, setActivePost] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    let unmounted = false;
    fetchData(`${SERVER_URL}/post/get-active-post`).then((res) => {
      if (!unmounted) {
        setActivePost(
          res.data.map((item) => {
            return {
              title: item.title,
              activity: item.activity,
              author: item.fullname,
              _id: item._id,
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

  const handleDelete = (post) => {
    isChange(false);
    deletePost(post._id);
    isChange(true);
  };

  const handleOpen = (rowData) => {
    setData(rowData);
    setOpen(true);
  };

  const handleClose = (isClose) => {
    setOpen(isClose);
  };

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <MaterialTable
        title="Manage Post"
        columns={columns}
        data={activePost}
        localization={{
          body: {
            editRow: {
              deleteText: "Are you sure want to delete this post?",
            },
          },
        }}
        actions={[
          (rowData) => ({
            icon: () => <VisibilityIcon />,
            tooltip: "Preview",
            onClick: (event, rowData) => handleOpen(rowData),
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          tableLayout: "fixed",
        }}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                {
                  const oldPost = activePost;
                  oldPost.splice(oldPost.indexOf(oldData), 1);
                  handleDelete(oldData);
                  setActivePost([...oldPost]);
                }
                resolve();
              }, 600);
            }),
        }}
      />
      <PreviewPostConponent
        isOpen={open}
        isClose={handleClose}
        rowData={data}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    isChange: bindActionCreators(adminActions.isChange, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(PostTableComponent);
