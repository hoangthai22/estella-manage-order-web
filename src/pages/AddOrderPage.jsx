import React, { useState, useContext } from "react";
import Modal from "react-modal/lib/components/Modal";
import { NotificationContainer } from "react-notifications";
import { useNavigate } from "react-router-dom";
import NotificationCustom, { createNotification } from "../components/Notification/Notification";
import { AppContext } from "../context/AppContext";

const AddOrderPage = () => {
    const { setIsLoading } = useContext(AppContext);
    const [isPay, setIsPay] = useState(true);
    const [products, setProducts] = useState([]);
    const history = useNavigate();
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        const body = document.querySelector("body");
        body.style.overflow = "hidden";
        setIsOpen(true);
    }

    function hanldeSelectedProduct(e) {
        e.preventDefault();
        console.log(products);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "#f00";
    }
    // const getIndex = (list, el) => {
    //     for (let index = 0; index < list.length; index++) {
    //         if (el === list[index]) return index;
    //     }
    // };
    function closeModal(e) {
        const body = document.querySelector("body");
        body.style.overflow = "auto";
        e.preventDefault();
        setIsOpen(false);
    }
    function onChangeSelected(item) {
        let listProducts = products;
        for (let index = 0; index < [0, 1, 2, 3, 4, 5].length; index++) {
            if (listProducts.includes(item)) {
                listProducts = listProducts.filter((i) => i === item);
                setProducts(listProducts);
                return;
            }
        }
        // console.log(item);
        listProducts.push(item);
        setProducts(listProducts);
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

    const hanldeSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();
        setTimeout(() => {
            setIsLoading(false);
            history("/");
            createNotification("success", "Tạo đơn hàng thành công");
        }, 2000);
    };
    return (
        <div className="add__order__wrapper">
            <div className="add__order__container">
                <div className="add__order__item__review__wrapper">
                    <div className="add__order__item__review">
                        <span>Sản phẩm</span>
                        <div className="add__order__item__review__image" onClick={() => openModal()}>
                            <p>Thêm sản phẩm</p>
                        </div>
                    </div>
                </div>
                <div className="add__order__item__wrapper">
                    <form action="">
                        <label>Thông tin khách hàng</label>
                        <div className="add__order__item__input">
                            <textarea type="text" name="" id="" placeholder="" />
                        </div>
                        <label>Tiền cọc</label>
                        <div className="add__order__item__radio">
                            <div onClick={() => setIsPay(false)}>
                                <input type="radio" name="pay" id="" value={isPay} checked={!isPay} />
                                <span>Không cọc</span>
                            </div>
                            <div onClick={() => setIsPay(true)}>
                                <input type="radio" name="pay" id="" value={isPay} checked={isPay} />
                                <span>Có cọc</span>
                            </div>
                        </div>
                        <div className="add__order__item__input" style={{ display: isPay ? "flex" : "none" }}>
                            <input type="number" name="" id="" placeholder="Nhập số tiền cọc" />
                        </div>
                        <div className="add__order__item__btn">
                            <button onClick={(e) => hanldeSubmit(e)}>Xác nhận</button>
                        </div>
                    </form>
                    <Modal ariaHideApp={false} isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                        <h2 className="add__order__modal__title" ref={(_subtitle) => (subtitle = _subtitle)}>
                            Chọn sản phẩm
                        </h2>
                        <form className="add__order__modal__form" onSubmit={(val) => console.log(val)}>
                            <div className="add__order__modal__form">
                                {[0, 1, 2, 3, 4, 5].map((item) => (
                                    <div className="add__order__modal__item">
                                        <label class="add__order__modal__item__checkbox">
                                            <input type="checkbox" onChange={() => onChangeSelected(item)} />
                                            <span class="checkmark"></span>
                                        </label>
                                        <div className="add__order__modal__item__img">
                                            <img src="https://khosiquanaogiare.com/wp-content/uploads/2020/01/xuong-dam-vay-gia-si-dam-vay-hot-girl-11-1.jpg" alt="" />
                                        </div>
                                        <div className="add__order__modal__item__info">
                                            <span>Vay den sexy</span>
                                            <span>300.000</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="add__order__modal__form__btn">
                                <button onClick={(e) => closeModal(e)}>Quay lại</button>
                                <button onClick={(e) => hanldeSelectedProduct(e)}>Xác nhận</button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default AddOrderPage;
