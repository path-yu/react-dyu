import { Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

const useContainerStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
function TabPanel(props) {
  const { children, value, index, renderSign, ...other } = props;
  const renderBool = renderSign.current[index];
   
  if (renderBool || index === 0) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        {...other}
      >
        <Container className={useContainerStyles().root}>
          <Box>{children}</Box>
        </Container>
      </div>
    );
  }
 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      {...other}
    >
      {index === value && (
        <Container className={useContainerStyles().root}>
          <Box>{children}</Box>
        </Container>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { tabs, renderTabsContent, keyName,onChange } = props;
  const renderSign = useRef(Array(tabs.length).fill(false));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // 派发change事件
   onChange && onChange(newValue);
  };
  useEffect(() => {
    return () => {
      console.log('destroy');
    }
  })
  useEffect(() => {
    renderSign.current = Array(tabs.length).fill(false);
  }, [tabs]);
  useEffect(() => {
    renderSign.current[value] = true;
  }, [value]);
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          className="tabsWrapper"
          aria-label="scrollable auto tabs example"
        >
          {tabs.map((item, index) => {
            return (
              <Tab label={item[keyName]} key={index} {...a11yProps(index)} />
            );
          })}
        </Tabs>
      </AppBar>
      {tabs.map((item, index) => {
        return (
          <TabPanel
            key={index}
            value={value}
            index={index}
            renderSign={renderSign}
          >
            <div  style={{ overflow: "hidden", marginTop: "5px" }}>
              {renderTabsContent(item, index)}
            </div>
          </TabPanel>
        );
      })}
    </div>
  );
}
ScrollableTabsButtonAuto.propTypes = {
  tabs: PropTypes.array.isRequired,
  renderTabsContent: PropTypes.func,
};
