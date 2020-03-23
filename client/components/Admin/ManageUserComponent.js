import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MaterialTable from "material-table";
const { SERVER_URL } = process.env;

import { adminActions } from "../../actions/adminActions";
import ViewProfileComponent from "../Dialog/ViewProfileComponent";
import MessageDialog from "../Dialog/MessageDialogComponent";
import { fetchData } from "../../libs/fetchData";

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" },
  button: {
    position: "absolute",
    opacity: 0
  }
}));

const UserTableComponent = ({ addUser, deleteUser }) => {
  const classes = useStyles();
  const columns = [
    { title: "Staff ID", field: "staffId" },
    { title: "Fullname", field: "fullname" },
    { title: "Username", field: "username" }
  ];

  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [rowData, setRowdata] = useState({});
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState([]);

  useEffect(() => {
    let unmounted = false;
    fetchData(`${SERVER_URL}/get-user`).then(res => {
      if (!unmounted) {
        setData(
          res.data.map(item => {
            return {
              staffId: item.staffId,
              fullname: item.fullname,
              username: item.username
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

  const handleOpen = rowData => {
    setOpen(true), setRowdata(rowData);
  };

  const handleClose = isClose => {
    setOpen(isClose);
  };

  const handleDelete = user => {
    deleteUser({ staffId: user.staffId });
  };

  const checkValid = newUser => {
    let arrError = [];
    if (newUser.staffId == "" || newUser.staffId == undefined)
      arrError.push("Staff Id is required!");
    if (newUser.fullname == "" || newUser.fullname == undefined)
      arrError.push("Fullname Id is required!");
    if (newUser.username == "" || newUser.username == undefined)
      arrError.push("Username Id is required!");
    if (newUser.staffId) {
      if (newUser.staffId.length < 5)
        arrError.push("Staff Id must be at least 5 charaters!");
    }
    if (newUser.username) {
      if (newUser.username.length < 5)
        arrError.push("Username must be at least 5 charaters!");
    }

    for (let user of data) {
      if (user.staffId == newUser.staffId || user.username == newUser.username)
        arrError.push("Duplicate Staff Id or Username!");
    }

    if (arrError.length) {
      setError(arrError);
      return false;
    } else return true;
  };

  const handleAdd = newUser => {
    addUser(newUser);
    setData([...data, newUser]);
  };

  const handleDeleteAdmin = () => {
    setError(["Cannot delete user admin!"]);
    setIsError(true);
  };

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <MaterialTable
        title="MANAGE USER"
        columns={columns}
        data={data}
        actions={[
          rowData => ({
            icon: () => <AccountBoxIcon />,
            tooltip: "Profile",
            onClick: (event, rowData) => handleOpen(rowData)
          })
        ]}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  if (!checkValid(newData)) reject(setIsError(true));
                  else handleAdd(newData);
                }
                resolve();
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  if (oldData.staffId == "admin") reject(handleDeleteAdmin());
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
            })
        }}
        options={{
          actionsColumnIndex: -1
        }}
      />
      <ViewProfileComponent
        user={rowData}
        isOpen={isOpen}
        isClose={handleClose}
      />
      {isError && <MessageDialog setError={setIsError} message={error} />}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addUser: bindActionCreators(adminActions.addUser, dispatch),
    deleteUser: bindActionCreators(adminActions.deleteUser, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(UserTableComponent);
