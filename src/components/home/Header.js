import React, {useState} from 'react';
import {AppBar, Container, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import theme from "../theme";
import { ExitToAppRounded } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [error, setError] = useState('')
    const { logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')
        try {
            await logout()
            navigate('/')
        } catch {
            setError('Failed to logout')
        }
    }
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
                                onClick={handleLogout}
                            >
                                <ExitToAppRounded/>
                            </IconButton>
                        </Tooltip>

                    </Container>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;