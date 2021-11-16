import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Webcam from "react-webcam";
import { toast } from "react-toastify";

import * as userServices from "../services/userServices";

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
  pinTextContainer: {
    width: "70%",
  },
  pinText: {
    textAlign: "center !important",
    fontSize: "30px",
    fontWeight: "bold",
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

const MeetingJoin = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [roomPin, setRoomPin] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [dataReady, setDataReady] = useState(true);

  useEffect(() => {
    setRoomId(props.roomId);
    history.replace("/meeting-join");
  }, []);

  useEffect(() => {
    if (props.roomId === undefined && roomId === undefined) {
      setShowMessageModal(true);
      setDataReady(false);
    }
  }, [props.roomId, roomId]);

  const validateRoomPin = () => {
    const toastId = toast.loading("Validando PIN ingresado...");
    userServices.validateMeetingRoomPin(roomId, roomPin).then((response) => {
      if (response.code === undefined || response.code === 200) {
        toast.update(toastId, {
          render: "¡PIN Válido!",
          type: "success",
          isLoading: false,
          theme: "colored",
          autoClose: 6000,
          closeOnClick: true,
        });
        history.push("/live-video/" + roomId);
      } else {
        toast.update(toastId, {
          render: "PIN Incorrecto. No se puede iniciar la reunión.",
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
      {dataReady ? (
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
                  <Webcam
                    className={classes.video}
                    videoConstraints={{
                      width: 1280,
                      height: 720,
                    }}
                  />
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
                    className={classes.pinTextContainer}
                    InputProps={{ className: classes.pinText }}
                    value={roomPin}
                    onChange={(e) => {
                      setRoomPin(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} className={classes.item}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          window.close();
                        }}
                      >
                        Cerrar
                      </Button>
                    </Grid>
                    <Grid item xs={6} className={classes.item}>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={roomPin === ""}
                        onClick={() => {
                          validateRoomPin();
                        }}
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
      ) : null}

      <Modal
        open={showMessageModal}
        // onClose={() => {
        //   setShowMessageModal(false);
        // }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box>
          <Paper elevation={3} className={classes.modalContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <span className={classes.title}>No se encuentran datos</span>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <span>No hay datos de reunión. No se puede iniciar.</span>
                </p>
                <p>
                  <span>
                    Por favor cierre esta ventana y vuelva a intentar.
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
                  Atrás
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
};

export default MeetingJoin;
