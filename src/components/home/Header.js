import React, {useState} from 'react';

import theme from "../theme";

import { AppBar, Container, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { ExitToAppRounded } from "@mui/icons-material";

import LogoutDialog from "../dialogs/LogoutDialog";

const Header = () => {
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const requestLogoutDialog = () => setOpenLogoutDialog(true);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Container maxWidth={"xl"} sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Typography variant="h6">
                            Hydraulic Pump Design
                        </Typography>
                        <Tooltip title="Logout">
                            <IconButton
                                sx={{color: theme.palette.primary.contrastText}}
                                onClick={requestLogoutDialog}
                            >
                                <ExitToAppRounded/>
                            </IconButton>
                        </Tooltip>
                    </Container>
                </Toolbar>
            </AppBar>
            {openLogoutDialog && <LogoutDialog open={openLogoutDialog} setOpen={setOpenLogoutDialog} />}
        </>
    );
};

export default Header;