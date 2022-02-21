import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import DialogWithTransition from "./DialogWithTransition";
import { useState } from "react";

const LogoutDialog = ({ open, setOpen }) => {
    const { logout, user } = useAuth();
    const [error, setError] = useState('');
    let navigate = useNavigate();

    const handleClose = () => setOpen(false);
    const redirectLogout = () => navigate("/");

    const handleLogout = async () => {
        try {
            await logout() ? redirectLogout() : handleClose();
        } catch (e) {
            setError('Failed to logout');
            console.log(e);
        }
    };

    return (
        <DialogWithTransition
            open={open}
            setOpen={setOpen}
            title={`${user.name}, are you sure you want to logout?`}
            text={"Please, keep in mind that you will lose all the unsaved data."}
            actionButtonName={"Logout"}
            actionButtonHandler={handleLogout}
        />
    );
};

export default LogoutDialog;