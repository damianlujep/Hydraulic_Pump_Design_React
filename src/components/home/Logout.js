import React, { useState } from 'react';

import { ExitToAppRounded } from "@mui/icons-material";
import theme from "../theme";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import LogoutDialog from "../dialogs/LogoutDialog";

const Logout = () => {
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const requestLogoutDialog = () => setOpenLogoutDialog(true);

    return (
        <>
            <ListItem button onClick={requestLogoutDialog}>
                <ListItemIcon>
                    <ExitToAppRounded
                        sx={{color: theme.palette.customized.grey}}
                    />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
            {openLogoutDialog && <LogoutDialog open={openLogoutDialog} setOpen={setOpenLogoutDialog} />}
        </>
    );
};

export default Logout;