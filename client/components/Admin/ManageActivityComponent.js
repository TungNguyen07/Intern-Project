import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

import { fetchData } from "../../libs/fetchData";
import { adminActions } from "../../actions/adminActions";
import MessageDialog from "../Dialog/MessageDialogComponent";

const useStyles = makeStyles((theme) => ({
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
}));

const ActivityTableComponent = ({ isChange }) => {
  const classes = useStyles();
  const columns = [
    { title: "Activity", field: "activity_name" },
    { title: "Description", field: "description" },
    { title: "Id", field: "_id", hidden: true },
  ];

  const [activity, setActivity] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    let unmouted = false;
    fetchData(`${SERVER_URL}/activity/get-activity`).then((res) => {
      if (!unmouted) {
        setActivity(
          res.data.map((item) => {
            return {
              activity_name: item.activity_name,
              description: item.description,
              _id: item._id,
            };
          })
        );
      }
      setFetching(false);
    });
    return () => {
      unmouted = true;
    };
  }, []);

  const checkValid = (newActivity) => {
    let valid = true;
    if (newActivity.activity_name) {
      for (let item of activity) {
        if (
          newActivity.activity_name.toLowerCase() ==
          item.activity_name.toLowerCase()
        ) {
          valid = false;
          break;
        }
      }
    } else valid = false;
    return valid;
  };

  const handleAdd = (newActivity) => {
    isChange(false);
    adminActions.addActivity(newActivity);
    setActivity([...activity, newActivity]);
    isChange(true);
  };

  const handleUpdate = (activity) => {
    adminActions.updateActivity(activity);
  };

  const handleDelete = (activity) => {
    isChange(false);
    adminActions.deleteActivity(activity);
    isChange(true);
  };

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <MaterialTable
        title="Manage Activity"
        columns={columns}
        data={activity}
        options={{
          actionsColumnIndex: -1,
          tableLayout: "fixed",
        }}
        localization={{
          body: {
            editRow: {
              deleteText:
                "Delete Activity will also delete all Post of this Activity!",
            },
          },
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  if (!checkValid(newData)) reject(setError(true));
                  else handleAdd(newData);
                }
                resolve();
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                {
                  const oldActivity = activity;
                  oldActivity[oldActivity.indexOf(oldData)] = newData;
                  handleUpdate(newData);
                  setActivity([...oldActivity]);
                }
                resolve();
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                {
                  const oldActivity = activity;
                  oldActivity.splice(oldActivity.indexOf(oldData), 1);
                  handleDelete(oldData);
                  setActivity([...oldActivity]);
                }
                resolve();
              }, 600);
            }),
        }}
      />
      {isError && (
        <MessageDialog
          setError={setError}
          message={["Invalid Activity name"]}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    isChange: bindActionCreators(adminActions.isChange, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(ActivityTableComponent);
