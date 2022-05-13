import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getRevenue } from "../apis/apiServices";
import { caculatorVND } from "../heplers/caculator";
const RevenuePage = () => {
    const [revenue, setRevenue] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        getRevenue().then((res) => {
            if (res.data) {
                setRevenue(res.data);
                setIsLoading(false);
            }
        });
    }, []);
    return (
        <div className="revenue__wrapper">
            {isLoading ? (
                <div style={{ display: "flex", gap: 15 }}>
                    <div className=" skeleton__wrapper___revenue">
                        <Skeleton count={2} height={90} />
                    </div>
                    <div className=" skeleton__wrapper___revenue">
                        <Skeleton count={2} height={90} />
                    </div>
                </div>
            ) : (
                <>
                    <div className="revenue__container">
                        <div className="revenue__item__wrapper">
                            <span className="revenue__item__title">Đơn hàng</span>
                            <span className="revenue__item__count">{revenue.orders}</span>
                        </div>
                        <div className="revenue__item__wrapper">
                            <span className="revenue__item__title">Đơn hoàn thành</span>
                            <span className="revenue__item__count">{revenue.orderFinishs}</span>
                        </div>
                    </div>
                    <div className="revenue__container">
                        <div className="revenue__item__wrapper">
                            <span className="revenue__item__title">Đơn hủy</span>
                            <span className="revenue__item__count">{revenue.orderDelete}</span>
                        </div>
                        <div className="revenue__item__wrapper">
                            <span className="revenue__item__title">Doanh thu</span>
                            <span className="revenue__item__count">{caculatorVND(revenue.revenue)}</span>
                        </div>
                    </div>
                </>
            )}
            {isLoading ? (
                <div style={{ display: "flex" }}>
                    <div className=" skeleton__wrapper___revenue" style={{ width: "100%" }}>
                        <Skeleton count={1} height={90} />
                    </div>
                </div>
            ) : (
                <div className="revenue__container">
                    <div className="revenue__item__wrapper">
                        <span className="revenue__item__title">Tổng lợi nhuận</span>
                        <span className="revenue__item__count">{caculatorVND(revenue.profit)}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RevenuePage;
