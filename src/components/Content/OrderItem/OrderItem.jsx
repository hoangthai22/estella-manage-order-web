import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const OrderItem = () => {
    var list = [1, 2];
    return (
        <div className="orderItem__wrapper">
            <div className="orderItem__image">
                {list.map((item, index) => {
                    if (index < 3) {
                        return (
                            <div>
                                <img src="https://cf.shopee.vn/file/b7a4a09891b578a18683e26c2224353a" alt="" />
                            </div>
                        );
                    } else if (index === 3) {
                        return <div style={{ display: "flex", alignItems: "center", fontSize: 18, color: "rgb(130,130,130)" }}>+ {list.length - 3}</div>;
                    }
                })}
            </div>

            <div className="orderItem__text__wrapper">
                <span className="orderItem__text">Nguyen Pham Hoang Thai, 290A Nguyễn Thị Minh Khai, Khóm 8, Phường 7, TP Trà Vinh, TP Trà Vinh, TP Trà Vinh</span>
            </div>
            <div className="orderItem__btn__detail__wrapper">
                <button className="orderItem__btn__detail">Xem chi tiết</button>
                <button className="orderItem__btn__detail">Đã giao</button>
            </div>
            <div className="orderItem__icon__edit__wrapper">
                <FontAwesomeIcon icon={faEdit} />
            </div>
        </div>
    );
};

export default OrderItem;
