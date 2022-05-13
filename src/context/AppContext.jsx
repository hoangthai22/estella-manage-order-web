import React, { useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [productList, setProductList] = useState([]);
    const [orderListContext, setOrderListContext] = useState([]);
    const [isLoadingHome, setIsLoadingHome] = useState(false);
    const [tabHome, setTabHome] = useState(0);
    const [orderListShippedContext, setOrderListShippedContext] = useState([]);
    return (
        <AppContext.Provider
            value={{
                isLoadingHome,
                setIsLoadingHome,
                isLoading,
                setIsLoading,
                productList,
                setProductList,
                orderListContext,
                setOrderListContext,
                orderListShippedContext,
                setOrderListShippedContext,
                tabHome,
                setTabHome,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
