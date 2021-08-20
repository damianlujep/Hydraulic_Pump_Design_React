import React, {useState} from 'react';
import Header from "./Header";
import LoginForm from "./LoginForm";
import {setRef} from "@material-ui/core";
import Footer from "./Footer";

const Home = () => {
    const [currentUser, setCurrentUser] = useState("");

    const addCurrentUser = (user) => setCurrentUser(user);

    return (
        <>
            <LoginForm addCurrentUser={addCurrentUser}/>
            <Footer/>
        </>
    );
};

export default Home;