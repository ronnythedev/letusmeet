import React, { userEffect } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CalendarIcon from "@material-ui/icons/CalendarTodayRounded";
import TimeIcon from "@material-ui/icons/ScheduleRounded";
import MessageIcon from "@material-ui/icons/MessageRounded";
import SubjectIcon from "@material-ui/icons/SubjectRounded";
import LeaderIcon from "@material-ui/icons/DoubleArrowRounded";
import PinIcon from "@material-ui/icons/VpnKeyRounded";
import LinkIcon from "@material-ui/icons/LinkRounded";
import { makeStyles } from "@material-ui/core/styles";

import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "20px",
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
  roomPinContainer: {
    backgroundColor: "#EEEE9B",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  },
  roomLinkContainer: {
    backgroundColor: "#EEEE9B",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
  },
  mainContainer: {
    paddingBottom: "10px",
  },
}));

const UpcomingMeetingItem = (props) => {
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
        <Grid container spacing={2} className={classes.mainContainer}>
          <Grid item xs={12}>
            <Grid container spacing={2} className={classes.infoContainer}>
              <Grid item xs={12}>
                <Box className={classes.userName}>
                  Reunión con {props.attendeeFullName}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <CalendarIcon />
                  </Grid>
                  <Grid item xs={10}>
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
                  <Grid item xs={10}>
                    <span>Hora: {processHourKey(props.meetingHourKey)}</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <LeaderIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <span>Organizador: {props.organizerFullName}</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={11}>
                <hr />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <MessageIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <span>Tema: {props.meetingSubject}</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <SubjectIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <span>
                      Notas adicionales: {props.meetingAdditionalNotes}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={11}>
                <hr />
              </Grid>

              <Grid item xs={11} className={classes.roomPinContainer}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <PinIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <span>
                      <b>PIN de Ingreso: {props.roomPin}</b>
                    </span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={11} className={classes.roomLinkContainer}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <LinkIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <span>
                      Enlace de Reunión:&nbsp;
                      <span>
                        <a
                          target="_blank"
                          href={`${process.env.REACT_APP_DOMAIN}/meeting-join/${props.roomId}`}
                        >
                          {`${process.env.REACT_APP_DOMAIN}/meeting-join/${props.roomId}`}
                        </a>
                      </span>
                    </span>
                  </Grid>
                </Grid>
              </Grid>

              {/* <Grid item xs={12}>
                <Button variant="contained" color="secondary">
                  Ir a Reunión
                </Button>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default UpcomingMeetingItem;
