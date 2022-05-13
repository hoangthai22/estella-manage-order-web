import { faBars, faPiggyBank, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getListOrders, getListOrdersShipped } from "../../apis/apiServices";
import { AppContext } from "../../context/AppContext";
import { Pages } from "../../heplers/constanst";
const Header = (props) => {
    const history = useNavigate();
    const { setOrderListContext, setIsLoadingHome, setOrderListShippedContext, orderListContext, orderListShippedContext, setTabHome } = useContext(AppContext);
    const location = useLocation();
    const [isShip, setIsShip] = useState(0);
    const handleChangePage = (page) => {
        if (page === Pages[1]) {
            history("/revenue");
        } else if (page === Pages[0]) {
            history("/");
        }
    };
    const hanldeSearchType = () => {
        history("/search");
    };
    useEffect(() => {
        if (isShip === 0 && orderListContext.length === 0) {
            setIsLoadingHome(true);
            getListOrders(1, 10)
                .then((res) => {
                    if (res.data !== null && res.data?.length > 0) {
                        setOrderListContext(res.data);
                        setIsLoadingHome(false);
                    } else {
                        setIsLoadingHome(false);
                    }
                })
                .catch((err) => {
                    setIsLoadingHome(false);
                });
        } else if (isShip === 1 && orderListShippedContext.length === 0) {
            setIsLoadingHome(true);
            getListOrdersShipped(1, 10)
                .then((res) => {
                    if (res.data !== null && res.data?.length > 0) {
                        setOrderListShippedContext(res.data);
                        setIsLoadingHome(false);
                    } else {
                        setIsLoadingHome(false);
                    }
                })
                .catch((err) => {
                    setIsLoadingHome(false);
                });
        }
    }, [isShip]);
    return (
        location.pathname !== "/search" && (
            <div className={`header__wrapper ${location.pathname !== "/" && "box-shadow"}`}>
                <div className="header__container">
                    <div className="header__icon__wrapper">
                        <FontAwesomeIcon icon={faBars} onClick={() => props.callbackFunc(true)} />
                    </div>
                    <div className="header__logo" onClick={() => handleChangePage(Pages[0])}>
                        <span>Estella</span>
                    </div>

                    <div className="header__icon__wrapper" style={{ textAlign: "right" }}>
                        <FontAwesomeIcon icon={faSearch} onClick={() => hanldeSearchType()} style={{ marginRight: 10, fontSize: 22 }} />
                        <FontAwesomeIcon icon={faPiggyBank} onClick={() => handleChangePage(Pages[1])} />
                    </div>
                </div>
                <div className="header__tab__wrapper box-shadow" style={{ display: location.pathname === "/" ? "flex" : "none" }}>
                    <div
                        className={`header__tab__item flex-center ${isShip === 0 && "border-bottom"}`}
                        onClick={() => {
                            setIsShip(0);
                            setTabHome(0);
                        }}
                    >
                        Chưa giao
                    </div>
                    <div
                        className={`header__tab__item flex-center ${isShip === 1 && "border-bottom"}`}
                        onClick={() => {
                            setIsShip(1);
                            setTabHome(1);
                        }}
                    >
                        Đã giao
                    </div>
                </div>
            </div>
        )
    );
};

export default Header;
