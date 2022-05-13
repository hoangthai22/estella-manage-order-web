import React, { useContext, useEffect, useState } from "react";
import Loading from "react-loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getListOrdersShipped, getOrderById, putOrderIsFinish } from "../apis/apiServices";
import { createNotification } from "../components/Notification/Notification";
import { AppContext } from "../context/AppContext";
import { caculatorVND } from "../heplers/caculator";

const OrderDetailPage = () => {
    const { setIsLoading, orderListContext, setOrderListContext, setOrderListShippedContext } = useContext(AppContext);
    const [order, setOrder] = useState({});
    const param = useParams();
    const history = useNavigate();
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    useEffect(() => {
        if (param) {
            setIsLoading(true);
            getOrderById(param.id.toString()).then((res) => {
                if (res.data) {
                    setOrder(res.data);
                    setIsLoading(false);
                }
            });
        }
    }, []);

    const hanldeSubmit = (id) => {
        setIsLoadingBtn(true);
        putOrderIsFinish(id).then((res) => {
            if (res.data) {
                getListOrdersShipped(1, 10).then((resp) => {
                    if (resp.data) {
                        const newList = orderListContext.filter((item) => item._id !== id);
                        setOrderListContext(newList);
                        setOrderListShippedContext(resp.data);
                        setIsLoadingBtn(false);
                        createNotification("success", "Cập nhật thành công");
                    }
                });
            }
        });
    };
    return (
        <div className="add__order__wrapper">
            <div className="add__order__container">
                <div className="add__order__item__review__wrapper">
                    <div className="add__order__item__review">
                        <span>Sản phẩm</span>
                        <div style={{ height: 6 }}></div>
                        {order?.productOrders?.map((item) => {
                            if (item.isChecked) {
                                return (
                                    <div className="add__order__modal__item" key={item._id} style={{ marginTop: 5 }}>
                                        <div className="add__order__modal__item__img">
                                            <div className="orderItem__image__quantity">
                                                <span style={{ fontSize: 13 }}>{item.count}</span>
                                            </div>
                                            <img src={item.productOrderImage} alt="" />
                                        </div>
                                        <div className="add__order__modal__item__info add__order__item__review__text">
                                            <span style={{ fontSize: 16 }}>{item.productOrderName}</span>
                                            <span style={{ fontSize: 15 }}>{caculatorVND(item.price)}</span>
                                        </div>
                                        <div className="flex-center add__order__modal__item__info__size">
                                            <span>{item.size}</span>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className="add__order__item__wrapper">
                    <form action="">
                        <label>Thông tin khách hàng</label>
                        <div className="add__order__item__input order__detail__infomation__input">
                            <textarea type="text" name="" id="" value={order.information} placeholder="" />
                        </div>
                        <label>Tiền cọc: </label>
                        <span style={{ fontSize: 18 }}>{caculatorVND(order.pay)}</span>
                        <div style={{ marginTop: 10 }}>
                            <label>Tổng tiền: </label>
                            <span style={{ fontSize: 18 }}>{caculatorVND(order.total)}</span>
                        </div>
                        {/* <div className="add__order__item__radio">
                            <div>
                                <input type="radio" name="pay" id="" value={isPay} checked={!isPay} />
                                <span>Không cọc</span>
                            </div>
                            <div>
                                <input type="radio" name="pay" id="" value={isPay} checked={isPay} />
                                <span>Có cọc</span>
                            </div>
                        </div> */}
                        {/* <div className="add__order__item__input" style={{ display: isPay ? "flex" : "none" }}>
                            <input type="number" name="" id="" placeholder="Nhập số tiền cọc" onChange={(e) => setPay(e.target.value)} />
                        </div> */}

                        <div className="add__order__item__btn order__detail__btn">
                            <button className={`orderItem__btn__detail ${order.isFinish && "btn-color"}`} onClick={(e) => history("/")}>
                                Quay lại
                            </button>
                            <button onClick={(e) => hanldeSubmit(order._id)} className="orderItem__btn__detail" style={{ display: !order.isFinish ? "block" : "none" }}>
                                {isLoadingBtn ? (
                                    <div className="loading__btn__order-detail" style={{ top: "5px !important" }}>
                                        <Loading type="spokes" color={"#fff"} className="loading" width={25} />
                                    </div>
                                ) : (
                                    "Đã giao"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
