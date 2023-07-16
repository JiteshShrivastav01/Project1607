import React from "react";

const AuthContext=React.createContext(
    {
        items : [],
        totalAmount:0
    }
)

export default AuthContext