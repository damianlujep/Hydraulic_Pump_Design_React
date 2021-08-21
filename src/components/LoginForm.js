import React, {useState} from 'react';
import {
    Button,
    Container,
    createStyles,
    FormGroup,
    InputAdornment,
    InputLabel,
    makeStyles,
    Paper,
    TextField
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {User} from "../models/User";
import {AccountCircle} from "@material-ui/icons";
import {useHistory} from "react-router-dom";

const LoginForm = ({addCurrentUser}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const history = useHistory();

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

            history.push("/newProject");
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
        })
    );

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
        <Paper square elevation={3} className={classes.paper}>
            <Container maxWidth={"md"}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <FormGroup className={classes.field}>
                        <TextField type="text"
                                   value={username}
                                   id="outlined-basic"
                                   label="Username"
                                   variant="outlined"
                                   onChange={e => setUsername(e.target.value)}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <AccountCircle/>
                                           </InputAdornment>
                                       ),
                                   }}>
                        </TextField>
                    </FormGroup>
                    <FormGroup className={classes.field}>
                        <TextField type="password"
                                   value={password}
                                   id="outlined-basic"
                                   label="Password"
                                   variant="outlined"
                                   onChange={e => setPassword(e.target.value)}
                                   className={classes.passwordInput}/>
                    </FormGroup>
                    <Button type="submit" variant="contained" color="primary">Login</Button>
                </form>
                <div>
                    {errorsJsx}
                </div>
            </Container>
        </Paper>
    );
};

export default LoginForm;