import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import NewProject from "./components/NewProject";
import {useState} from "react";

function App() {
    const [currentUser, setCurrentUser] = useState("");
    const [authorized, setAuthorized] = useState(false);

    const grandAccess = (user) => {
        if (user.username === "damianlujep" && user.password === "password"){
            setCurrentUser(user);
            setAuthorized(true);
        }
    }

    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => <Home grandAccess={grandAccess}/>}/>
              <Route exact path="/newProject" component={() => <NewProject authorized={authorized}/>}/>
          </Switch>
        </BrowserRouter>
      </>
  );
}

export default App;