import React, { useState, useEffect } from "react";

import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import LeftArrow from "@material-ui/icons/ChevronLeft";
import RightArrow from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/core/styles";

import { toast } from "react-toastify";
import { useAuth } from "../util/auth.js";
import { useRouter } from "../util/router.js";

import PageLoader from "./PageLoader";

import * as userServices from "../services/userServices";

import {
  format,
  startOfWeek,
  add,
  getDate,
  isSameDay,
  compareAsc,
} from "date-fns";

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

  const currentWeekFirstDate = startOfWeek(new Date());
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [firstDateOfWeek, setFirstDateOfWeek] = useState(
    startOfWeek(new Date())
  );
  const [firstDateOfWeekFormatted, setFirstDateOfWeekFormatted] = useState(
    firstDateOfWeek ? format(firstDateOfWeek, "dd/MMMM/yyyy") : ""
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserInformation();
  }, []);

  useEffect(() => {
    setFirstDateOfWeekFormatted(format(firstDateOfWeek, "dd/MMMM/yyyy"));
    getUserInformation();
  }, [firstDateOfWeek]);

  const getUserInformation = () => {
    setIsLoading(true);
    userServices
      .getUserInfoByLinkId(props.userUrl, new Date(firstDateOfWeek).getTime())
      .then((response) => {
        if (response.code === undefined || response.code === 200) {
          setUserId(response.user.id);
          setUserName(response.user.firstName);
          setUserLastName(response.user.lastName);
          setUserEmail(response.user.email);
          formatAvailableDates(response.availableDates);
          formatUpcomingMeetings(response.upcomingMeetings);
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
  };

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

    setAvailableDates(formattedDates);
  };

  const formatUpcomingMeetings = (meetings) => {
    let formattedUpcomingMeetings = meetings.map((meeting) => {
      return {
        id: meeting.id,
        startDateTs: meeting.startDateTs,
        startDate: new Date(meeting.startDateTs),
        endDateTs: meeting.endDateTs,
        fromTime: meeting.fromTime,
        toTime: meeting.toTime,
        timeKey: String(meeting.fromTime) + "-" + String(meeting.toTime),
      };
    });

    setUpcomingMeetings(formattedUpcomingMeetings);
  };

  const openMeetingRequest = (selectedDateTs, hourKey) => {
    router.push(
      `/meeting-request/${selectedDateTs}/${hourKey}/${userId}/${userName}/${userLastName}/${userEmail}`
    );
  };

  const computeDisableDate = (dayKey, hourKey, dayDate) => {
    // disable if it's in the past already
    if (compareAsc(dayDate, new Date()) === -1) {
      return true;
    }

    // disable if it's not in the list of availableDates
    if (availableDates.indexOf(String(dayKey) + "-" + String(hourKey)) === -1) {
      return true;
    }

    // disable if it's in the list of upcoming meetings (already booked)
    let meetingsInDate = upcomingMeetings.filter(
      (date) => isSameDay(dayDate, date.startDate) && date.timeKey === hourKey
    );

    return meetingsInDate.length > 0;
  };

  const oneWeekAhead = () => {
    setFirstDateOfWeek(
      add(new Date(firstDateOfWeek), {
        days: 7,
      })
    );
  };

  const oneWeekBehind = () => {
    setFirstDateOfWeek(
      add(new Date(firstDateOfWeek), {
        days: -7,
      })
    );
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
            <div className={classes.userName}>
              {userName}&nbsp;{userLastName}
            </div>
          </Box>
          <Box className={classes.weekContainer}>
            <Box className={classes.weekOf}>Semana del</Box>
            <Box className={classes.weekControls}>
              <Box className={classes.weekStartDate}>
                <span>{firstDateOfWeekFormatted}</span>
              </Box>
              <Box className={classes.weekBackAndForwardContainer}>
                <Box>
                  <IconButton
                    color="primary"
                    component="span"
                    disabled={isSameDay(
                      new Date(firstDateOfWeek),
                      new Date(currentWeekFirstDate)
                    )}
                    onClick={() => {
                      oneWeekBehind();
                    }}
                  >
                    <LeftArrow />
                  </IconButton>
                </Box>
                <Box>
                  <IconButton
                    color="primary"
                    component="span"
                    onClick={() => {
                      oneWeekAhead();
                    }}
                  >
                    <RightArrow />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {isLoading ? (
          <PageLoader />
        ) : (
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
                                  days: day.key,
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
                              openMeetingRequest(
                                add(new Date(firstDateOfWeek), {
                                  days: day.key,
                                }).getTime(),
                                hour.key
                              );
                            }}
                            disabled={computeDisableDate(
                              day.key,
                              hour.key,
                              add(new Date(firstDateOfWeek), {
                                days: day.key,
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
        )}
      </Container>
    </Section>
  );
}

export default PublicAvailableDates;
