import React from 'react';

import {AppBar, Container, Toolbar, Typography} from "@mui/material";

const Header = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Container maxWidth={"lg"}>
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