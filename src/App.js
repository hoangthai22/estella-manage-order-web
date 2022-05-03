import "./App.css";
import { DrawerContent } from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import Drawer from "react-modern-drawer";
import { useState } from "react";
import "react-modern-drawer/dist/index.css";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const changeCurrentPage = (childData) => {
        setIsOpen(true);
    };
    return (
        <div className="App">
            <Header callbackFunc={changeCurrentPage} />
            <Drawer size={300} open={isOpen} onClose={toggleDrawer} direction="left" className="drawer__container">
                <DrawerContent />
            </Drawer>
            <HomePage />
        </div>
    );
}

export default App;
