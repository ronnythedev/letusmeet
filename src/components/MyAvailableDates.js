import React, { useState, useEffect } from "react";

import Section from "./Section";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";

import EditImage from "@material-ui/icons/Edit";
import SaveImage from "@material-ui/icons/Save";
import CancelImage from "@material-ui/icons/Cancel";

import CopyImage from "@material-ui/icons/FileCopyRounded";
import SectionHeader from "./SectionHeader";
import { useAuth } from "../util/auth.js";
import { useRouter } from "../util/router.js";
import { makeStyles } from "@material-ui/core/styles";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as userServices from "../services/userServices";
import "../styles/main.css";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "16px",
    textAlign: "center",
  },
  uniqueUrlContainer: {
    marginTop: "10px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uniqueUrl: {
    marginTop: "5px",
    fontSize: "24px",
  },
  hidden: {
    display: "none",
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  saveButtonWrapper: {
    paddingTop: "10px",
    textAlign: "center",
  },
  customHeaderContainer: {
    paddingTop: "30px",
  },
  customHeader: {
    position: "sticky",
    zIndex: 2,
    top: "0px",
    paddingBottom: "20px",
    backgroundColor: theme.palette.background.default,
  },
  calendarWrapper: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
  },
  dayItem: {
    display: "flex",
    flexDirection: "column",
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: "100%",
  },
  dayColumn: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
  },
  hourSlot: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
  },
  hourButtonSelected: {
    marginBottom: "5px",
    fontSize: "10px",
  },
  hourButtonRegular: {
    marginBottom: "5px",
    fontSize: "10px",
  },
  dayHeader: {
    top: "249px",
    position: "sticky",
    borderBottom: "1px solid #CBCBD6",
    marginBottom: "8px",
    paddingBottom: "16px",
    zIndex: 1,
    backgroundColor: theme.palette.background.default,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "18px",
  },
}));

function MyAvailableDates(props) {
  const classes = useStyles();
  const auth = useAuth();
  const router = useRouter();
  const weekDays = [
    { text: "Domingo", key: 0 },
    { text: "Lunes", key: 1 },
    { text: "Martes", key: 2 },
    { text: "Miércoles", key: 3 },
    { text: "Jueves", key: 4 },
    { text: "Viernes", key: 5 },
    { text: "Sábado", key: 6 },
  ];
  const hoursByDay = [
    { text: "5:00 AM - 6:00 AM", key: "500-600" },
    { text: "6:00 AM - 7:00 AM", key: "600-700" },
    { text: "7:00 AM - 8:00 AM", key: "700-800" },
    { text: "8:00 AM - 9:00 AM", key: "800-900" },
    { text: "9:00 AM - 10:00 AM", key: "900-1000" },
    { text: "10:00 AM - 11:00 AM", key: "1000-1100" },
    { text: "11:00 AM - 12:00 PM", key: "1100-1200" },
    { text: "12:00 PM - 1:00 PM", key: "1200-1300" },
    { text: "1:00 PM - 2:00 PM", key: "1300-1400" },
    { text: "2:00 PM - 3:00 PM", key: "1400-1500" },
    { text: "3:00 PM - 4:00 PM", key: "1500-1600" },
    { text: "4:00 PM - 5:00 PM", key: "1600-1700" },
    { text: "5:00 PM - 6:00 PM", key: "1700-1800" },
    { text: "6:00 PM - 7:00 PM", key: "1800-1900" },
    { text: "7:00 PM - 8:00 PM", key: "1900-2000" },
    { text: "8:00 PM - 9:00 PM", key: "2000-2100" },
    { text: "9:00 PM - 10:00 PM", key: "2100-2200" },
    { text: "10:00 PM - 11:00 PM", key: "2200-2300" },
    { text: "11:00 PM - 12:00 AM", key: "2300-2400" },
  ];

  const [selectedDates, setSelectedDates] = useState([]);
  const [thereArePendingChanges, setThereArePendingChanges] = useState(false);
  const [editingUrl, setEditingUrl] = useState(false);
  const [uniqueUserUrl, setUniqueUserUrl] = useState("");
  const [originalUserUrl, setOriginalUserUrl] = useState("");

  useEffect(() => {
    userServices.getAvailableDates().then((availableDates) => {
      formatAvailableDates(availableDates);
    });

    setUniqueUserUrl(auth.user.uniqueLinkId);
    setOriginalUserUrl(auth.user.uniqueLinkId);
  }, []);

  const formatAvailableDates = (dates) => {
    let formattedDates = dates.map((item) => {
      return (
        String(item.weekDay) +
        "-" +
        String(item.fromTime) +
        "-" +
        String(item.toTime)
      );
    });

    setSelectedDates(formattedDates);
  };

  const toggleSelectedDate = (currentDate) => {
    let itemIndex = selectedDates.indexOf(currentDate);

    if (itemIndex !== -1) {
      setSelectedDates(selectedDates.filter((item) => item !== currentDate));
    } else {
      setSelectedDates([...selectedDates, currentDate]);
    }

    if (!thereArePendingChanges) {
      setThereArePendingChanges(true);
    }
  };

  const copyToClipboard = () => {
    toast.success("¡Copiado!", {
      theme: "colored",
    });
  };

  const cancelEdit = () => {
    setUniqueUserUrl(originalUserUrl);
    setEditingUrl(false);
  };

  const saveNewLink = () => {
    if (originalUserUrl === uniqueUserUrl) {
      toast.info("Debes cambiar el valor antes de intentar salvar.", {
        theme: "colored",
        autoClose: 8000,
        closeOnClick: true,
      });
    } else {
      userServices.saveUniqueUrl(uniqueUserUrl).then((response) => {
        if (response.code === undefined) {
          toast.success("El enlance se guardó con éxito.", {
            theme: "colored",
            autoClose: 8000,
            closeOnClick: true,
          });
          setEditingUrl(false);
          setOriginalUserUrl(uniqueUserUrl);
        } else if (response.code === 500) {
          if (
            response.message === "The given link is being used by another user."
          ) {
            toast.error(
              "El enlance ya está siendo utilizado por otro usuario.",
              {
                theme: "colored",
                autoClose: 8000,
                closeOnClick: true,
              }
            );
          } else {
            toast.error("Ocurrió un error no identificado.", {
              theme: "colored",
              autoClose: 8000,
              closeOnClick: true,
            });
          }
        }
      });
    }
  };

  return (
    <Section
      className={classes.customHeaderContainer}
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Box className={classes.customHeader}>
          <SectionHeader
            className={classes.customHeaderContainer}
            title={props.title}
            subtitle={props.subtitle}
            size={4}
            textAlign="center"
          />
          <Box>
            <div className={classes.title}>Este es tu enlace único</div>
            <div className={classes.uniqueUrlContainer}>
              <span className={classes.uniqueUrl}>
                https://letusmeet/
                <span className={editingUrl ? classes.hidden : null}>
                  {uniqueUserUrl}
                </span>
              </span>
              <div
                className={!editingUrl ? classes.hidden : null}
                style={{ marginTop: "5px" }}
              >
                &nbsp;
                <OutlinedInput
                  id="standard-basic"
                  variant="standard"
                  onChange={(e) => {
                    setUniqueUserUrl(e.target.value);
                  }}
                  value={uniqueUserUrl}
                />
              </div>
              <div>
                &nbsp;
                {editingUrl ? (
                  <IconButton
                    color="primary"
                    component="span"
                    onClick={() => {
                      saveNewLink();
                    }}
                  >
                    <SaveImage />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    component="span"
                    onClick={() => {
                      setEditingUrl(!editingUrl);
                    }}
                  >
                    <EditImage />
                  </IconButton>
                )}
              </div>
              <div className={editingUrl ? classes.hidden : null}>
                &nbsp;
                <IconButton
                  color="secondary"
                  component="span"
                  onClick={copyToClipboard}
                >
                  <CopyImage />
                </IconButton>
              </div>
              <div className={editingUrl ? null : classes.hidden}>
                &nbsp;
                <IconButton
                  color="secondary"
                  component="span"
                  onClick={() => {
                    cancelEdit();
                  }}
                >
                  <CancelImage />
                </IconButton>
              </div>
            </div>
            <div className={classes.saveButtonWrapper}>
              <Button
                variant="contained"
                color="primary"
                className={thereArePendingChanges ? "button-glow" : ""}
              >
                Guardar Mis Fechas
              </Button>
            </div>
          </Box>
        </Box>
        <Grid
          container
          columns={7}
          spacing={1}
          className={classes.calendarWrapper}
          style={{}}
        >
          {weekDays.map((day) => {
            return (
              <Grid key={day.key} item xs className={classes.dayItem}>
                <Box className={classes.dayColumn} style={{}}>
                  <Box className={classes.dayHeader} style={{}}>
                    <span>{day.text}</span>
                  </Box>
                  <Box className={classes.hourSlot}>
                    {hoursByDay.map((hour) => {
                      return (
                        <Button
                          id={"btn-" + day.key + "-" + hour.key}
                          key={"btn-" + day.key + "-" + hour.key}
                          color="primary"
                          variant={
                            selectedDates.indexOf(
                              String(day.key) + "-" + String(hour.key)
                            ) !== -1
                              ? "contained"
                              : "outlined"
                          }
                          size="large"
                          onClick={() => {
                            toggleSelectedDate(day.key + "-" + hour.key);
                          }}
                          className={
                            selectedDates.indexOf(
                              String(day.key) + "-" + String(hour.key)
                            ) !== -1
                              ? classes.hourButtonSelected
                              : classes.hourButtonRegular
                          }
                        >
                          {hour.text}
                        </Button>
                      );
                    })}
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </Section>
  );
}

export default MyAvailableDates;
