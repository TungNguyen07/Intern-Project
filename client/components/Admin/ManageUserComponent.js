import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CachedIcon from "@material-ui/icons/Cached";
import MaterialTable from "material-table";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

import { adminActions } from "../../actions/adminActions";
import ViewProfileComponent from "../Dialog/ViewProfileComponent";
import MessageDialog from "../Dialog/MessageDialogComponent";
import { fetchData } from "../../libs/fetchData";
import { postData } from "../../libs/postData";
import AlertDialog from "../Dialog/AlertDialogComponent";

const useStyles = makeStyles((theme) => ({
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
  button: {
    position: "absolute",
    opacity: 0,
  },
}));

const UserTableComponent = ({ isChange }) => {
  const classes = useStyles();
  const columns = [
    { title: "Staff ID", field: "staff_id" },
    { title: "Fullname", field: "fullname" },
    { title: "Username", field: "username" },
  ];

  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [rowData, setRowdata] = useState({});
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertResult, setAlertResult] = useState("");
  const [expectedResult, setExpectedResult] = useState("");
  const [target, setTarget] = useState({});

  useEffect(() => {
    let unmounted = false;
    fetchData(`${SERVER_URL}/get-user`).then((res) => {
      if (!unmounted) {
        setData(
          res.data.map((item) => {
            return {
              staff_id: item.staff_id,
              fullname: item.fullname,
              username: item.username,
            };
          })
        );
      }
      setIsFetching(false);
    });
    return () => {
      unmounted = true;
    };
  }, []);

  const handleOpen = (rowData) => {
    setOpen(true), setRowdata(rowData);
  };

  const handleClose = (isClose) => {
    setOpen(isClose);
    setRowdata({});
  };

  const handleDelete = (user) => {
    isChange(false);
    adminActions.deleteUser({ staff_id: user.staff_id });
    isChange(true);
  };

  const checkValid = (newUser) => {
    let arrError = [];
    if (newUser.staff_id == "" || newUser.staff_id == undefined)
      arrError.push("Staff Id is required!");
    if (newUser.fullname == "" || newUser.fullname == undefined)
      arrError.push("Fullname Id is required!");
    if (newUser.username == "" || newUser.username == undefined)
      arrError.push("Username Id is required!");
    if (newUser.staff_id) {
      if (newUser.staff_id.length < 5)
        arrError.push("Staff Id must be at least 5 charaters!");
    }
    if (newUser.username) {
      if (newUser.username.length < 5)
        arrError.push("Username must be at least 5 charaters!");
    }

    for (let user of data) {
      if (
        user.staff_id.toLowerCase() == newUser.staff_id.toLowerCase() ||
        user.username.toLowerCase() == newUser.username.toLowerCase()
      )
        arrError.push("Duplicate Staff Id or Username!");
    }

    if (arrError.length) {
      setError(arrError);
      return false;
    } else return true;
  };

  const handleAdd = (newUser) => {
    isChange(false);
    adminActions.addUser(newUser);
    setData([...data, newUser]);
    isChange(true);
  };

  const handleDeleteAdmin = () => {
    setError(["Cannot delete user admin!"]);
    setIsError(true);
  };

  const handleReset = (user) => {
    setExpectedResult("RESET_PASSWORD");
    setTarget(user);
    setAlertResult("");
    setAlert(true);
  };

  useEffect(() => {
    if (alertResult == "RESET_PASSWORD") {
      postData(`${SERVER_URL}/profile/reset-password`, {
        staff_id: target.staff_id,
      }).then((res) => {
        if (res.success) {
          setError(["Reset password successfully!"]), setIsError(true);
        }
      });
    }
    setExpectedResult("");
  }, [alertResult]);

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <MaterialTable
        title="Manage User"
        columns={columns}
        data={data}
        localization={{
          body: {
            editRow: {
              deleteText: "Are you sure want to delete this user?",
            },
          },
        }}
        actions={[
          (rowData) => ({
            icon: () => <AccountBoxIcon />,
            tooltip: "Profile",
            onClick: (event, rowData) => handleOpen(rowData),
          }),
          (rowData) => ({
            icon: () => <CachedIcon />,
            tooltip: "Reset password",
            onClick: (event, rowData) => handleReset(rowData),
          }),
        ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  if (!checkValid(newData)) reject(setIsError(true));
                  else handleAdd(newData);
                }
                resolve();
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  if (oldData.staff_id == "admin") reject(handleDeleteAdmin());
                  else {
                    let initdata = data;
                    const index = initdata.indexOf(oldData);
                    const deleteUser = initdata[index];
                    initdata.splice(index, 1);
                    handleDelete(deleteUser);
                    setData([...initdata]);
                  }
                }

                resolve();
              }, 600);
            }),
        }}
        options={{
          actionsColumnIndex: -1,
        }}
      />
      <ViewProfileComponent
        user={rowData}
        isOpen={isOpen}
        isClose={handleClose}
      />
      {alert && (
        <AlertDialog
          message="Are you sure want to reset password this account?"
          setDisplay={setAlert}
          btnOK={setAlertResult}
          expectedResult={expectedResult}
        />
      )}
      {isError && <MessageDialog setError={setIsError} message={error} />}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    isChange: bindActionCreators(adminActions.isChange, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(UserTableComponent);
