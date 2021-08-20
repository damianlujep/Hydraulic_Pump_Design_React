import React, {useState} from 'react';
import {Button, Container, createStyles, FormGroup, InputLabel, makeStyles, Paper, TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {User} from "../models/User";

const LoginForm = ({addCurrentUser}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        const tempErrors = [];
        e.preventDefault();

        console.log(username, password);

        if (username.trim() !== "damianlujep") {
            tempErrors.push("Incorrect username");
        }

        if (password.trim() !== "password") {
            tempErrors.push("Incorrect password")
        }

        setErrors(tempErrors);

        if (tempErrors.length === 0){
            const newUser = new User(username, password, "email@test.com");
            addCurrentUser(newUser);
            setErrors([]);
        }
    }

    const styles = makeStyles((theme) =>
        createStyles({
            form: {
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "center",
                flexWrap: "wrap",
            },
            field: {
                margin: "20px 20px"
            },
            unitSelect: {
                minWidth: "100px"
            },
            paper: {
                height: "calc(100vh - 50px)",
                display: "flex",
                alignItems: "center"
            }
        })
    );

    const classes = styles();
    let errorsJsx = null;

    if (errors.length > 0 ){
        errorsJsx = errors.map((err, index) => <Alert key={index} severity={"error"}>{err}</Alert>)
    }

    return (
        <Paper square elevation={3} className={classes.paper}>
            <Container maxWidth={"md"}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <FormGroup className={classes.field}>
                        <InputLabel>username</InputLabel>
                        <TextField value={username} onChange={e => setUsername(e.target.value)}/>
                    </FormGroup>
                    <FormGroup className={classes.field}>
                        <InputLabel>password</InputLabel>
                        <TextField type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </FormGroup>
                    <Button type="submit" variant="contained" color="primary">Login</Button>
                </form>
                {errorsJsx}
            </Container>
        </Paper>
    );
};

export default LoginForm;