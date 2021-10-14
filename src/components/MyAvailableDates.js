import React from "react";
import Section from "./Section";
import {
  Typography,
  Grid,
  Container,
  Card,
  Button,
  Box,
} from "@material-ui/core";
import SectionHeader from "./SectionHeader";
import { useAuth } from "../util/auth.js";
import { useRouter } from "../util/router.js";
import { makeStyles } from "@material-ui/core/styles";

import DayHeader from "./DayHeader";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
}));

function MyAvailableDates(props) {
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
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Box
          style={{
            position: "sticky",
            zIndex: 2,
            top: "0px",
            paddingBottom: "40px",
            backgroundColor: "white",
          }}
        >
          <SectionHeader
            title={props.title}
            subtitle={props.subtitle}
            size={4}
            textAlign="center"
          />
        </Box>
        <Grid
          container
          columns={7}
          spacing={1}
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            boxSizing: "border-box",
          }}
        >
          {weekDays.map((day) => {
            return (
              <Grid
                key={day.key}
                item
                xs
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexBasis: 0,
                  flexGrow: 1,
                  maxWidth: "100%",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    flexDirection: "column",
                  }}
                >
                  <Box
                    style={{
                      top: "80px",
                      position: "sticky",
                      borderBottom: "1px solid #CBCBD6",
                      marginBottom: "8px",
                      paddingBottom: "16px",
                      zIndex: 1,
                      backgroundColor: "white",
                    }}
                  >
                    <span>{day.text}</span>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      flexDirection: "column",
                    }}
                  >
                    {hoursByDay.map((hour) => {
                      return (
                        <Button
                          key={hour.key}
                          variant="outlined"
                          style={{ marginBottom: "5px" }}
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

          {/* {weekDays.map((day) => {
            return <DayHeader key={"day-header" + String(day.key)} day={day} />;
          })} */}
        </Grid>
      </Container>
    </Section>
  );
}

export default MyAvailableDates;
