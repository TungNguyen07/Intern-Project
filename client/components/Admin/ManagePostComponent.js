import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
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

const PostTableComponent = (
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
    { title: "_id", field: "_id", hidden: true }
  ];
  const [activePost, setActivePost] = useState([]);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    fetchData("http://localhost:4000/post/get-active-post").then(res => {
      setActivePost(
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

  //   const handleAdd = newActivity => {
  //     addActivity(newActivity);
  //   };

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
      title="Manage Post"
      columns={columns}
      data={activePost}
      actions={[
        {
          icon: () => <div />,
          disabled: true
        }
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
                // const oldActivity = activity;
                // oldActivity.splice(oldActivity.indexOf(oldData), 1);
                // handleDelete(oldData);
                // setActivity([...oldActivity]);
              }
              resolve();
            }, 600);
          })
      }}
    />
  );
};

export default PostTableComponent;
