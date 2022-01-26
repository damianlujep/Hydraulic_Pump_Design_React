import React, {useState} from 'react';
import SwipeableViews from 'react-swipeable-views';

import PropTypes from "prop-types";

import {AppBar, Box, Tab, Tabs, Typography, useTheme} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

import Completion from "./completion/Completion";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",

        '& .MuiTabs-indicator': {
            borderBottom: '2px solid #1890ff',
        },

        '& .MuiTab-wrapper': {
            color: "#1890ff",
            fontWeight: "600"
        }
    },
    stepBox:{
        height: "calc(100vh - 120px - 48px - 8px)",
    }
}));

const FullWidthTabs = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        //TODO: Check alerts on div
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Completion" {...a11yProps(0)} />
                    <Tab label="Fluids & PVT" {...a11yProps(1)} />
                    <Tab label="IPR & OPR" {...a11yProps(2)} />
                    <Tab label="Results" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction} className={classes.stepBox}>
                    <Completion/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction} className={classes.stepBox}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction} className={classes.stepBox}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction} className={classes.stepBox}>
                    Results
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}

export default FullWidthTabs;