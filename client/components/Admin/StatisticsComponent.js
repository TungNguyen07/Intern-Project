import React, { useEffect, useState, useCallback } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import CategoryIcon from "@material-ui/icons/Category";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import CardItems from "./CardItemComponent";
import { fetchData } from "../../libs/fetchData";
import { connect } from "react-redux";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

const cardBorder = {
  width: "100%",
  height: "5rem",
  display: "flex",
  marginRight: 16,
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  icon: {
    fontSize: "3rem",
    opacity: 0.3,
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "3rem",
    },
  },
  grid: {
    display: "flex",
    paddingLeft: theme.spacing(2),
  },
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
}));

const StatisticComponent = ({ isChange }) => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [isFetching, setFetching] = useState(true);

  const fetchingData = (status) => {
    fetchData(`${SERVER_URL}/get-statistics-data`).then((res) => {
      if (!status) {
        setData(res.data);
        setFetching(false);
      }
    });
  };

  useEffect(() => {
    let unmouted = false;
    fetchingData(unmouted);
    return () => {
      unmouted = true;
    };
  }, []);

  useEffect(() => {
    let unmouted = false;
    isChange &&
      setTimeout(() => {
        fetchingData(unmouted);
      }, 500);
    return () => {
      unmouted = true;
    };
  }, [isChange]);

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <Container maxWidth="xl" className={classes.container}>
      <Grid item xs={12} className={classes.grid}>
        <CardItems
          className={classes.cardBorder}
          title="NHÂN VIÊN"
          icon={<PeopleAltIcon className={classes.icon} />}
          quantity={data.user}
          style={{ ...cardBorder, borderLeft: "5px solid #4e73df" }}
        />
        <CardItems
          title="HOẠT ĐỘNG"
          icon={<CategoryIcon className={classes.icon} />}
          quantity={data.activity}
          style={{ ...cardBorder, borderLeft: "5px solid #36b9cc" }}
        />
        <CardItems
          title="BÀI VIẾT"
          icon={<AssignmentIcon className={classes.icon} />}
          quantity={data.post}
          style={{ ...cardBorder, borderLeft: "5px solid #1cc88a" }}
        />
        <CardItems
          title="BÀI VIẾT ĐANG CHỜ"
          icon={<AssignmentLateIcon className={classes.icon} />}
          quantity={data.pendingPost}
          style={{ ...cardBorder, borderLeft: "5px solid #f6c23e" }}
        />
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isChange: state.adminReducer.isChange,
  };
};

export default connect(mapStateToProps, null)(StatisticComponent);
