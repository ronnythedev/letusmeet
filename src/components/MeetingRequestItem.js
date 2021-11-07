import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CalendarIcon from "@material-ui/icons/CalendarTodayRounded";
import TimeIcon from "@material-ui/icons/ScheduleRounded";
import MessageIcon from "@material-ui/icons/MessageRounded";
import SubjectIcon from "@material-ui/icons/SubjectRounded";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "10px",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
  },
  infoContainer: {
    marginLeft: "5px",
  },
  userName: {
    fontSize: "24px",
    fontWeight: "bold",
  },
}));

const MeetingRequestItem = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.root}>
      <Paper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2} className={classes.infoContainer}>
              <Grid item xs={12}>
                <Box className={classes.userName}>{props.name}</Box>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <CalendarIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <span>Fecha de Reunión: {props.meetingDate}</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <TimeIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <span>Hora: {props.meetingTime}</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <MessageIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <span>Tema: {props.meetingSubject}</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <SubjectIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <span>
                      Notas adicionales: {props.meetingAdditionalNotes}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} className={classes.buttonsContainer}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button variant="contained" color="secondary">
                  Declinar
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary">
                  Confirmar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default MeetingRequestItem;
