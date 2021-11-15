import React, { useRef, useEffect, useState } from "react";
import VideoControls from "./Controls";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import io from "socket.io-client";
import Peer from "simple-peer";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5px",
  },
  videoContainer: {
    minHeight: "500px",
    padding: "15px !important",
  },
  bigVideo: {
    backgroundColor: "#3C4043",
    border: "none",
    boxShadow: "none",
    borderRadius: "4px",
    height: "100%",
    marginRight: "15%",
    marginLeft: "15%",
    display: "flex",
    justifyContent: "center",
  },
  smallVideo: {
    backgroundColor: "#4A4E51",
    position: "absolute",
    minHeight: "135px",
    minWidth: "235px",
    bottom: "240px",
    marginRight: "20px",
    borderRadius: "4px",
    right: "0px",
    marginRight: "17%",
    marginLeft: "15%",
  },
  videoSmallElement: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  videoLargeElement: {
    // height: "100%",
    // width: "100%",
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

const LiveVideoComponent = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [peers, setPeers] = useState([]);
  const [roomID, setRoomID] = useState();
  const [micIsOn, setMicIsOn] = useState(true);
  const [cameraIsOn, setCameraIsOn] = useState(true);
  const [dataReady, setDataReady] = useState(true);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const localStream = useRef();
  const socketRef = useRef();
  const peersRef = useRef([]);

  useEffect(() => {
    setRoomID(props.roomId);

    if (props.roomId) {
      socketRef.current = io.connect(
        process.env.REACT_APP_API_BASE_URL.replace("/api", "")
      );

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localStream.current = stream;
          localVideoRef.current.srcObject = localStream.current;

          socketRef.current.emit("join room", roomID);

          socketRef.current.on("all users", (otherUsers) => {
            // Escenario:
            // I was already in the meeting and someone else joined,
            // then I received the info of all other users except me (in the 'otherUsers' param)
            // Therefore I create a 'peer' with each of them.
            // I send the id of the other user, my id and my stream

            const peers = [];
            otherUsers.forEach((otherUserID) => {
              const peer = createPeer(
                otherUserID,
                socketRef.current.id,
                stream
              );
              peersRef.current.push({
                peerID: otherUserID,
                peer,
              });
              peers.push(peer);
            });
            setPeers(peers);
          });

          socketRef.current.on("user joined", (payload) => {
            const peer = addPeer(payload.signal, payload.callerID, stream);

            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });

            setPeers((users) => [...users, peer]);
          });

          socketRef.current.on("receiving returned signal", (payload) => {
            const item = peersRef.current.find((p) => p.peerID === payload.id);
            item.peer.signal(payload.signal);
          });
        });
    }
    history.replace("/live-video");
  }, []);

  useEffect(() => {
    if (props.roomId === undefined && roomID === undefined) {
      setShowMessageModal(true);
      setDataReady(false);
    }
  }, [props.roomId, roomID]);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    peer.on("stream", (stream) => {
      remoteVideoRef.current.srcObject = stream;
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    peer.on("stream", (stream) => {
      remoteVideoRef.current.srcObject = stream;
    });

    return peer;
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className={classes.root}>
        {dataReady ? (
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.videoContainer}>
              <Box className={classes.bigVideo}>
                <video
                  playsInline
                  autoPlay
                  ref={remoteVideoRef}
                  className={classes.videoLargeElement}
                />
              </Box>
              <Box className={classes.smallVideo}>
                <video
                  playsInline
                  autoPlay
                  muted
                  ref={localVideoRef}
                  className={classes.videoSmallElement}
                />
              </Box>
            </Grid>
            <VideoControls
              micIsOn={micIsOn}
              setMicIsOn={setMicIsOn}
              cameraIsOn={cameraIsOn}
              setCameraIsOn={setCameraIsOn}
              meetingId=""
            />
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
    </>
  );
};

export default LiveVideoComponent;
