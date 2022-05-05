import { faAdd, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
    const history = useNavigate();

    const handleChangePage = () => {
        history("/add-product");
    };
    return (
        <div className="products__wrapper">
            <div className="products__container">
                <div className="home__order__btn__wrapper">
                    <button className="home__order__btn" onClick={() => handleChangePage()}>
                        <FontAwesomeIcon icon={faAdd} />
                        <span>Thêm sản phẩm mới</span>
                    </button>
                </div>
                <div className="products__item__wrapper">
                    <div className="products__item">
                        <div className="products__item__img">
                            <img src="https://khosiquanaogiare.com/wp-content/uploads/2020/01/xuong-dam-vay-gia-si-dam-vay-hot-girl-11-1.jpg" alt="" />
                        </div>
                        <div className="products__item__info">
                            <div className="products__item__info__name">
                                <span>Đầm dây sexy</span>
                            </div>
                            <div className="products__item__info__price">
                                <span>Giá gốc: </span>
                                <span>200.000</span>
                            </div>
                            <div className="products__item__info__price">
                                <span>Giá bán: </span>
                                <span>300.000</span>
                            </div>
                        </div>
                        <div className="orderItem__icon__edit__wrapper">
                            <FontAwesomeIcon icon={faEdit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
