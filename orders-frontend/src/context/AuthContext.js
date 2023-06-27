import React from "react";
import { useState, useContext, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props){
    const[authUser, setAuthUser] = useState(null);
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[orders, setOrders] = useState(0);
    const[tableNumber, setTableNumber] = useState(0);
    const [total, setTotal] = useState(0);

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        orders,
        setOrders,
        tableNumber,
        setTableNumber,
        total,
        setTotal
    }

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}