import React, { useState } from 'react';

import { URI_SAVE_PROJECT_TO_FILE } from "../../api-constants";
import { useAuth } from "../contexts/AuthContext";
import { getSessionStorageOrDefault } from "../service/SessionStorageService";
import SurveyService from "../service/SurveyService";

import { alpha, Box, Divider, Menu, MenuItem, styled } from "@mui/material";
import {Archive, Edit, FileCopy} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

import ActionButton from "./ActionButton";

const WorkspaceActionsBar = () => {
    const { jwt } = useAuth();

    const generateSaveProjectFileDate = () => {
        const newProjectInfoData = getSessionStorageOrDefault("new-project-info-data", {})
        const newProjectInfoDataEntered= getSessionStorageOrDefault("new-project-info-data-entered", false)
        const completionData = getSessionStorageOrDefault("completion-data", {})
        const completionDataEntered = getSessionStorageOrDefault("completion-data-entered", false)
        const surveyData = getSessionStorageOrDefault("survey-data", SurveyService.createSurveyInitialRows());
        const surveyDataEntered = getSessionStorageOrDefault("survey-data-entered", false);
        return {
            newProjectInfoData: {
                data: newProjectInfoData,
                dataEntered: newProjectInfoDataEntered
            },
            completionData: {
                data: completionData,
                dataEntered: completionDataEntered
            },
            surveyData: {
                data: surveyData,
                dataEntered: surveyDataEntered
            }
        }
    };

    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color: 'rgb(55, 65, 81)',
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, ' +
                'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, ' +
                'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, ' +
                'rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiList-root': {
                padding: '4px 0',
            },
            '& .MuiListItem-root': {
                ...theme.typography.body1,
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    )
                }
            }
        }
    }));

    const useStyles = makeStyles((theme) => ({
        iconStyled: {
            marginRight: "20px",
            color: theme.palette.customized.grey
        }
    }));
    const classes = useStyles();

    const [activateActionMenu, setActivateActionMenu] = useState(null);
    const [activateCalcMenu, setActivateCalcMenu] = useState(null);
    const isOpenedActions = Boolean(activateActionMenu);
    const isOpenedCalcs = Boolean(activateCalcMenu);

    const handleClick = (event) => {
        setActivateActionMenu(event.currentTarget);
    };

    const handleClick2 = (event) => {
        setActivateCalcMenu(event.currentTarget);
    };

    const handleClose = () => {
        setActivateActionMenu(null);
    };

    const handleClose2 = () => {
        setActivateCalcMenu(null);
    };

    const saveProjectHandler = async () => {
        const saveProjectFileData =  generateSaveProjectFileDate();
        const authHeader = { 'Authorization': jwt, 'Content-Type': 'application/json' };
        await fetch(URI_SAVE_PROJECT_TO_FILE, {
            method: 'POST',
            body: JSON.stringify(saveProjectFileData),
            headers: authHeader,
        }).then(res => {
            const filename = `${saveProjectFileData.newProjectInfoData.data?.newProjectName}.hpd`;
            res.blob().then(blob => {
                let url = window.URL.createObjectURL(blob.slice(0, blob.size, "text"));
                let a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
                handleClose();
            }).catch(e => console.log(e));
        });
    }

    return (
        <section style={{display: "flex", margin: "10px 24px 10px"}}>
            <Box sx={{marginRight:"40px"}}>
                <ActionButton
                    handleClick={handleClick}
                    open={isOpenedActions}
                    text="Actions"
                    buttonID="actions-menu-btn"
                    styledMenuID="actions-menu"
                />

                <StyledMenu
                    id="actions-menu"
                    MenuListProps={{
                        'aria-labelledby': 'actions-menu-btn',
                    }}
                    anchorEl={activateActionMenu}
                    open={isOpenedActions}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} disableRipple>
                        <Edit className={classes.iconStyled}/>
                        Edit
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        <FileCopy className={classes.iconStyled}/>
                        Copy
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={saveProjectHandler} disableRipple>
                        <Archive className={classes.iconStyled}/>
                        Save Project
                    </MenuItem>
                </StyledMenu>
            </Box>
            <Box sx={{marginRight:"20px"}}>
                <ActionButton
                    handleClick={handleClick2}
                    open={isOpenedCalcs}
                    text="Calculations"
                    buttonID="calculations-menu-btn"
                    styledMenuID="calculations-menu"
                />

                <StyledMenu
                    id="calculations-menu"
                    MenuListProps={{
                        'aria-labelledby': 'calculations-menu-btn',
                    }}
                    anchorEl={activateCalcMenu}
                    open={isOpenedCalcs}
                    onClose={handleClose2}
                >
                    <MenuItem onClick={handleClose2} disableRipple>
                        <Edit className={classes.iconStyled}/>
                        Calculation 1
                    </MenuItem>
                    <MenuItem onClick={handleClose2} disableRipple>
                        <FileCopy className={classes.iconStyled}/>
                        Calculation 2
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={handleClose2} disableRipple>
                        <Archive className={classes.iconStyled}/>
                        Calculation 3
                    </MenuItem>
                </StyledMenu>
            </Box>
        </section>
    );
};

export default WorkspaceActionsBar;