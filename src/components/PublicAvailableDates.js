import React, { useState, useEffect } from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import {
  Typography,
  Grid,
  Container,
  Card,
  Button,
  Box,
  OutlinedInput,
  IconButton,
} from "@material-ui/core";
import LeftArrow from "@material-ui/icons/ChevronLeft";
import RightArrow from "@material-ui/icons/ChevronRight";
import { useAuth } from "../util/auth.js";
import { useRouter } from "../util/router.js";
import { makeStyles } from "@material-ui/core/styles";
import { format, startOfWeek, add, getDate, compareAsc } from "date-fns";

const useStyles = makeStyles((theme) => ({
  weekBackAndForwardContainer: {
    display: "flex",
  },
  weekContainer: {
    top: 0,
    height: "80px",
    zIndex: 2,
    position: "sticky",
    display: "flex",
    flexDirection: "column",
  },
  weekControls: {
    display: "flex",
    alignItems: "center",
    padding: "16px 0px",
  },
  weekStartDate: {
    marginRight: "24px",
    marginLeft: "25px",
    fontSize: "24px",
  },
  subtitle: {
    fontSize: "16px",
    textAlign: "center",
  },
  userName: {
    fontSize: "30px",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "10px",
  },
  customHeaderContainer: {
    paddingTop: "30px",
  },
  customHeader: {
    position: "sticky",
    zIndex: 2,
    top: "0px",
    paddingBottom: "20px",
    paddingTop: "10px",
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
    minHeight: "33px",
    backgroundColor: "#ECECF1",
  },
  dayHeader: {
    top: "184px",
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
  dayHeaderDateContainer: {
    display: "flex",
    justifyContent: "center",
  },
  dayHeaderDateHeader: {
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  weekOf: {
    marginLeft: "25px",
    color: "gray",
    position: "absolute",
    fontWeight: "bold",
  },
}));

function PublicAvailableDates(props) {
  const classes = useStyles();
  const auth = useAuth();
  const router = useRouter();

  const weekDays = [
    { text: "Domingo", key: 1 },
    { text: "Lunes", key: 2 },
    { text: "Martes", key: 3 },
    { text: "Miércoles", key: 4 },
    { text: "Jueves", key: 5 },
    { text: "Viernes", key: 6 },
    { text: "Sábado", key: 7 },
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

  const datesInitialState = [
    "2-800-900",
    "2-900-1000",
    "2-1000-1100",
    "2-1100-1200",
    "2-1400-1500",
    "2-1500-1600",
    "2-1600-1700",
    "3-800-900",
    "3-900-1000",
    "3-1000-1100",
    "3-1100-1200",
    "3-1400-1500",
    "3-1500-1600",
    "3-1600-1700",
    "4-800-900",
    "4-900-1000",
    "4-1000-1100",
    "4-1100-1200",
    "4-1400-1500",
    "4-1500-1600",
    "4-1600-1700",
    "5-800-900",
    "5-900-1000",
    "5-1000-1100",
    "5-1100-1200",
    "5-1400-1500",
    "5-1500-1600",
    "5-1600-1700",
    "6-800-900",
    "6-900-1000",
    "6-1000-1100",
    "6-1100-1200",
    "6-1400-1500",
    "6-1500-1600",
    "6-1600-1700",
  ];

  const [availableDates, setAvailableDates] = useState(datesInitialState);
  const [firstDateOfWeek, setFirstDateOfWeek] = useState(
    startOfWeek(new Date())
  );
  const [firstDateOfWeekFormatted, setFirstDateOfWeekFormatted] = useState(
    firstDateOfWeek ? format(firstDateOfWeek, "dd/MMMM/yyyy") : ""
  );

  useEffect(() => {
    setFirstDateOfWeekFormatted(format(firstDateOfWeek, "dd/MMMM/yyyy"));
  }, [firstDateOfWeek]);

  const openMeetingRequest = () => {
    router.push("/meeting-request/1");
  };

  const computeDisableDate = (dayKey, hourKey, dayDate) => {
    // disable if it's not in the list of availableDates
    // otherwise, disable if the day is in the past
    if (availableDates.indexOf(String(dayKey) + "-" + String(hourKey)) === -1) {
      return true;
    }

    // TODO: Uncomment the following to disable if the day is in the past
    // if (compareAsc(dayDate, new Date()) === -1) {
    //   return true;
    // }

    return false;
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
            <div className={classes.subtitle}>Reserva una reunión con</div>
            <div className={classes.userName}>Henry Segura</div>
          </Box>
          <Box className={classes.weekContainer}>
            <Box className={classes.weekOf}>Semana del</Box>
            <Box className={classes.weekControls}>
              <Box className={classes.weekStartDate}>
                <span>{firstDateOfWeekFormatted}</span>
              </Box>
              <Box className={classes.weekBackAndForwardContainer}>
                <Box>
                  <IconButton color="primary" component="span">
                    <LeftArrow />
                  </IconButton>
                </Box>
                <Box>
                  <IconButton color="primary" component="span">
                    <RightArrow />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Grid
          container
          columns={7}
          spacing={1}
          className={classes.calendarWrapper}
        >
          {weekDays.map((day) => {
            return (
              <Grid key={day.key} item xs className={classes.dayItem}>
                <Box className={classes.dayColumn} style={{}}>
                  <Box className={classes.dayHeader} style={{}}>
                    <Box>
                      <Box>
                        <span>{day.text}</span>
                      </Box>
                      <Box className={classes.dayHeaderDateContainer}>
                        <Box className={classes.dayHeaderDateHeader}>
                          <span>
                            {getDate(
                              add(new Date(firstDateOfWeek), {
                                days: day.key - 1,
                              })
                            )}
                          </span>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className={classes.hourSlot}>
                    {hoursByDay.map((hour) => {
                      return (
                        <Button
                          id={"btn-" + day.key + "-" + hour.key}
                          key={"btn-" + day.key + "-" + hour.key}
                          color="primary"
                          variant={
                            availableDates.indexOf(
                              String(day.key) + "-" + String(hour.key)
                            ) !== -1
                              ? "contained"
                              : "outlined"
                          }
                          size="large"
                          onClick={() => {
                            openMeetingRequest(day.key + "-" + hour.key);
                          }}
                          disabled={computeDisableDate(
                            day.key,
                            hour.key,
                            add(new Date(firstDateOfWeek), {
                              days: day.key - 1,
                            })
                          )}
                          className={
                            availableDates.indexOf(
                              String(day.key) + "-" + String(hour.key)
                            ) !== -1
                              ? classes.hourButtonSelected
                              : classes.hourButtonRegular
                          }
                        >
                          {availableDates.indexOf(
                            String(day.key) + "-" + String(hour.key)
                          ) === -1
                            ? ""
                            : hour.text}
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
    </Section>
  );
}

export default PublicAvailableDates;
