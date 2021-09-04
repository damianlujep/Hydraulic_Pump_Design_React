import {useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/home/Home";
import NewProject from "./components/newproject/NewProject";
import Workspace from "./components/workspace/Workspace";
import {getSessionStorageOrDefault} from "./components/service/SessionStorageService";

function App() {
    const [username, setUsername] = useState(getSessionStorageOrDefault("username", ""));
    const [authorized, setAuthorized] = useState(getSessionStorageOrDefault("authorized", false));

    const grandAccess = (user) => {
        if (user.username === "damianlujep" && user.password === "password") {
            setUsername(user.username);
            setAuthorized(true);
            sessionStorage.setItem("authorized", JSON.stringify(true));
        }
    }

    return (
      <>
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={() => <Home grandAccess={grandAccess}/>}
                />
                <Route
                    exact
                    path="/newProject"
                    component={() => <NewProject authorized={authorized} username={username}/>}
                />
                <Route
                    exact
                    path={`/${username}/workspace`}
                    component={() => <Workspace authorized={authorized} username={username}/>}
                />
            </Switch>
        </BrowserRouter>
      </>
  );
}

export default App;