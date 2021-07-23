import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { ArrowBack, Home } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontSize: "16px",
    color:'white'
  },
  menu:{
    marginRight:'5px'
  },
  Toolbar:{
    padding:'0 10px'
  },
 
  title: {
    width:'238px',
    flexGrow: 1,
    fontSize: "16px",
    textAlign: "center",
    overflow:'hidden',
    textOverflow: 'ellipsis',
  },
  offside: {
    fontSize: "18px",
    marginLeft:'10px'
  },
}));

export default function ButtonAppBar(props) {
  const { title = "团宠大佬：妈咪，你马甲掉了43443" } = props;  
  const classes = useStyles();
  const {goBack,push} = useHistory();  
  return (
    <div
      className={classes.root}
      style={{ background: "linear-gradient(to right, #4fba46, #82c542)" }}
    >
      <AppBar position="sticky" color='transparent'>
        <Toolbar className={classes.Toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={goBack}
            className={classes.menu}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <span className="no-wrap">{title}</span>
          </Typography>
          <IconButton
            edge="start"
            size={"small"}
            className={classes.menuButton}
            color="inherit"
            onClick={() => push("/")}
            aria-label="menu"
          >
            <Home />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
