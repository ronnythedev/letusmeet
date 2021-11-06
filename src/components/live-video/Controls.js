import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MicOn from "@material-ui/icons/MicRounded";
import MicOff from "@material-ui/icons/MicOffRounded";
import VideoOn from "@material-ui/icons/VideocamRounded";
import VideoOff from "@material-ui/icons/VideocamOffRounded";
import HangUp from "@material-ui/icons/CallEndRounded";
import More from "@material-ui/icons/MoreHorizRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5px",
    backgroundColor: "#202124",
    minHeight: "80px",
  },
  controlContainer: {
    fontSize: "1rem",
    letterSpacing: "0.00625em",
    fontWeight: 500,
    color: "white",
    textAlign: "center",
  },
  regularButton: {
    backgroundColor: "#3c4043",
    color: "white",
    "&:hover": {
      backgroundColor: "#3c4043",
    },
  },
  redButton: {
    backgroundColor: "#ea4335",
    color: "white",
    "&:hover": {
      backgroundColor: "#ea4335",
    },
  },
  blueButton: {
    backgroundColor: "#1a73e8",
    color: "white",
    "&:hover": {
      backgroundColor: "#1a73e8",
    },
  },
  controlItem: {
    display: "flex",
    justifyContent: "center",
  },
  controlItemRight: {
    display: "flex",
    justifyContent: "end",
    marginRight: "15px",
  },
}));

const VideoControls = () => {
  const classes = useStyles();
  const [micIsOn, setMicIsOn] = useState(true);
  const [cameraIsOn, setCameraIsOn] = useState(true);

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={3} className={classes.controlContainer}>
          <span>Meeting Id: 12345</span>
        </Grid>
        <Grid item xs={6} className={classes.controlContainer}>
          <Grid container spacing={2}>
            <Grid item xs={4} className={classes.controlItem}>
              <IconButton
                className={micIsOn ? classes.regularButton : classes.redButton}
                onClick={() => {
                  setMicIsOn(!micIsOn);
                }}
              >
                {micIsOn ? <MicOn /> : <MicOff />}
              </IconButton>
            </Grid>
            <Grid item xs={4} className={classes.controlItem}>
              <IconButton
                className={
                  cameraIsOn ? classes.regularButton : classes.redButton
                }
                onClick={() => {
                  setCameraIsOn(!cameraIsOn);
                }}
              >
                {cameraIsOn ? <VideoOn /> : <VideoOff />}
              </IconButton>
            </Grid>
            <Grid item xs={4} className={classes.controlItem}>
              <IconButton className={classes.redButton}>
                <HangUp />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} className={classes.controlContainer}>
          <Grid item xs={12} className={classes.controlItemRight}>
            <IconButton className={classes.blueButton}>
              <More />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoControls;
