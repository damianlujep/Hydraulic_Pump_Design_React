import React, {useState} from 'react';
import {
    Button,
    Container,
    createStyles,
    FormGroup,
    InputAdornment,
    makeStyles,
    Paper,
    TextField
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {User} from "../../models/User";
import {AccountCircle} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {API_BASE_URL} from "../../api-constants";

const LoginForm = ({grandAccess}) => {
    const [user, setUser] = useState({username: "", password: ""});
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const handleUserInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value.trim()})
    }

    const handleSubmit = (e) => {
        const tempErrors = [];
        e.preventDefault();

        //Authentication thought API
        if (user.password !== "" && user.username !== ""){
            fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                body: JSON.stringify(user),
            })
                .then(data => {
                    const jwtToken = data.headers.get("Authorization");
                    if (jwtToken !== null){
                        grandAccess(new User(user.username, user.password));
                        setErrors([]);
                        sessionStorage.setItem("jwt", jwtToken);
                        sessionStorage.setItem("username", JSON.stringify(user.username));
                        sessionStorage.setItem("user", JSON.stringify(data));
                        history.push("/newProject");
                    }

                })
                .catch(() => {
                    tempErrors.push("Incorrect username or password");
                    setErrors(tempErrors);
                });
        } else {
            tempErrors.push("Incorrect username or password");
            setErrors(tempErrors);
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
                                       ),
                                   }}>
                        </TextField>
                    </FormGroup>
                    <FormGroup className={classes.field}>
                        <TextField type="password"
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
    );
};

export default LoginForm;