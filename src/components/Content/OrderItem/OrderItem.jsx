import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import Loading from "react-loading";
import Modal from "react-modal/lib/components/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { getListOrdersShipped, putOrderIsFinish } from "../../../apis/apiServices";
import { AppContext } from "../../../context/AppContext";
import { caculatorVND } from "../../../heplers/caculator";
import { createNotification } from "../../Notification/Notification";

const OrderItem = (props) => {
    const { orderListContext, setOrderListShippedContext, setOrderListContext, tabHome } = useContext(AppContext);
    let { data } = props;
    const history = useNavigate();
    const location = useLocation();
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const hanldePutFinish = (id) => {
        openModal();
        // setIsLoadingBtn(true);
        // putOrderIsFinish(id).then((res) => {
        //     if (res.data) {
        //         getListOrdersShipped(1, 10).then((resp) => {
        //             if (resp.data) {
        //                 const newList = orderListContext.filter((item) => item._id !== id);
        //                 setOrderListContext(newList);
        //                 setOrderListShippedContext(resp.data);
        //                 setIsLoadingBtn(false);
        //                 createNotification("success", "Cập nhật thành công");
        //             }
        //         });
        //     }
        // });
    };
    const hanldeEdit = (id) => {
        history("/add-order", { replace: true, state: { id: id } });
    };
    function closeModal(e) {
        const body = document.querySelector("body");
        body.style.overflow = "auto";
        e.preventDefault();
        setIsOpen(false);
    }
    function openModal() {
        const body = document.querySelector("body");
        body.style.overflow = "hidden";
        setIsOpen(true);
    }
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
        },
    };
    return (
        <div className="orderItem__wrapper" style={{ margin: location.pathname === "/search" ? "0px 15px" : "unset" }}>
            <div className="orderItem__image">
                {data?.productOrders?.map((item, index) => {
                    if (index < 3) {
                        return (
                            <div key={index} className="orderItem__image__wrapper">
                                <div className="orderItem__image__quantity">
                                    <span>{item.count}</span>
                                </div>
                                <img src={item.productOrderImage} alt="" />
                            </div>
                        );
                    } else if (index === 3) {
                        return <div style={{ display: "flex", alignItems: "center", fontSize: 18, color: "rgb(130,130,130)" }}>+ {data?.productOrders?.length - 3}</div>;
                    }
                })}
            </div>

            <div className="orderItem__text__wrapper">
                <span className="orderItem__text">{data.information}</span>
            </div>
            <div className="orderItem__text__price">
                <span className="orderItem__text" style={{ fontWeight: "bold" }}>
                    Tổng tiền:{" "}
                </span>
                <span className="orderItem__text" style={{ fontWeight: "bold" }}>
                    {caculatorVND(data.total)}
                </span>
            </div>
            <div className="orderItem__btn__detail__wrapper">
                <button className={`orderItem__btn__detail ${tabHome === 1 && "btn-color"}`} onClick={() => history("/order-detail/" + data._id)}>
                    Xem chi tiết
                </button>
                <button className="orderItem__btn__detail" style={{ display: !data.isFinish ? "block" : "none" }} onClick={() => hanldePutFinish(data._id)}>
                    {isLoadingBtn ? (
                        <div className="loading__btn">
                            <Loading type="spokes" color={"#fff"} className="loading" width={25} />
                        </div>
                    ) : (
                        "Đã giao"
                    )}
                </button>
            </div>
            <div className="orderItem__icon__edit__wrapper">
                <FontAwesomeIcon icon={faEdit} onClick={() => hanldeEdit(data._id)} />
            </div>
            <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <div className="orderItem__modal__title">
                    <span>Bà có chắc là đã giao không?</span>
                </div>
                <div className="orderItem__modal__btn">
                    <span onClick={(e)=> closeModal(e)}>Hủy</span>
                    <span>Đúng vậy</span>
                </div>
            </Modal>
        </div>
    );
};

export default OrderItem;
