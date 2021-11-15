import React, { useEffect, useState } from "react";
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

  const [upcomingMeetings, setUpcomingMeetings] = useState([]);

  useEffect(() => {
    userServices.getUpcomingMeetings().then((response) => {
      setUpcomingMeetings(response.upcomingMeetings);
      console.log(response.upcomingMeetings);
    });
  }, []);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <SimpleUserCard
            userFirstName={auth.user.firstName}
            userLastName={auth.user.lastName}
            userTitle={auth.user.email}
          />
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            {upcomingMeetings.map((meeting) => {
              return (
                <UpcomingMeetingItem
                  key={meeting.id}
                  attendeeFullName={
                    meeting.attendee.firstName + " " + meeting.attendee.lastName
                  }
                  meetingDate={meeting.startDateTs}
                  meetingHourKey={
                    String(meeting.fromTime) + "-" + String(meeting.toTime)
                  }
                  organizerFullName={
                    meeting.organizer.firstName +
                    " " +
                    meeting.organizer.lastName
                  }
                  meetingSubject={meeting.subject}
                  meetingAdditionalNotes={meeting.notes}
                  roomPin={meeting.roomPin}
                  roomId={meeting.roomId}
                />
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpcomingMeetingList;
