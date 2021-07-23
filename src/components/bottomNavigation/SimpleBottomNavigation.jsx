import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import React from "react";
const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: "0",
  },
 
});

export default function SimpleBottomNavigation(props) {
  const classes = useStyles();
  const { onPress, tabBarList,current,hidden } = props;
  const [value, setValue] = React.useState(current);

  function renderBottomNavigationAction(){
      return tabBarList && tabBarList.map((item) => {
          return (
            <BottomNavigationAction
              label={item.title}
              key={item.key}
              icon={<item.icon className="BottomNavigationAction" />}
            />
          );
      })
  }
  return (
    <BottomNavigation
      value={value}
      style={{ display: hidden ? "flex" : "none" }}
      onChange={(event, newValue) => {
        setValue(newValue);
        onPress && onPress(newValue);
      }}
      showLabels
      className={classes.root}
    >
      {renderBottomNavigationAction()}
    </BottomNavigation>
  );
}
SimpleBottomNavigation.propTypes = {
  onPress: PropTypes.func,
  tabBarList: PropTypes.array,
};