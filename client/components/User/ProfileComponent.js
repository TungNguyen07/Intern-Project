import React, { useContext } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Title from "./TitleComponent";
import Avatar from "./AvatarComponent";
import Info from "./InfoComponent";
import { UserContext } from "../../contexts/userContext";

const useStyles = makeStyles(theme => ({
  hr: {
    width: "80%"
  },
  displayInfo: {
    display: "flex"
  }
}));

const access_user = JSON.parse(localStorage.getItem("access_user"));

const ProfileComponent = () => {
  const classes = useStyles();

  const [user, setUser] = useState(access_user.user);

  return (
    <Paper>
      <Title />
      <br />
      <hr className={classes.hr} />
      <div className={classes.displayInfo}>
        <Avatar user={user.user} />
        <Info info={user.user} />
      </div>
    </Paper>
  );
};

export default ProfileComponent;
