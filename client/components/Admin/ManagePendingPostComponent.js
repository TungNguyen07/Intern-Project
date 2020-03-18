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

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" }
}));

const PendingPostTableComponent = (
  {
    //   addActivity,
    //   updateActivity,
    //   deleteActivity
  }
) => {
  const classes = useStyles();
  const columns = [
    { title: "Title", field: "title" },
    { title: "Author", field: "author" },
    { title: "id", field: "_id", hidden: true }
  ];

  const [pendingPost, setPendingPost] = useState([]);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    fetchData("http://localhost:4000/post/get-pending-post").then(res => {
      setPendingPost(
        res.data.map(item => {
          return {
            title: item.title,
            author: item.fullname,
            _id: item._id
          };
        })
      );
      setFetching(false);
    });
  }, []);

  useEffect(() => {
    console.log(pendingPost);
  }, [pendingPost]);

  // const handleAdd = newActivity => {
  //   addActivity(newActivity);
  // };

  //   const handleUpdate = activity => {
  //     updateActivity(activity);
  //   };

  //   const handleDelete = activity => {
  //     deleteActivity(activity);
  //   };

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
        {
          icon: () => <CheckCircleIcon />,
          tooltip: "Approve"
        },
        {
          icon: () => <BlockIcon />,
          tooltip: "Deny"
        }
      ]}
      options={{
        actionsColumnIndex: -1,
        tableLayout: "fixed"
      }}
    />
  );
};

export default PendingPostTableComponent;
