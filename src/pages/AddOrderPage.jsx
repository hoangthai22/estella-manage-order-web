import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import Modal from "react-modal/lib/components/Modal";
import { NotificationContainer } from "react-notifications";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getListProducts, getOrderById, postOrder, putOrder } from "../apis/apiServices";
import NotificationCustom, { createNotification } from "../components/Notification/Notification";
import { AppContext } from "../context/AppContext";
import { caculatorVND } from "../heplers/caculator";

const AddOrderPage = () => {
    const { setIsLoading, productList, setProductList } = useContext(AppContext);
    const [isPay, setIsPay] = useState(true);
    const [products, setProducts] = useState([]);
    const [productsChecked, setProductsChecked] = useState([]);
    const [info, setInfo] = useState("");
    const [pay, setPay] = useState("");
    const [isError, setIsError] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const history = useNavigate();
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenDelete, setIsOpenDelete] = React.useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const location = useLocation();
    window.onpopstate = () => {
        history("/");
    };
    useEffect(() => {
        if (location?.state?.id) {
            setIsLoading(true);
            setIsUpdate(true);
            getOrderById(location?.state?.id)
                .then((res) => {
                    if (res.data) {
                        const productCheckeds = res.data.productOrders;
                        console.log(res.data);
                        setProductsChecked(productCheckeds);
                        setInfo(res.data.information);
                        if (res.data.pay > 0) {
                            setIsPay(true);
                            setPay(res.data.pay);
                        } else {
                            setIsPay(false);
                        }
                        setIsLoading(false);
                        return res.data.productOrders;
                    }
                })
                .then((result) => {
                    getListProducts().then((res) => {
                        if (res.data !== null) {
                            const data = res.data.map((item) => {
                                for (let index = 0; index < result.length; index++) {
                                    if (result[index]._id === item._id) {
                                        item = { ...item, isChecked: true };
                                    }
                                }
                                return (item = { ...item, count: 1 });
                            });
                            setProducts(data);
                            setProductList(data);
                            setIsLoadingModal(false);
                        }
                    });
                });
        } else {
            setIsLoadingModal(true);
            getListProducts().then((res) => {
                if (res.data !== null) {
                    setProducts(res.data);
                    setProductList(res.data);
                    setIsLoadingModal(false);
                }
            });
        }
    }, []);
    function openModal() {
        const body = document.querySelector("body");
        body.style.overflow = "hidden";
        setIsOpen(true);
    }
    function openModalDelete(e) {
        e.preventDefault();
        const body = document.querySelector("body");
        body.style.overflow = "hidden";
        setIsOpenDelete(true);
    }

    function hanldeSelectedProduct(e) {
        e.preventDefault();
        setProductsChecked(products);
        closeModal(e);
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
    function closeModalDelete(e) {
        const body = document.querySelector("body");
        body.style.overflow = "auto";
        e.preventDefault();
        setIsOpenDelete(false);
    }
    function onChangeSelected(item) {
        const newProducts = products.map((pro) => {
            if (item._id === pro._id) {
                return (pro = { ...pro, isChecked: !pro.isChecked, count: item.count ? item.count : 1 });
            }
            return pro;
        });
        setProducts(newProducts);
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
    function onChangeSize(item, size) {
        const newProduct = productsChecked.map((pro) => {
            if (pro._id === item._id) {
                return (pro = { ...pro, size: size });
            }
            return pro;
        });
        setProductsChecked(newProduct);
    }
    const hanldeUpdate = (e) => {
        e.preventDefault();
        const id = location?.state?.id;
        if (info === "" || (isPay ? pay === "" : null)) {
            setIsError(true);
        } else {
            if (id) {
                const listProductsChecked = productsChecked.filter((pro) => pro.isChecked);
                setIsLoading(true);
                putOrder(id, { productOrders: listProductsChecked, information: info, pay: pay !== "" ? pay : 0 }).then((res) => {
                    if (res.data) {
                        history("/", { replace: true, state: { isReload: true } });
                        setIsError(false);
                        setIsLoading(false);
                        createNotification("success", "Tạo đơn hàng thành công");
                    }
                });
            }
        }
    };
    const hanldeSubmit = (e) => {
        e.preventDefault();
        const listProductsChecked = productsChecked.filter((pro) => pro.isChecked);

        if (listProductsChecked.length === 0 || info === "" || (isPay ? pay === "" : null)) {
            setIsError(true);
        } else {
            console.log(listProductsChecked, pay, info);
            let isValid = true;
            listProductsChecked.map((item) => {
                if (item.size === undefined || item.size === "") {
                    setIsError(true);
                    isValid = false;
                }
            });
            if (isValid) {
                setIsError(false);
                setIsLoading(true);

                postOrder({
                    productOrders: listProductsChecked,
                    information: info,
                    pay: isPay ? parseInt(pay) : 0,
                }).then((res) => {
                    if (res.data !== null) {
                        history("/", { replace: true, state: { isReload: true } });
                        setIsLoading(false);
                        createNotification("success", "Tạo đơn hàng thành công");
                    }
                });
            }
        }

        // setTimeout(() => {
        //     setIsLoading(false);
        //     history("/");
        //     createNotification("success", "Tạo đơn hàng thành công");
        // }, 2000);
    };
    const handleDelete = (e) => {
        closeModalDelete();
        e.preventDefault();
        const id = location?.state?.id;
        if (id) {
            setIsLoading(true);
            putOrder(id, { _destroy: true }).then((res) => {
                if (res.data) {
                    history("/", { replace: true, state: { isReload: true } });
                    setIsLoading(false);
                    createNotification("success", "Xóa đơn hàng thành công");
                }
            });
        }
    };
    const onChangeCount = (item, condition) => {
        if (condition) {
            const newProduct = products.map((pro) => {
                if (item._id === pro._id && item.count > 0) {
                    return (item = { ...item, count: item.count + 1 });
                }
                return pro;
            });
            setProducts(newProduct);
        } else {
            const newProduct = products.map((pro) => {
                if (item._id === pro._id && item.count > 0) {
                    return (item = { ...item, count: item.count - 1 });
                }
                return pro;
            });
            setProducts(newProduct);
        }
    };
    const unSelect = (item) => {
        const newProducts = products.map((pro) => {
            if (item._id === pro._id) {
                return (pro = { ...pro, isChecked: false, count: 1 });
            }
            return pro;
        });
        setProducts(newProducts);
        setProductsChecked(newProducts);
    };
    return (
        <div className="add__order__wrapper">
            <div className="add__order__container">
                <div className="add__order__item__review__wrapper">
                    <div className="add__order__item__review">
                        <span>Sản phẩm</span>
                        <div style={{ height: 6 }}></div>
                        {productsChecked.map((item) => {
                            if (item.isChecked) {
                                return (
                                    <div className="add__order__modal__item" key={item._id} style={{ marginTop: 5 }}>
                                        <div className="add__order__modal__item__img" onClick={() => openModal()}>
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
                                            <input type="text" placeholder="Size" value={item.size} required onChange={(e) => onChangeSize(item, e.target.value)} />
                                        </div>
                                        <div className="flex-center add__order__modal__item__info__icon" style={{ paddingRight: 5 }}>
                                            <FontAwesomeIcon icon={faRemove} style={{ fontSize: 22 }} onClick={() => unSelect(item)} />
                                        </div>
                                    </div>
                                );
                            }
                        })}
                        <div className="add__order__item__review__image" onClick={() => openModal()}>
                            <p>Thêm sản phẩm</p>
                        </div>
                    </div>
                </div>
                <div className="add__order__item__wrapper">
                    <form action="">
                        <label>Thông tin khách hàng</label>
                        <div className="add__order__item__input">
                            <textarea type="text" name="" id="" placeholder="" value={info} onChange={(e) => setInfo(e.target.value)} />
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
                            <input type="number" name="" id="" placeholder="Nhập số tiền cọc" value={pay} onChange={(e) => setPay(e.target.value)} />
                        </div>
                        {isError && (
                            <div className="" style={{ padding: "10px 0" }}>
                                <span className="error">Điền đủ thông tin nghe bà</span>
                            </div>
                        )}
                        <div className="add__order__item__btn">
                            {location?.state?.id && (
                                <button className="add__order__item__btn__delete" onClick={(e) => openModalDelete(e)}>
                                    Xóa đơn hàng
                                </button>
                            )}
                            {location?.state?.id ? <button onClick={(e) => hanldeUpdate(e)}>Cập nhật</button> : <button onClick={(e) => hanldeSubmit(e)}>Xác nhận</button>}
                        </div>
                    </form>

                    <Modal ariaHideApp={false} isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                        <div style={{ padding: 15 }}>
                            <h2 className="add__order__modal__title" ref={(_subtitle) => (subtitle = _subtitle)}>
                                Chọn sản phẩm
                            </h2>
                            <form className="add__order__modal__form" onSubmit={(val) => console.log(val)}>
                                <div className="add__order__modal__form">
                                    {products.map((item) => (
                                        <div className="add__order__modal__item" key={item._id}>
                                            <label className="add__order__modal__item__checkbox">
                                                <input type="checkbox" checked={item.isChecked} onChange={() => onChangeSelected(item)} />
                                                <span className="checkmark"></span>
                                            </label>
                                            <div className="add__order__modal__item__img" onClick={() => onChangeSelected(item)}>
                                                <img src={item.productOrderImage} alt="" />
                                            </div>
                                            <div className="add__order__modal__item__info">
                                                <span>{item.productOrderName}</span>
                                                <div className="add__order__modal__item__quantity">
                                                    <div onClick={() => onChangeCount(item, false)}>-</div>
                                                    <span>{item.count ? item.count : 1}</span>
                                                    <div onClick={() => onChangeCount(item, true)}>+</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoadingModal && (
                                        <div className="add__order__modal__item">
                                            <div className="flex-center skeleton__wrapper" style={{ marginTop: 20 }}>
                                                <Skeleton style={{ height: "80%" }} count={5} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="add__order__modal__form__btn">
                                    <button onClick={(e) => closeModal(e)}>Quay lại</button>
                                    <button onClick={(e) => hanldeSelectedProduct(e)}>Xác nhận</button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                    <Modal ariaHideApp={false} isOpen={modalIsOpenDelete} onRequestClose={closeModalDelete} style={customStyles} contentLabel="Example Modal">
                        <div
                            className="orderItem__modal__title"
                            style={{
                                padding: "15px 15px 0px 15px",
                            }}
                        >
                            <span style={{ textAlign: "center" }}>Bà có chắc là muốn xóa đơn hàng này không?</span>
                        </div>
                        <div className="orderItem__modal__btn">
                            <span onClick={(e) => closeModalDelete(e)}>Hủy</span>
                            <span onClick={(e) => handleDelete(e)}>Xóa luôn</span>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default AddOrderPage;
