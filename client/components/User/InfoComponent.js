import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import EditInfoComponent from "../Dialog/EditInfoComponent";

const useStyles = makeStyles((theme) => ({
  fullname: {
    marginLeft: "5rem",
    marginBottom: "1rem",
    fontSize: "2.3rem",
    "@media (min-width:600px)": {
      fontSize: "1.6rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.3rem",
    },
  },
  otherInfo: {
    textAlign: "left",
    marginLeft: "5rem",
    marginBottom: "1rem",
  },
  groupInfo: {
    display: "flex",
  },
  displayInfo: {
    marginLeft: "3rem",
    textAlign: "left",
  },
  root: {
    display: "flex",
  },
  div: {
    marginTop: "-0.550rem",
  },
}));

export const InfoComponent = ({ user }) => {
  const classes = useStyles();

  // useEffect(() => {
  //   console.log("info", user);
  // }, []);

  return (
    <div>
      {user && (
        <div>
          <div className={classes.root}>
            <Typography variant="h3" className={classes.fullname}>
              {user.fullname}
            </Typography>
            <div className={classes.div}>
              <EditInfoComponent />
            </div>
          </div>

          <div className={classes.groupInfo}>
            <div className={classes.otherInfo}>
              <Typography variant="subtitle1">Mã nhân viên: </Typography>
              <Typography variant="subtitle1">Giới tính: </Typography>
              <Typography variant="subtitle1">Ngày sinh: </Typography>
              <Typography variant="subtitle1">Số điện thoại: </Typography>
              <Typography variant="subtitle1">Email: </Typography>
              <Typography variant="subtitle1">Địa chỉ: </Typography>
            </div>
            <div className={classes.displayInfo}>
              <Typography variant="subtitle1">{user.staff_id}</Typography>
              <Typography variant="subtitle1">
                {parseInt(user.gender) ? "Nam" : "Nữ"}
              </Typography>
              <Typography variant="subtitle1">
                {new Date(user.birth_date).toLocaleDateString()}
              </Typography>
              <Typography variant="subtitle1">{user.phone_number}</Typography>
              <Typography variant="subtitle1">{user.email}</Typography>
              <Typography variant="subtitle1">{user.address}</Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// const mapStateToProps = state => {
//   return { user: state.userReducer.user };
// };

// export default connect(mapStateToProps, null)(InfoComponent);
