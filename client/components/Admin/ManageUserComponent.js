import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

import { adminActions } from "../../actions/adminActions";
import AddNewUserComponent from "../Dialog/AddNewUserComponent";

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: "15%"
  },
  div: { textAlign: "center" }
}));

const UserTableComponent = ({ addUser, allUser }) => {
  const classes = useStyles();
  const columns = [
    {
      title: "Avatar",
      field: "avatar",
      editable: "never",
      sorting: false,
      render: data => (
        <img
          style={{ height: 36, borderRadius: "50%" }}
          src={data.avatar || ""}
        />
      )
    },
    { title: "Staff ID", field: "staffId" },
    { title: "Fullname", field: "fullname" },
    { title: "Username", field: "username" }
  ];

  const [user, setUser] = useState(allUser);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsFetching(true);
    setData(
      user.map(eachUser => {
        return {
          avatar: eachUser.avatar,
          staffId: eachUser.staffId,
          fullname: eachUser.fullname,
          username: eachUser.username
        };
      })
    );
    setIsFetching(false);
  }, [allUser]);

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <MaterialTable
      title="TOTAL USER"
      columns={columns}
      data={data}
      actions={[
        {
          icon: () => <AccessTimeIcon />,
          tooltip: "Save User",
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        },
        rowData => ({
          icon: "delete",
          tooltip: "Delete User",
          onClick: (event, rowData) =>
            confirm("You want to delete " + rowData.name),
          disabled: rowData.birthYear < 2000
        })
      ]}
      editable={{
        onRowAdd: newData => {
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setUser(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
              addUser(newData);
            }, 600);
          });
        }
      }}
      options={{
        actionsColumnIndex: -1,
        draggable: false
      }}
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addUser: bindActionCreators(adminActions.addUser, dispatch)
  };
};

const mapStateToProps = state => {
  return { allUser: state.adminReducer.user };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTableComponent);
