import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useLocation, useNavigate } from "react-router-dom";
import { getListOrders } from "../apis/apiServices";
import OrderItem from "../components/Content/OrderItem/OrderItem";
import { AppContext } from "../context/AppContext";

const HomePage = () => {
    const { orderListContext, isLoadingHome, setIsLoadingHome, orderListShippedContext, setOrderListContext, tabHome } = useContext(AppContext);
    const history = useNavigate();
    // const [orderList, setOrderList] = useState([]);

    const location = useLocation();
    const hanldeChangePage = () => {
        history("/add-order");
    };
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);
    useEffect(() => {
        if (location.state?.isReload) {
            setIsLoadingHome(true);
            getListOrders(1, 10)
                .then((res) => {
                    if (res.data !== null && res.data?.length > 0) {
                        setIsLoadingHome(false);
                        setOrderListContext(res.data);
                    } else {
                        setIsLoadingHome(false);
                    }
                })
                .catch((err) => {
                    setIsLoadingHome(false);
                });
        }
    }, []);
    return (
        <div className="home__wrapper">
            <div className="home__order__btn__wrapper">
                <button className="home__order__btn" onClick={() => hanldeChangePage()}>
                    <FontAwesomeIcon icon={faAdd} />
                    <span>Tạo đơn hàng</span>
                </button>
            </div>
            <div className="home__order__list">
                {tabHome === 0
                    ? orderListContext?.map((item) => {
                          return <OrderItem data={item} />;
                      })
                    : orderListShippedContext?.map((item) => {
                          return <OrderItem data={item} />;
                      })}
                {!isLoadingHome && (tabHome === 0 ? orderListContext.length === 0 : orderListShippedContext.length === 0) && <div className="flex-center">Không có đơn hàng nào</div>}
                {isLoadingHome && (
                    <div className="flex-center skeleton__wrapper" style={{ marginTop: 20, height: 200 }}>
                        <Skeleton count={4} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
