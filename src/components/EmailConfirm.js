import React, { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import * as userServices from "../services/userServices";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5px",
  },
  progressContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    minWidth: "70%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: "20px",
  },
}));

const EmailConfirm = (props) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [pageMessageBody, setPageMessageBody] = useState("");
  const [pageMessageBody2, setPageMessageBody2] = useState("");

  useEffect(() => {
    if (!props.token) {
      setIsLoading(false);
      setPageMessageBody(
        "No se puede confirmar email con la información brindada."
      );
      setPageMessageBody2("");
    } else {
      setIsLoading(true);
      setPageMessageBody("Confirmando Email. Por favor espere.");
      setPageMessageBody2("");

      userServices.confirmEmail(props.token).then((response) => {
        if (response.code === undefined || response.code === 200) {
          setPageMessageBody("¡La confirmación se realizó con éxito!");
          setPageMessageBody2("");
        } else if (response.code === 404) {
          setPageMessageBody("La información proveída es incorrecta.");
          setPageMessageBody2("No se puede confirmar email.");
        } else if (response.code === 410) {
          setPageMessageBody("El enlace de confirmación ya expiró.");
          setPageMessageBody2(
            "No se puede confirmar el email. Por favor solicite un enlance nuevo."
          );
        } else {
          setPageMessageBody("Se produjo un error en la confirmación.");
          setPageMessageBody2("");
        }
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }} className={classes.root}>
        <Box>
          <Paper elevation={3} className={classes.modalContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <span className={classes.title}>Confirmación de Email</span>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.subTitle}>
                  <span>{pageMessageBody}</span>
                </p>
                <p className={classes.subTitle}>
                  <span>{pageMessageBody2}</span>
                </p>
                {isLoading && (
                  <Box className={classes.progressContainer}>
                    <CircularProgress size={32} />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                {/* <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setShowMessageModal(false);
                  }}
                >
                  Entendido
                </Button> */}
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default EmailConfirm;
