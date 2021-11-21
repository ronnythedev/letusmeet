import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import MeetingRequestItem from "./MeetingRequestItem";
import SimpleUserCard from "./SimpleUserCard";
import PageLoader from "./PageLoader";

import { toast } from "react-toastify";
import { useAuth } from "../util/auth";
import * as userServices from "../services/userServices";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
  },
  noItemsContainer: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    width: "99%",
  },
  noItemsMessage: {
    fontSize: "20px",
    fontWeight: "bold",
  },
}));

const MeetingRequestList = () => {
  const classes = useStyles();
  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [meetingsMadeByMe, setMeetingsMadeByMe] = useState([]);
  const [meetingsMadeByOthers, setMeetingsMadeByOthers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    userServices.getUpcomingPendingMeetings().then((response) => {
      if (response.code === undefined || response.code === 200) {
        if (response.upcomingMeetings.length > 0) {
          setMeetingsMadeByMe(
            response.upcomingMeetings.filter((meet) => {
              return meet.attendee._id === auth.user.id;
            })
          );
          setMeetingsMadeByOthers(
            response.upcomingMeetings.filter((meet) => {
              return meet.attendee._id !== auth.user.id;
            })
          );
        }
      } else {
        toast.error({
          render:
            "No se pudo consultar la información. Por favor intente de nuevo.",
          type: "error",
          isLoading: false,
          theme: "colored",
          autoClose: 6000,
          closeOnClick: true,
        });
      }
      setIsLoading(false);
    });
  }, []);

  const confirmMeeting = (meetingId) => {
    const toastId = toast.loading("Confirmando solicitud...");
    userServices.confirmMeeting(meetingId).then((response) => {
      if (response.code === undefined || response.code === 200) {
        toast.update(toastId, {
          render: "Solicitud Confirmada",
          type: "success",
          isLoading: false,
          theme: "colored",
          autoClose: 500,
          closeOnClick: true,
        });

        const meetingIndex = meetingsMadeByOthers.findIndex(
          ({ id }) => id === meetingId
        );
        if (meetingIndex !== -1) {
          setMeetingsMadeByOthers([
            ...meetingsMadeByOthers.slice(0, meetingIndex),
            ...meetingsMadeByOthers.slice(meetingIndex + 1),
          ]);
        }
      } else {
        toast.update(toastId, {
          render:
            "Hubo un error al confirmar la reunión. Por favor intente de nuevo.",
          type: "error",
          isLoading: false,
          theme: "colored",
          autoClose: 6000,
          closeOnClick: true,
        });
      }
    });
  };

  const declineMeeting = (meetingId) => {
    const toastId = toast.loading("Declinando solicitud...");
    userServices.declineMeeting(meetingId).then((response) => {
      if (response.code === undefined || response.code === 200) {
        toast.update(toastId, {
          render: "Solicitud Declinada",
          type: "success",
          isLoading: false,
          theme: "colored",
          autoClose: 500,
          closeOnClick: true,
        });

        const meetingIndex = meetingsMadeByOthers.findIndex(
          ({ id }) => id === meetingId
        );
        if (meetingIndex !== -1) {
          setMeetingsMadeByOthers([
            ...meetingsMadeByOthers.slice(0, meetingIndex),
            ...meetingsMadeByOthers.slice(meetingIndex + 1),
          ]);
        }
      } else {
        toast.update(toastId, {
          render:
            "Hubo un error al declinar la reunión. Por favor intente de nuevo.",
          type: "error",
          isLoading: false,
          theme: "colored",
          autoClose: 6000,
          closeOnClick: true,
        });
      }
    });
  };

  const cancelMeeting = (meetingId) => {
    const toastId = toast.loading("Cancelando solicitud...");
    userServices.cancelMeeting(meetingId).then((response) => {
      if (response.code === undefined || response.code === 200) {
        toast.update(toastId, {
          render: "Solicitud Cancelada",
          type: "success",
          isLoading: false,
          theme: "colored",
          autoClose: 500,
          closeOnClick: true,
        });

        const meetingIndex = meetingsMadeByMe.findIndex(
          ({ id }) => id === meetingId
        );
        if (meetingIndex !== -1) {
          setMeetingsMadeByMe([
            ...meetingsMadeByMe.slice(0, meetingIndex),
            ...meetingsMadeByMe.slice(meetingIndex + 1),
          ]);
        }
      } else {
        toast.update(toastId, {
          render:
            "Hubo un error al cancelar la reunión. Por favor intente de nuevo.",
          type: "error",
          isLoading: false,
          theme: "colored",
          autoClose: 6000,
          closeOnClick: true,
        });
      }
    });
  };

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

        {isLoading ? (
          <PageLoader />
        ) : (
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Box className={classes.noItemsContainer}>
                <span className={classes.noItemsMessage}>
                  Solicitudes Recibidas
                </span>
              </Box>
              {meetingsMadeByOthers.length === 0 ? (
                <Paper elevation={1} className={classes.noItemsContainer}>
                  <span className={classes.noItemsMessage}>
                    No hay solicitudes recibidas pendientes.
                  </span>
                </Paper>
              ) : (
                meetingsMadeByOthers.map((meeting) => {
                  return (
                    <MeetingRequestItem
                      key={meeting.id}
                      meetingId={meeting.id}
                      attendeeFullName={
                        meeting.attendee.firstName +
                        " " +
                        meeting.attendee.lastName
                      }
                      meetingDate={meeting.startDateTs}
                      meetingHourKey={
                        String(meeting.fromTime) + "-" + String(meeting.toTime)
                      }
                      meetingSubject={meeting.subject}
                      meetingAdditionalNotes={meeting.notes}
                      confirmMeeting={confirmMeeting}
                      declineMeeting={declineMeeting}
                      cancelMeeting={cancelMeeting}
                      isLoading={isLoading}
                      type={2}
                    />
                  );
                })
              )}
              <Box className={classes.noItemsContainer}>
                <span className={classes.noItemsMessage}>
                  Solicitudes Hechas
                </span>
              </Box>
              {meetingsMadeByMe.length === 0 ? (
                <Paper elevation={1} className={classes.noItemsContainer}>
                  <span className={classes.noItemsMessage}>
                    No hay solicitudes hechas pendientes.
                  </span>
                </Paper>
              ) : (
                meetingsMadeByMe.map((meeting) => {
                  return (
                    <MeetingRequestItem
                      key={meeting.id}
                      meetingId={meeting.id}
                      attendeeFullName={
                        meeting.attendee.firstName +
                        " " +
                        meeting.attendee.lastName
                      }
                      meetingDate={meeting.startDateTs}
                      meetingHourKey={
                        String(meeting.fromTime) + "-" + String(meeting.toTime)
                      }
                      meetingSubject={meeting.subject}
                      meetingAdditionalNotes={meeting.notes}
                      confirmMeeting={confirmMeeting}
                      declineMeeting={declineMeeting}
                      cancelMeeting={cancelMeeting}
                      isLoading={isLoading}
                      type={1}
                    />
                  );
                })
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default MeetingRequestList;
