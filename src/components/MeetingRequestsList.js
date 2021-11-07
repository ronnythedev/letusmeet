import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import MeetingRequestItem from "./MeetingRequestItem";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
  },
  item: {
    textAlign: "center",
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
}));

const MeetingRequestList = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.cardRoot}>
            <Grid container spacing={2}>
              <Grid item xs={12} className={classes.item}>
                <Box className={classes.yourName}>SuNombre Aquí</Box>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <Box className={classes.yourTitle}>SuTítulo aquí</Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <MeetingRequestItem
              name="Fernando Calle"
              meetingDate="10/10/2021"
              meetingTime="10:00 AM - 11:00 AM"
              meetingSubject="asd ñidf asdf ad qwer adf adsf adf"
              meetingAdditionalNotes="asd ñidf asdf ad qwer adf adsf adf"
            />
            <MeetingRequestItem
              name="Alejandra Castro"
              meetingDate="10/10/2021"
              meetingTime="10:00 AM - 11:00 AM"
              meetingSubject="asd ñidf asdf ad qwer adf adsf adf"
              meetingAdditionalNotes="asd ñidf asdf ad qwer adf adsf adf"
            />
            <MeetingRequestItem
              name="Ronald Coto"
              meetingDate="10/10/2021"
              meetingTime="10:00 AM - 11:00 AM"
              meetingSubject="asd ñidf asdf ad qwer adf adsf adf"
              meetingAdditionalNotes="asd ñidf asdf ad qwer adf adsf adf"
            />
            <MeetingRequestItem
              name="Luisa Moreno"
              meetingDate="10/10/2021"
              meetingTime="10:00 AM - 11:00 AM"
              meetingSubject="asd ñidf asdf ad qwer adf adsf adf"
              meetingAdditionalNotes="asd ñidf asdf ad qwer adf adsf adf"
            />
            <MeetingRequestItem
              name="Ximena Rojas"
              meetingDate="10/10/2021"
              meetingTime="10:00 AM - 11:00 AM"
              meetingSubject="asd ñidf asdf ad qwer adf adsf adf"
              meetingAdditionalNotes="asd ñidf asdf ad qwer adf adsf adf"
            />
            <MeetingRequestItem
              name="Sofía Valverde"
              meetingDate="10/10/2021"
              meetingTime="10:00 AM - 11:00 AM"
              meetingSubject="asd ñidf asdf ad qwer adf adsf adf"
              meetingAdditionalNotes="asd ñidf asdf ad qwer adf adsf adf"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MeetingRequestList;
