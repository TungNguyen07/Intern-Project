import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
const { SERVER_URL } = process.env;

import { fetchData } from "../../libs/fetchData";
import { adminActions } from "../../actions/adminActions";
import MessageDialog from "../Dialog/MessageDialogComponent";

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" }
}));

const ActivityTableComponent = ({
  addActivity,
  updateActivity,
  deleteActivity
}) => {
  const classes = useStyles();
  const columns = [
    { title: "Activity", field: "activity_name" },
    { title: "Description", field: "description" },
    { title: "Id", field: "_id", hidden: true }
  ];

  const [activity, setActivity] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    let unmouted = false;
    fetchData(`${SERVER_URL}/activity/get-activity`).then(res => {
      if (!unmouted) {
        setActivity(
          res.data.map(item => {
            return {
              activity_name: item.activity_name,
              description: item.description,
              _id: item._id
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

  const checkValid = newActivity => {
    let valid = true;
    for (let item of activity) {
      if (newActivity.activity_name == item.activity_name) {
        valid = false;
        break;
      }
    }
    return valid;
  };

  const handleAdd = newActivity => {
    addActivity(newActivity);
    setActivity([...activity, newActivity]);
  };

  const handleUpdate = activity => {
    updateActivity(activity);
  };

  const handleDelete = activity => {
    deleteActivity(activity);
  };

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <MaterialTable
        title="Editable Example"
        columns={columns}
        data={activity}
        options={{
          actionsColumnIndex: -1,
          tableLayout: "fixed"
        }}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  checkValid(newData)
                    ? handleAdd(newData)
                    : reject(setError(true));
                }
                resolve();
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
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
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                {
                  const oldActivity = activity;
                  oldActivity.splice(oldActivity.indexOf(oldData), 1);
                  handleDelete(oldData);
                  setActivity([...oldActivity]);
                }
                resolve();
              }, 600);
            })
        }}
      />
      {isError && (
        <MessageDialog
          setError={setError}
          message={["Duplicate Activity name"]}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addActivity: bindActionCreators(adminActions.addActivity, dispatch),
    updateActivity: bindActionCreators(adminActions.updateActivity, dispatch),
    deleteActivity: bindActionCreators(adminActions.deleteActivity, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(ActivityTableComponent);
