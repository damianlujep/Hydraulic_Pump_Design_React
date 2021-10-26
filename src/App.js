import {BrowserRouter, Switch} from "react-router-dom";
import Home from "./components/home/Home";
import NewProject from "./components/newproject/NewProject";
import Workspace from "./components/workspace/Workspace";
import {useAuth} from "./components/contexts/AuthContext";
import PublicRoute from "./components/routers/PublicRoute";
import PrivateRoute from "./components/routers/PrivateRoute";

function App() {
    const { user } = useAuth();

    return (
        <>
            <BrowserRouter>
                    <Switch>
                        <PublicRoute
                            exact
                            path="/"
                            component={() => <Home />}
                        />
                        <PrivateRoute
                            exact
                            path="/newProject"
                            component={() => <NewProject />}
                        />
                        <PrivateRoute
                            exact
                            path={`/${user.username}/workspace`}
                            component={() => <Workspace />}
                        />
                    </Switch>
            </BrowserRouter>
        </>
  );
}

export default App;