import React, { useEffect, useState } from "react";
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
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import SimpleUserCard from "./SimpleUserCard";
import PageLoader from "./PageLoader";
import { useAuth } from "../util/auth";
import * as userServices from "../services/userServices";

import { format } from "date-fns";

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
  modalContainer: {
    position: "absolute",
    minWidth: "70%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
  },
}));

const MeetingRequest = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();

  const [selectedDate, setSelectedDate] = useState(null);
  const [, setHourKey] = useState("");
  const [timeInString, setTimeInString] = useState("");
  const [selectedFromTime, setSelectedFromTime] = useState();
  const [selectedToTime, setSelectedToTime] = useState();
  const [requestToUserId, setRequestToUserId] = useState();
  const [requestToUserName, setRequestToUserName] = useState();
  const [requestToUserLastName, setRequestToUserLastName] = useState();
  const [requestToUserEmail, setRequestToUserEmail] = useState();
  const [subject, setSubject] = useState("");
  const [optionalNotes, setOptionalNotes] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [userNotified, setUserNotified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setHourKey(props.hourKey);
    setRequestToUserId(props.userId);
    setSelectedDate(props.selectedTimeTs);
    setRequestToUserName(props.userName);
    setRequestToUserLastName(props.userLastName);
    setRequestToUserEmail(props.userEmail);
    history.replace("/meeting-request"); // clear query string params
    processHourKey(props.hourKey);
  }, []);

  useEffect(() => {
    if (userNotified && !showMessageModal) {
      history.goBack();
    }
  }, [showMessageModal]);

  const makeMeetingRequest = () => {
    setIsLoading(true);
    userServices
      .insertMeetingRequest(
        requestToUserId,
        selectedDate,
        selectedFromTime,
        selectedToTime,
        subject,
        optionalNotes
      )
      .then((response) => {
        if (response.code === undefined || response.code === 200) {
          setShowMessageModal(true);
          setUserNotified(true);
        } else {
          toast.error({
            render:
              "No se pudo realizar la solicitud de reunión. Por favor intente de nuevo.",
            type: "error",
            isLoading: false,
            theme: "colored",
            autoClose: 6000,
            closeOnClick: true,
          });
        }
        setIsLoading(false);
      });
  };

  const processHourKey = (hourKey) => {
    let firstHourAmPm = "AM";
    let secondHourAmPm = "AM";

    let hours = hourKey.split("-");
    setSelectedFromTime(parseInt(hours[0]));
    setSelectedToTime(parseInt(hours[1]));

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

    setTimeInString(
      `${firstHour}:00 ${firstHourAmPm} - ${secondHour}:00 ${secondHourAmPm}`
    );
  };

  return (
    <Box className={classes.root}>
      {isLoading ? (
        <PageLoader />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <SimpleUserCard
              userFirstName={requestToUserName}
              userLastName={requestToUserLastName}
              userTitle={requestToUserEmail}
            />
          </Grid>
          <Grid item xs={8}>
            <Paper elevation={3} className={classes.meetingInfoContainer}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <span className={classes.title}>
                    Información de la reunión
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={1}>
                      <CalendarIcon />
                    </Grid>
                    <Grid item xs={11}>
                      {selectedDate
                        ? "Fecha: " +
                          format(parseInt(selectedDate), "dd/MMMM/yyyy")
                        : ""}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={1}>
                      <TimeIcon />
                    </Grid>
                    <Grid item xs={4}>
                      Hora: {timeInString}
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
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                        }}
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
                        value={optionalNotes}
                        onChange={(e) => {
                          setOptionalNotes(e.target.value);
                        }}
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
                      <span>
                        {auth.user.firstName}&nbsp;{auth.user.lastName}
                      </span>
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
                      <span>{auth.user.email}</span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <hr />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          history.goBack();
                        }}
                      >
                        Cancelar
                      </Button>
                    </Grid>
                    <Grid item xs={8}>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={subject === ""}
                        onClick={() => {
                          makeMeetingRequest();
                        }}
                      >
                        Enviar Solicitud
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}

      <Modal
        open={showMessageModal}
        onClose={() => {
          setShowMessageModal(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box>
          <Paper elevation={3} className={classes.modalContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <span className={classes.title}>Solicitud Realizada</span>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <span>
                    La solicitud de reunión con{" "}
                    <b>
                      {requestToUserName} {requestToUserLastName}
                    </b>{" "}
                    para el{" "}
                    <b>
                      {" "}
                      {selectedDate
                        ? format(parseInt(selectedDate), "dd/MMMM/yyyy")
                        : ""}{" "}
                      {timeInString}
                    </b>{" "}
                    se realizó con éxito.
                  </span>
                </p>
                <p>
                  <span>
                    Recibirás el <b>enlance de la reunión</b> y el{" "}
                    <b>PIN de acceso</b> tan pronto <b>{requestToUserName}</b>{" "}
                    confirme esta misma solicitud.
                  </span>
                </p>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  Entendido
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
};

export default MeetingRequest;
