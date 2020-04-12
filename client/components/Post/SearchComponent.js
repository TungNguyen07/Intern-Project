import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Router from "next/router";
import Link from "next/link";

import { userActions } from "../../actions/userActions";
import { titleToURL } from "../../libs/changeTitleToURL";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: "1rem",
    width: "100%",
  },
  icon: {
    fontSize: "1.25rem",
    "@media (min-width:600px)": {
      fontSize: "0.750rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.25rem",
    },
  },
  input: {
    width: "60%",
    fontSize: "1rem",
    "@media (min-width:600px)": {
      fontSize: "0.700rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  },
}));

const SearchComponent = ({ setQuery }) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = () => {
    if (search) {
      setQuery(search);
      Router.push(`/search?query=${titleToURL(search.toLowerCase())}`);
    }
  };

  return (
    <Paper className={classes.paper}>
      <InputBase
        className={classes.input}
        placeholder="Search"
        onChange={handleChange}
      />
      <IconButton onClick={handleClick}>
        <SearchIcon className={classes.icon} />
      </IconButton>
    </Paper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setQuery: bindActionCreators(userActions.setQuery, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(SearchComponent);
