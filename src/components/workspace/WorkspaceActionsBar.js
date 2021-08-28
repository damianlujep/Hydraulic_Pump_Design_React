import React, {useState} from 'react';
import {alpha, Divider, Menu, MenuItem, styled} from "@material-ui/core";
import {Archive, Edit, FileCopy} from "@material-ui/icons";
import ActionButton from "./ActionButton";

const WorkspaceActionsBar = () => {
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

    return (
        <section style={{display: "flex", margin: "30px 24px 20px"}}>
            <div style={{marginRight:"20px"}}>
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
                        <Edit />
                        Edit
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        <FileCopy />
                        Copy
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={handleClose} disableRipple>
                        <Archive />
                        Save Project
                    </MenuItem>
                </StyledMenu>
            </div>
            <div style={{marginRight:"20px"}}>
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
                        <Edit />
                        Calculation 1
                    </MenuItem>
                    <MenuItem onClick={handleClose2} disableRipple>
                        <FileCopy />
                        Calculation 2
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={handleClose2} disableRipple>
                        <Archive />
                        Calculation 3
                    </MenuItem>
                </StyledMenu>
            </div>
        </section>
    );
};

export default WorkspaceActionsBar;