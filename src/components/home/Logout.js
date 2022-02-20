import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {ExitToAppRounded} from "@mui/icons-material";
import theme from "../theme";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const Logout = () => {

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
            <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                    <ExitToAppRounded
                        sx={{color: theme.palette.customized.grey}}
                    />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </>
    );
};

export default Logout;