import React from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    paddingLeft: "20px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
  },
}));

const PageTitleComponent = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <span className={classes.title}>{props.title}</span>
      <hr />
    </Box>
  );
};

export default PageTitleComponent;
