import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React from "react";

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: "0.41666667rem",
    padding: "0.16666667rem 0.33333333rem",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "rgb(130, 197, 66)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
})(Button);


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  bg:{
      background:'red'
  }
}));


export default function CustomizedButtons(props) {
  const {
    text = "加入阅读",
    onClick,
    backgroundColor = "rgb(130, 197, 66)",
  } = props;  
  const classes = useStyles();

  return (
    <div>
      <BootstrapButton
        variant="contained"
        color="primary"
        style={{ background: backgroundColor }}
        onClick={onClick}
        className={classes.margin}
      >
        {text}
      </BootstrapButton>
    </div>
  );
}
