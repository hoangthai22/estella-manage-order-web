import { useContext, useState } from "react";
import ReactLoading from "react-loading";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { NotificationContainer } from "react-notifications";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { DrawerContent } from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import { AppContext } from "./context/AppContext";
import AddOrderPage from "./pages/AddOrderPage";
import AddProductPage from "./pages/AddProductPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import RevenuePage from "./pages/RevenuePage";
import 'react-loading-skeleton/dist/skeleton.css'
import OrderDetailPage from "./pages/OrderDetailPage";
import SearchPage from "./pages/SearchPage";
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
                    <Route path="/order-detail/:id" element={<OrderDetailPage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
                <NotificationContainer />
            </div>
        </BrowserRouter>
    );
}

export default App;
