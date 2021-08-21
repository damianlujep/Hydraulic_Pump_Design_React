import {useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import NewProject from "./components/NewProject";
import Workspace from "./components/Workspace";

function App() {
    const [currentUser, setCurrentUser] = useState("");
    const [authorized, setAuthorized] = useState(false);

    const grandAccess = (user) => {
        if (user.username === "damianlujep" && user.password === "password") {
            setCurrentUser(user);
            setAuthorized(true);
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
                    component={() => <NewProject authorized={authorized} username={currentUser.username}/>}
                />
                <Route
                    exact
                    path={`/${currentUser.username}/workspace`}
                    component={() => <Workspace authorized={authorized} username={currentUser.username}/>}
                />
            </Switch>
        </BrowserRouter>
      </>
  );
}

export default App;