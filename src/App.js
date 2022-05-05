import "./App.css";
import { DrawerContent } from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import Drawer from "react-modern-drawer";
import { useContext, useState } from "react";
import "react-modern-drawer/dist/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RevenuePage from "./pages/RevenuePage";
import ReactLoading from "react-loading";
import AppProvider, { AppContext } from "./context/AppContext";
import AddProductPage from "./pages/AddProductPage";
import ProductsPage from "./pages/ProductsPage";
import AddOrderPage from "./pages/AddOrderPage";
import { NotificationContainer } from "react-notifications";

function App() {
    const { isLoading } = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const changeCurrentPage = () => {
        setIsOpen(true);
    };
    const Loading = ({ type, color }) => <ReactLoading type={type} color={color} height={50} width={50} />;
    return (
        <BrowserRouter>
            <div className="App">
                {isLoading && (
                    <div className="loading__wrapper">
                        <div>
                            <Loading type="spinningBubbles" color={"#db7093"} className="loading" />
                        </div>
                    </div>
                )}

                <Header callbackFunc={changeCurrentPage} />
                <Drawer size={300} open={isOpen} onClose={toggleDrawer} direction="left" className="drawer__container">
                    <DrawerContent callbackFunc={toggleDrawer} />
                </Drawer>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/revenue" element={<RevenuePage />} />
                    <Route path="/add-product" element={<AddProductPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/add-order" element={<AddOrderPage />} />
                </Routes>
                <NotificationContainer />
            </div>
        </BrowserRouter>
    );
}

export default App;
