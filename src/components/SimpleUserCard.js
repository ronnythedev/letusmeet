import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
  },
  yourName: {
    fontSize: "30px",
    fontWeight: "bold",
  },
  yourTitle: {
    fontSize: "24px",
    color: "gray",
  },
  cardRoot: {
    top: "10px",
    position: "sticky",
  },
  large: {
    marginTop: "20px",
    marginBottom: "20px",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const SimpleUserCard = (props) => {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.cardRoot}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.item}>
          <Avatar alt="Remy Sharp" className={classes.large}>
            <PersonIcon />
          </Avatar>
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <Box className={classes.yourName}>
            {props.userFirstName}&nbsp;{props.userLastName}
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <Box className={classes.yourTitle}>{props.userTitle}</Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SimpleUserCard;
