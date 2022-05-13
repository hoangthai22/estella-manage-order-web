import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Loading from "react-loading";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { searchOrderByKey } from "../apis/apiServices";
import OrderItem from "../components/Content/OrderItem/OrderItem";

const SearchPage = () => {
    const [key, setKey] = useState("");
    const [orderList, setOrderList] = useState([]);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const history = useNavigate();
    const hanldeSubmit = (e) => {
        e.preventDefault();
        if (key === "" || key === null) {
            return;
        }
        setIsLoadingSearch(true);
        setOrderList([]);
        document.activeElement.blur();
        searchOrderByKey(key).then((res) => {
            if (res.data) {
                setOrderList(res.data);
                setIsLoadingSearch(false);
            } else {
                setOrderList([]);
                setIsLoadingSearch(false);
            }
        });
    };
    return (
        <div className="search__wrapper">
            <div className="search__container">
                <div className="search__header">
                    <div className="search__icon__back">
                        <FontAwesomeIcon icon={faArrowLeft} onClick={() => history("/")} />
                    </div>
                    <form action="" className="search__input" onSubmit={(e) => hanldeSubmit(e)}>
                        <input type="text" placeholder="Nhập từ khóa" onChange={(e) => setKey(e.target.value)} />
                    </form>
                </div>
                <div className="home__order__list" style={{ marginTop: 15 }}>
                    {orderList?.map((item) => {
                        return <OrderItem data={item} />;
                    })}
                    {!isLoadingSearch && orderList.length === 0 && (
                        <div className="flex-center" style={{ marginTop: 20 }}>
                            Không tìm thấy đơn nào!
                        </div>
                    )}
                    {isLoadingSearch && (
                        <div className="flex-center">
                            <Loading type="cylon" color={"#db7093"} className="loading" width={55} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
