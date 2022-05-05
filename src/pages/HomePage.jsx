import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import OrderItem from "../components/Content/OrderItem/OrderItem";
import Header from "../components/Header/Header";

const HomePage = () => {
    const history = useNavigate();
    const hanldeChangePage = () => {
        history("/add-order");
    };
    return (
        <div className="home__wrapper">
            <div className="home__order__btn__wrapper">
                <button className="home__order__btn" onClick={() => hanldeChangePage()}>
                    <FontAwesomeIcon icon={faAdd} />
                    <span>Tạo đơn hàng</span>
                </button>
            </div>
            <div className="home__order__list">
                <OrderItem />
                <OrderItem />
                <OrderItem />
            </div>
        </div>
    );
};

export default HomePage;
