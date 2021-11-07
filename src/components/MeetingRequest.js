import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import CalendarIcon from "@material-ui/icons/CalendarTodayRounded";
import TimeIcon from "@material-ui/icons/ScheduleRounded";
import SubjectIcon from "@material-ui/icons/SubjectRounded";
import MessageIcon from "@material-ui/icons/MessageRounded";
import NameIcon from "@material-ui/icons/AccountBoxRounded";
import EmailIcon from "@material-ui/icons/AlternateEmailRounded";
import { makeStyles } from "@material-ui/core/styles";
import SimpleUserCard from "./SimpleUserCard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
  },
  timeZone: {
    color: "lightgray",
    textAlign: "left",
  },
  meetingInfoContainer: {
    paddingLeft: "40px",
    paddingBottom: "20px",
  },
  textWidth: {
    width: "70%",
  },
}));

const MeetingRequest = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <SimpleUserCard
            userFirstName="Daniel"
            userLastName="Ortiz"
            userTitle="Medicina Familiar"
          />
        </Grid>
        <Grid item xs={8}>
          <Paper elevation={3} className={classes.meetingInfoContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <span className={classes.title}>Información de la reunión</span>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <CalendarIcon />
                  </Grid>
                  <Grid item xs={11}>
                    Fecha: 10/10/2021
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <TimeIcon />
                  </Grid>
                  <Grid item xs={4}>
                    Hora: 10:00 AM - 11:00 AM
                  </Grid>
                  <Grid item xs={6}>
                    <span className={classes.timeZone}>CST</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <SubjectIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      required
                      label="Tema"
                      variant="outlined"
                      className={classes.textWidth}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <MessageIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      className={classes.textWidth}
                      placeholder="Notas"
                      multiline
                      rows={4}
                      rowsMax={6}
                      variant="outlined"
                      label="Notas (opcional):"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <span className={classes.title}>Tu información</span>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <NameIcon />
                  </Grid>
                  <Grid item xs={2}>
                    <span>Nombre:</span>
                  </Grid>
                  <Grid item xs={9}>
                    <span>Gerardo Jiménez</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <EmailIcon />
                  </Grid>
                  <Grid item xs={2}>
                    <span>Email:</span>
                  </Grid>
                  <Grid item xs={9}>
                    <span>gerajimenez@gmail.com</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <hr />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Button variant="contained" color="secondary">
                      Cancelar
                    </Button>
                  </Grid>
                  <Grid item xs={8}>
                    <Button variant="contained" color="primary">
                      Enviar Solicitud
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

export default MeetingRequest;
