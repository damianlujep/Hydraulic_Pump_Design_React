import React from 'react';
import {AppBar, Container, Toolbar, Typography} from "@material-ui/core";

const Header = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Container maxWidth={"ls"}>
                        <Typography variant="h6">
                            Hydraulic Pump Design
                        </Typography>
                    </Container>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;