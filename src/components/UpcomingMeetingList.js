import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "../util/auth";

import UpcomingMeetingItem from "./UpcomingMeetingItem";
import SimpleUserCard from "./SimpleUserCard";

import * as userServices from "../services/userServices";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
  },
}));

const UpcomingMeetingList = () => {
  const classes = useStyles();
  const auth = useAuth();

  useEffect(() => {
    userServices.getUpcomingMeetings().then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <SimpleUserCard
            userFirstName={auth.user.name}
            userLastName={auth.user.lastName}
            userTitle={auth.user.email}
          />
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <UpcomingMeetingItem
              name="Fernando Calle"
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

export default UpcomingMeetingList;
