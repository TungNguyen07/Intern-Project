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

const useStyles = makeStyles({
  paper: {
    marginBottom: "1rem"
  }
});

const SearchComponent = ({ setQuery }) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleClick = () => {
    if (search) {
      setQuery(search);
    }
  };

  return (
    <Paper className={classes.paper}>
      <InputBase placeholder="Search" onChange={handleChange} />
      <Link
        href="/search"
        as={`/search?query=${titleToURL(search.toLowerCase())}`}
      >
        <IconButton onClick={handleClick}>
          <SearchIcon />
        </IconButton>
      </Link>
    </Paper>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setQuery: bindActionCreators(userActions.setQuery, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(SearchComponent);
