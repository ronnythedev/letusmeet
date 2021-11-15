import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Webcam from "react-webcam";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  container: {
    paddingLeft: "40px",
    paddingBottom: "20px",
    paddingRight: "40px",
  },
  item: {
    display: "flex",
    justifyContent: "center",
  },
  textWidth: {
    width: "70%",
  },
  warnText: {
    color: "gray",
    fontSize: "14px",
    textTransform: "uppercase",
  },
  video: {
    height: "100%",
    width: "100%",
  },
}));

const MeetingJoin = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [roomPin, setRoomPin] = useState("");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    setRoomId(props.roomId);
    history.replace("/meeting-join");
  }, []);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Paper elevation={3} className={classes.container}>
            <Grid container spacing={2}>
              <Grid item xs={12} className={classes.item}>
                <span className={classes.title}>
                  Así se verá tu video en la reunión
                </span>
              </Grid>
              <Grid item xs={12}>
                <Webcam className={classes.video} />
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <span className={classes.warnText}>
                  Antes de ingresar, ajusta la cámara de ser necesario
                </span>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper elevation={3} className={classes.container}>
            <Grid container spacing={2}>
              <Grid item xs={12} className={classes.item}>
                <span className={classes.title}>
                  Ingresa el PIN de la reunión
                </span>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <TextField
                  required
                  label="PIN"
                  variant="outlined"
                  className={classes.textWidth}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6} className={classes.item}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        history.goBack();
                      }}
                    >
                      Volver
                    </Button>
                  </Grid>
                  <Grid item xs={6} className={classes.item}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={roomPin === ""}
                    >
                      Ingresar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MeetingJoin;
