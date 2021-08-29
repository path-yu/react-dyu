import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";
import React, { forwardRef, useImperativeHandle, useState } from "react";
const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: "0",
  },
 
});

function SimpleBottomNavigation(props,ref) {
  const classes = useStyles();
  const { onPress, tabBarList,hidden } = props;
  const [value, setValue] = useState(0);
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
  function changeValue(index) {
    setValue(index);
  }
  useImperativeHandle(ref,()=>{
    return {
      changeValue,
    };
  })
  return (
    <BottomNavigation
      value={value}
      style={{ display: hidden ? "flex" : "none" }}
      onChange={(event, newValue) => {
        onPress && onPress(newValue);
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      {renderBottomNavigationAction()}
    </BottomNavigation>
  );
}


export default forwardRef(SimpleBottomNavigation);