import React from 'react';
import { useNavigate } from "react-router-dom";

import { mainListItems, secondaryListItems } from "./listItems";

import {AppBar, Box, Divider, Drawer, IconButton, List, Toolbar, Typography} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { ChevronLeft, Edit, Menu } from "@mui/icons-material";
import clsx from "clsx";

import { styles } from "../styles";

import WorkspaceActionsBar from "./WorkspaceActionsBar";
import WorkspaceMainBox from "./WorkspaceMainBox";
import Logout from "../home/Logout";
import {useAuth} from "../contexts/AuthContext";


const Workspace = () => {
    const projectInfoData = JSON.parse(sessionStorage.getItem("new-project-info-data"));
    const navigate = useNavigate();
    const DRAWER_WIDTH = 200;
    const { user } = useAuth();

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        toolbar: {
            paddingRight: 24, // keep right padding when drawer closed
        },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: DRAWER_WIDTH,
            width: `calc(100% - ${DRAWER_WIDTH}px - 8px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        menuButtonHidden: {
            display: 'none',
        },
        title: {
            flexGrow: 1,
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: DRAWER_WIDTH,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        },
        workspaceHeader: {
            display:"flex",
            justifyContent:"space-around",
            width: "100%",
            textAlign:"center",
            alignItems:"center"
        }
    }));

    const classes = useStyles();
    const classesMain = styles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const editUserInfoButtonHandler = () => {
        navigate(`/${user.username}/newProject`)
    }

    return (
        <Box className={clsx(classes.root, classesMain.container)}>
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                            size="large">
                            <Menu />
                        </IconButton>
                        <section className={classes.workspaceHeader}>
                            <Typography variant="subtitle2" color="inherit">
                                Analyst: {projectInfoData.analystName}
                            </Typography>
                            <Typography variant="subtitle2" color="inherit">
                                {projectInfoData.newProjectName}
                            </Typography>
                            <Box
                                sx={{display: "flex", alignItems: "center"}}
                                onClick={editUserInfoButtonHandler}
                            >
                                <IconButton
                                    aria-label="Edit completion data"
                                    size="large"
                                >
                                    <Edit fontSize="small" style={{fill: "white"}}/>
                                </IconButton>
                                <Typography variant="subtitle2" >Edit user information</Typography>
                            </Box>
                        </section>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <Box className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose} size="large">
                            <ChevronLeft />
                        </IconButton>
                    </Box>
                    <Divider />
                    <List>{mainListItems}</List>
                    <Divider />
                    <List>{secondaryListItems}</List>
                    <Divider />
                    <Logout />
                </Drawer>

                <main className={classes.content}>
                    <Box className={classes.appBarSpacer} />
                    <WorkspaceActionsBar/>
                    <WorkspaceMainBox/>
                </main>
        </Box>
    );
}

export default Workspace;