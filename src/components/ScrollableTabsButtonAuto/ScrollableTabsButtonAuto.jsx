import { Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React from 'react';
import './ScrollableTabsButtonAuto.scss';


const useContainerStyles = makeStyles((theme) => ({
  root: {
   padding:0
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
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
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { tabs, renderTabsContent } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              <Tab label={item.tag_name} key={index} {...a11yProps(index)} />
            );
          })}
        </Tabs>
      </AppBar>
      {
        tabs.map((item,index) => {
          return (
            <TabPanel key={index} value={value} index={index}>
              <div style={{overflow:'hidden',marginTop:'5px'}}>{renderTabsContent(item)}</div>
            </TabPanel>
          );
        })
      }      
    
    </div>
  );
}
ScrollableTabsButtonAuto.propTypes = {
  tabs: PropTypes.array.isRequired,
  renderTabsContent:PropTypes.func
};
