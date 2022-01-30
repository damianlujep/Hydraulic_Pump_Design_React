import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import { Alert, Button, Container, FormGroup, InputAdornment, Paper, TextField} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { AccountCircle } from "@mui/icons-material";

const LoginForm = () => {
    const [user, setUser] = useState({username: "", password: ""});
    const [errors, setErrors] = useState([]);
    const { login } = useAuth();
    const history = useHistory();

    const redirect = () =>{
        history.push("/newProject")
    };

    const handleUserInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value.trim()})
    };

    const handleSubmit = async (e) => {
        const tempErrors = [];
        setErrors([]);
        e.preventDefault();

        const flagLoginErrorAndSave = () => {
            tempErrors.push("Incorrect username or password");
            setErrors(tempErrors);
        }

        //Authentication thought API with AuthContext.js
        if (user.password !== "" && user.username !== "") {
            (await login(user)) ? redirect() : flagLoginErrorAndSave();
        } else {
            flagLoginErrorAndSave();
        }
    };

    const styles = makeStyles(() => ({
        form: {
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "40px"
        },
        field: {
            margin: "20px 20px"
        },
        paper: {
            height: "calc(100vh - 50px)",
            display: "flex",
            alignItems: "center"
        },
        passwordInput: {
            width: "261px"
        },
        alert: {
            margin: "0 auto 10px",
            width: "300px",
            justifyContent: "center",
        },
    }));

    const classes = styles();
    let errorsJsx = null;

    if (errors.length > 0) {
        errorsJsx = errors.map((err, index) =>
            <Alert className={classes.alert}
                   key={index}
                   severity={"error"}
            >
                {err}
            </Alert>)
    }

    return (

        <>
                <Paper square elevation={3} className={classes.paper}>

                    <Container maxWidth={"md"}>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <FormGroup className={classes.field}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Username"
                                    variant="outlined"
                                    name="username"
                                    onChange={handleUserInputChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle/>
                                            </InputAdornment>
                                        )
                                    }}
                                >
                                </TextField>
                            </FormGroup>
                            <FormGroup className={classes.field}>
                                <TextField
                                    type="password"
                                    id="outlined-basic"
                                    label="Password"
                                    variant="outlined"
                                    name="password"
                                    onChange={handleUserInputChange}
                                    className={classes.passwordInput}/>
                            </FormGroup>
                            <Button type="submit" variant="contained" color="primary">Login</Button>
                        </form>
                        <div>
                            {errorsJsx}
                        </div>
                    </Container>
                </Paper>
        </>
    );
};

export default LoginForm;