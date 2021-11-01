import React from "react";
import Section from "./Section";
import {
  Typography,
  Grid,
  Container,
  Card,
  Button,
  Box,
  OutlinedInput,
  IconButton,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { width } from "dom-helpers";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: 0,
  },
  titleContainer: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  subtitle1: {
    display: "inline",
    marginRight: "16px",
  },
  inLineDisplay: {
    display: "inline",
  },
  mainContainer: {
    flex: "1 1 0%",
    display: "flex",
    padding: 0,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bodyContainer: {
    marginBottom: 0,
  },
  footerContainer: {
    display: "flex",
    justifyContent: "flex-start",
  },
  meetingTitle: {
    marginTop: "32px",
    marginBottom: "32px",
  },
  subtitleContainer: {
    marginRight: "16px",
  },
  formContainer: {
    marginBottom: "32px",
  },
  formTitle: {
    marginBottom: "16px",
  },
  footerBackContainer: {
    flex: "0 0 auto",
  },
  footerBookContainer: {
    flex: "0 0 auto",
    marginLeft: "16px",
  },
}));

const MeetingRequest = (props) => {
  const classes = useStyles();

  return (
    <Section
      className={classes.customHeaderContainer}
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container style={{ marginLeft: "15px" }}>
        <Box className={classes.header}>
          <Box className={classes.titleContainer}>
            <Typography variant="h5" gutterBottom={true}>
              Reunión con Daniel
            </Typography>
            <Box>
              <span>
                <Typography
                  component="p"
                  color="textSecondary"
                  className={classes.subtitle1}
                >
                  Daniel Campos
                </Typography>
              </span>
              <Typography
                component="p"
                color="textSecondary"
                className={classes.inLineDisplay}
              >
                Medicina Familiar
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.mainContainer}>
          <Box className={classes.bodyContainer}>
            <Grid container>
              <Box className={classes.meetingTitle}>
                <Grid container>
                  <Box className={classes.subtitleContainer}>
                    <Typography
                      variant="h6"
                      gutterBottom={true}
                      style={{ fontWeight: "bold" }}
                    >
                      Lunes, 25 de Octubre
                    </Typography>
                  </Box>
                  <Box className={classes.subtitleContainer}>
                    <Typography
                      variant="h6"
                      gutterBottom={true}
                      style={{ fontWeight: "bold" }}
                    >
                      10:00 AM - 11:00 AM
                    </Typography>
                  </Box>
                  <Box
                    className={classes.subtitleContainer}
                    style={{ fontWeight: "bold" }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom={true}
                      color="textSecondary"
                    >
                      CST
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Grid container>
                <Grid item>
                  <Box className={classes.formContainer}>
                    <Box className={classes.formTitle}>
                      <Typography variant="h6" gutterBottom={true}>
                        Información Personal
                      </Typography>
                    </Box>
                    <Box>
                      <Box>
                        <span>Nombre: Fernanda Romero</span>
                      </Box>
                      <Box>
                        <span>Email: fernanda@romero.com</span>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container style={{ minWidth: "400px" }}>
                <Grid item>
                  <Box className={classes.formContainer}>
                    <Box className={classes.formTitle}>
                      <Typography variant="h6" gutterBottom={true}>
                        Información Adicional
                      </Typography>
                    </Box>
                    <Box style={{ minWidth: "400px" }}>
                      <Box style={{ width: "100%" }}>
                        <TextField
                          style={{ minWidth: "400px" }}
                          required
                          label="Tema"
                          variant="outlined"
                        />
                      </Box>
                      <Box style={{ marginTop: "20px" }}>
                        <TextField
                          style={{ minWidth: "400px" }}
                          placeholder="Notas"
                          multiline
                          rows={4}
                          rowsMax={6}
                          variant="outlined"
                          label="Notas (opcional):"
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.footerContainer}>
            <Box className={classes.footerBackContainer}>
              <Button variant="contained" color="secondary">
                Volver
              </Button>
            </Box>
            <Box className={classes.footerBookContainer}>
              <Button variant="contained" color="primary">
                Enviar Solicitud
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Section>
  );
};

export default MeetingRequest;
