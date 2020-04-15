import React, { useState } from "react";
import { IconButton, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { userActions } from "../../actions/userActions";

const AvatarComponent = ({ avatar, Signout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Avatar src={avatar} />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={"bottom-end"}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Link href="/profile">
                <MenuItem>Profile</MenuItem>
              </Link>
              <Link href="/change-password">
                <MenuItem>Change password</MenuItem>
              </Link>
              <Link href="/create-post">
                <MenuItem>Create post</MenuItem>
              </Link>
              <MenuItem onClick={Signout}>Logout</MenuItem>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return { Signout: bindActionCreators(userActions.Signout, dispatch) };
};

export default connect(null, mapDispatchToProps)(AvatarComponent);
