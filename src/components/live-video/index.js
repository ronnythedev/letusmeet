import React from "react";
import VideoControls from "./Controls";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5px",
    backgroundColor: "rgba(0,0,0,0.87)",
  },
  videoContainer: {
    minHeight: "500px",
    padding: "15px !important",
  },
  bigVideo: {
    backgroundColor: "#3C4043",
    border: "none",
    boxShadow: "none",
    borderRadius: "4px",
    height: "100%",
    marginRight: "15%",
    marginLeft: "15%",
  },
  smallVideo: {
    backgroundColor: "#4A4E51",
    position: "absolute",
    minHeight: "135px",
    minWidth: "235px",
    bottom: "240px",
    marginRight: "20px",
    borderRadius: "4px",
    right: "0px",
    marginRight: "17%",
    marginLeft: "15%",
  },
}));

const LiveVideoComponent = () => {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }} className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.videoContainer}>
          <Box className={classes.bigVideo}></Box>
          <Box className={classes.smallVideo}></Box>
        </Grid>

        <VideoControls />
      </Grid>
    </Box>
  );
};

export default LiveVideoComponent;
