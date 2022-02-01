import {BrowserRouter, Route, Routes } from "react-router-dom";

import {AuthProvider} from "./components/contexts/AuthContext";

import {ThemeProvider} from '@mui/material/styles';
import theme from "./components/theme";
import {CssBaseline} from "@mui/material";
import React from "react";
import { StyledEngineProvider } from '@mui/material/styles';
import Home from "./components/home/Home";
import PrivateRoute from "./components/routers/PrivateRoute";
import NewProject from "./components/newproject/NewProject";
import Workspace from "./components/workspace/Workspace";
import Projects from "./components/newproject/Projects";


function App() {

    return (
        <>
            <StyledEngineProvider injectFirst>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route index element={<Home />}/>
                            <Route path='/' element={<Home />}/>

                            <Route
                                path='/projects'
                                element={
                                    <PrivateRoute>
                                        <Projects/>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path=':username/newProject'
                                element={
                                    <PrivateRoute>
                                        <NewProject />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path=":username/workspace"
                                element={
                                    <PrivateRoute>
                                        <Workspace/>
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </ThemeProvider>
            </StyledEngineProvider>
        </>
  );
}

export default App;