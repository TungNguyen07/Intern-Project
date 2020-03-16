import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import CategoryIcon from "@material-ui/icons/Category";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import { makeStyles } from "@material-ui/styles";

import CardItems from "./CardItemComponent";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  icon: {
    fontSize: "3rem",
    opacity: 0.3
  },
  grid: {
    display: "flex",
    paddingLeft: theme.spacing(2)
  }
}));

const StatisticComponent = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid item xs={12} className={classes.grid}>
        <CardItems
          title="USER"
          icon={<PeopleAltIcon className={classes.icon} />}
          quantity={20}
        />
        <CardItems
          title="ACTIVITY"
          icon={<CategoryIcon className={classes.icon} />}
          quantity={20}
        />
        <CardItems
          title="POST"
          icon={<AssignmentIcon className={classes.icon} />}
          quantity={20}
        />
        <CardItems
          title="PENDING POST"
          icon={<AssignmentLateIcon className={classes.icon} />}
          quantity={20}
        />
      </Grid>
    </Container>
  );
};

export default StatisticComponent;
