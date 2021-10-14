import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";

const DayHeader = (props) => {
  return (
    <>
      <Grid item xs>
        <div
          style={{
            textAlign: "center",
            padding: 5,
          }}
        >
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            {props.day.text}
          </Typography>
        </div>
      </Grid>
    </>
  );
};

export default DayHeader;
