import { faBars, faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

const Header = (props) => {
    return (
        <div className="header__wrapper">
            <div className="header__container">
                <div className="header__icon__wrapper">
                    <FontAwesomeIcon icon={faBars} onClick={() => props.callbackFunc(true)} />
                </div>
                <div className="header__logo">
                    <span>Estella</span>
                </div>
                <div className="header__icon__wrapper" style={{ textAlign: "right" }}>
                    <FontAwesomeIcon icon={faPiggyBank} />
                </div>
            </div>
        </div>
    );
};

export default Header;
