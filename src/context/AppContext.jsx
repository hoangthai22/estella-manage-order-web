import React, { useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    return <AppContext.Provider value={{ isLoading, setIsLoading }}>{children}</AppContext.Provider>;
}
