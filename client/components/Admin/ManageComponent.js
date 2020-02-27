import React from "react";
import CardItem from "./CardItemComponent";
import { Grid } from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({}));

const Dashboard = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CardItem icon={<PeopleAltIcon />} title="User" />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
