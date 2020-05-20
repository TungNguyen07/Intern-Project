import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import BlockIcon from "@material-ui/icons/Block";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { fetchData } from "../../libs/fetchData";
import { adminActions } from "../../actions/adminActions";
import { approvePost, rejectPost } from "../../actions/postActions";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";
import PreviewPostConponent from "../Dialog/PreviewPostComponent";

const useStyles = makeStyles((theme) => ({
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
}));

const PendingPostTableComponent = ({ isChange }) => {
  const classes = useStyles();
  const columns = [
    { title: "Title", field: "title", width: "50%" },
    { title: "Author", field: "author" },
    { title: "id", field: "_id", hidden: true },
    { title: "Author id", field: "author_id", hidden: true },
  ];

  const [pendingPost, setPendingPost] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    let unmounted = false;
    fetchData(`${SERVER_URL}/post/get-pending-post`).then((res) => {
      if (!unmounted) {
        setPendingPost(
          res.data.map((item) => {
            return {
              title: item.title,
              author: item.fullname,
              _id: item._id,
              author_id: item.author_id,
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

  const handleApprove = (post) => {
    isChange(false);
    approvePost({ id: post.id, author_id: post.author_id });
    isChange(true);
  };

  const handleReject = (post) => {
    isChange(false);
    rejectPost({ id: post.id, author_id: post.author_id });
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
        title="Manage Pending Post"
        columns={columns}
        data={pendingPost}
        actions={[
          (rowData) => ({
            icon: () => <VisibilityIcon />,
            tooltip: "Preview",
            onClick: (event, rowData) => handleOpen(rowData),
          }),
          (rowData) => ({
            icon: () => <CheckCircleIcon />,
            tooltip: "Approve",
            onClick: (event, rowData) => {
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    let initdata = pendingPost;
                    const index = initdata.indexOf(rowData);
                    const approveItem = initdata[index];
                    initdata.splice(index, 1);
                    handleApprove({
                      id: approveItem._id,
                      author_id: approveItem.author_id,
                    });
                    setPendingPost([...initdata]);
                  }
                  resolve();
                }, 600);
              });
            },
          }),
          (rowData) => ({
            icon: () => <BlockIcon />,
            tooltip: "Reject",
            onClick: (event, rowData) => {
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    let initdata = pendingPost;
                    const index = initdata.indexOf(rowData);
                    const deletePost = initdata[index];
                    initdata.splice(index, 1);
                    handleReject({
                      id: deletePost._id,
                      author_id: deletePost.author_id,
                    });
                    setPendingPost([...initdata]);
                  }
                  resolve();
                }, 600);
              });
            },
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          tableLayout: "fixed",
          loadingType: "overlay",
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

export default connect(null, mapDispatchToProps)(PendingPostTableComponent);
