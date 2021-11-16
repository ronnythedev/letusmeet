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

import { format } from "date-fns";

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

  const processHourKey = (hourKey) => {
    let firstHourAmPm = "AM";
    let secondHourAmPm = "AM";

    let hours = hourKey.split("-");

    let firstHour = parseInt(hours[0]) / 100;

    if (firstHour >= 12) {
      firstHourAmPm = "PM";
    }

    if (firstHour > 12) {
      firstHour = firstHour - 12;
    }

    let secondHour = parseInt(hours[1]) / 100;
    if (secondHour >= 12) {
      secondHourAmPm = "PM";
    }

    if (secondHour > 12) {
      secondHour = secondHour - 12;
    }

    return `${firstHour}:00 ${firstHourAmPm} - ${secondHour}:00 ${secondHourAmPm}`;
  };

  return (
    <Grid item xs={12} className={classes.root}>
      <Paper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2} className={classes.infoContainer}>
              <Grid item xs={12}>
                <Box className={classes.userName}>{props.attendeeFullName}</Box>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <CalendarIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <span>
                      Fecha de Reunión:{" "}
                      {format(parseInt(props.meetingDate), "dd/MMMM/yyyy")}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <TimeIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <span>Hora: {processHourKey(props.meetingHourKey)}</span>
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
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    props.declineMeeting(props.meetingId);
                  }}
                >
                  Declinar
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    props.confirmMeeting(props.meetingId);
                  }}
                >
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
