import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MaterialTable from "material-table";

import { adminActions } from "../../actions/adminActions";
import ViewProfileComponent from "../Dialog/ViewProfileComponent";
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
  const [action, setAction] = useState("");

  const ADD = "ADD";

  useEffect(() => {
    fetchData("http://localhost:4000/get-user").then(res => {
      setData(
        res.data.map(item => {
          return {
            staffId: item.staffId,
            fullname: item.fullname,
            username: item.username
          };
        })
      );
      setIsFetching(false);
    });
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

  useEffect(() => {
    if (action == ADD) {
      const newUser = data.slice(-1)[0];
      addUser(newUser);
      setAction("");
    }
  }, [action]);

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
          {
            icon: () => <AccountBoxIcon />,
            tooltip: "Profile",
            onClick: (event, rowData) => handleOpen(rowData)
          }
        ]}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const olddata = data;
                  olddata.push(newData);
                  setAction(ADD);
                  setData([...olddata]);
                }
                resolve();
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let initdata = data;
                  const index = initdata.indexOf(oldData);
                  const deleteUser = initdata[index];
                  initdata.splice(index, 1);
                  handleDelete(deleteUser);
                  setData([...initdata]);
                }
                resolve();
              }, 1000);
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
