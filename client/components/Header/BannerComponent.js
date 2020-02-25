import React from "react";
// import banner from "../../public/images/top_banner.svg";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import BannerImage from "./BannerImage";

const Banner = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid item xs={12}>
          <BannerImage />
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Banner;
