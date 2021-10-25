import {createContext, useContext, useMemo, useState} from "react";
import {getSessionStorageOrDefault} from "../service/SessionStorageService";

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error(`useAuth must be called within AuthProvider`)
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getSessionStorageOrDefault("user", ""));
    const [authorized, setAuthorized] = useState(getSessionStorageOrDefault("authorized", false));
    const [jwt, setJwt] = useState(getSessionStorageOrDefault("jwt", ""));

    const login = async (userCredential) => {
        let isUserLogged = false;
        let jwtToken = "";

        await fetch(`http://localhost:8080/login`, {
            method: 'POST',
            body: JSON.stringify(userCredential),
        })
            .then(data => {
                jwtToken = data.headers.get("Authorization");
                return data.json();
            })
            .then(data => {
                const userData = data;
                if (jwtToken !== null && userData !== null) {
                    setAuthorized(true);
                    setJwt(jwtToken);
                    setUser(userData);
                    sessionStorage.setItem("user", JSON.stringify(userData));
                    sessionStorage.setItem("authorized", JSON.stringify(true));
                    sessionStorage.setItem("jwt", JSON.stringify(jwtToken));
                    isUserLogged = true;
                }
            })
            .catch(() => {
                return isUserLogged;
            });
        return isUserLogged;
    }

    const logout = async () => {
        sessionStorage.clear();
        setAuthorized(false);
        setJwt("");
        setUser("");
        return true;
    }

    const value = useMemo(() => ({
        authorized,
        jwt,
        user,
        login,
        logout
    }), [authorized, jwt, user]);

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
}