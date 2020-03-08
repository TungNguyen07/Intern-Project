import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4)
  },
  hr: {
    width: "80%"
  },
  cardImage: {
    borderRadius: 5
  },
  cardItem: {
    margin: "auto",
    marginTop: theme.spacing(2)
  },
  title: {
    paddingTop: "1rem",
    display: "inline-flex"
  },
  icon: {
    fontSize: "2.5rem",
    marginBottom: "-0.5rem",
    marginLeft: theme.spacing(1)
  },
  link: {
    "&:visited": {
      color: "inherit"
    }
  }
}));

const UserPostComponent = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <h1 className={classes.title}>Your Post</h1>
        <Link href="/create-post">
          <PostAddIcon className={classes.icon} />
        </Link>

        <hr className={classes.hr} />
        <Grid container spacing={0}>
          <Grid item xs={3} className={classes.cardItem}>
            <CardActionArea>
              <CardMedia
                className={classes.cardImage}
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Grid>
          <Grid item xs={3} className={classes.cardItem}>
            <CardActionArea>
              <CardMedia
                className={classes.cardImage}
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Grid>
          <Grid item xs={3} className={classes.cardItem}>
            <CardActionArea>
              <CardMedia
                className={classes.cardImage}
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};
export default UserPostComponent;
