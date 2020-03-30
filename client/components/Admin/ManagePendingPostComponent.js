import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import BlockIcon from "@material-ui/icons/Block";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchData } from "../../libs/fetchData";
import { adminActions } from "../../actions/adminActions";
import { postActions, approvePost, denyPost } from "../../actions/postActions";
const { SERVER_URL } = process.env;

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" }
}));

const PendingPostTableComponent = ({ isChange }) => {
  const classes = useStyles();
  const columns = [
    { title: "Title", field: "title", width: "50%" },
    { title: "Author", field: "author" },
    { title: "id", field: "_id", hidden: true }
  ];

  const [pendingPost, setPendingPost] = useState([]);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    let unmounted = false;
    fetchData(`${SERVER_URL}/post/get-pending-post`).then(res => {
      if (!unmounted) {
        setPendingPost(
          res.data.map(item => {
            return {
              title: item.title,
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

  const handleApprove = postId => {
    isChange(false);
    approvePost({ id: postId });
    isChange(true);
  };

  const handleDeny = postId => {
    isChange(false);
    denyPost({ id: postId });
    isChange(true);
  };

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <MaterialTable
      title="Manage Pending Post"
      columns={columns}
      data={pendingPost}
      actions={[
        rowData => ({
          icon: () => <CheckCircleIcon />,
          tooltip: "Approve",
          onClick: (event, rowData) => {
            console.log(event);
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let initdata = pendingPost;
                  const index = initdata.indexOf(rowData);
                  const approveItem = initdata[index];
                  initdata.splice(index, 1);
                  handleApprove(approveItem._id);
                  setPendingPost([...initdata]);
                }
                resolve();
              }, 600);
            });
          }
        }),
        rowData => ({
          icon: () => <BlockIcon />,
          tooltip: "Deny",
          onClick: (event, rowData) => {
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let initdata = pendingPost;
                  const index = initdata.indexOf(rowData);
                  const deletePost = initdata[index];
                  initdata.splice(index, 1);
                  handleDeny(deletePost);
                  setPendingPost([...initdata]);
                }
                resolve();
              }, 600);
            });
          }
        })
      ]}
      options={{
        actionsColumnIndex: -1,
        tableLayout: "fixed",
        loadingType: "overlay"
      }}
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    isChange: bindActionCreators(adminActions.isChange, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(PendingPostTableComponent);
