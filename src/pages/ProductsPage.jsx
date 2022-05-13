import { faAdd, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getListProducts } from "../apis/apiServices";
import { AppContext } from "../context/AppContext";
import { caculatorVND } from "../heplers/caculator";
import { Pages } from "../heplers/constanst";

const ProductsPage = () => {
    console.log(Date.now());
    const { productList, setProductList, isLoading, setIsLoading } = useContext(AppContext);
    const history = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (location.state?.isReload) {
            setIsLoadingProduct(true);
            getListProducts()
                .then((res) => {
                    if (res.data !== null && res.data?.length > 0) {
                        setProducts(res.data);
                        setProductList(res.data);
                        setIsLoadingProduct(false);
                    } else {
                        setProducts([]);
                        setIsLoadingProduct(false);
                    }
                })
                .catch((err) => {
                    setIsLoadingProduct(false);
                });
        } else {
            if (productList.length === 0) {
                setIsLoadingProduct(true);
                getListProducts()
                    .then((res) => {
                        console.log(res.data);
                        if (res.data !== null && res.data?.length > 0) {
                            setProducts(res.data);
                            setProductList(res.data);
                            setIsLoadingProduct(false);
                        } else {
                            setProducts([]);
                            setIsLoadingProduct(false);
                        }
                    })
                    .catch((err) => {});
            } else {
                setProducts(productList);
                setIsLoadingProduct(false);
            }
        }
    }, [location.state?.isReload, productList]);
    const handleChangePage = (page, id) => {
        if (Pages[2] === page) {
            history("/add-product");
        } else if ("Update" === page) {
            history("/add-product", { replace: true, state: { id: id } });
        }
    };
    return (
        <div className="products__wrapper">
            <div className="products__container">
                <div className="home__order__btn__wrapper">
                    <button className="home__order__btn" onClick={() => handleChangePage(Pages[2])}>
                        <FontAwesomeIcon icon={faAdd} />
                        <span>Thêm sản phẩm mới</span>
                    </button>
                </div>
                <div className="products__item__wrapper">
                    {products.length > 0 &&
                        products?.map((item) => {
                            return (
                                <div className="products__item" key={item._id}>
                                    <div className="products__item__img">
                                        <img src={item.productOrderImage} alt="" />
                                    </div>
                                    <div className="products__item__info">
                                        <div className="products__item__info__name">
                                            <span>{item.productOrderName}</span>
                                        </div>
                                        <div className="products__item__info__price">
                                            <span>Giá gốc: </span>
                                            <span>{caculatorVND(item.originalPrice)}</span>
                                        </div>
                                        <div className="products__item__info__price">
                                            <span>Giá bán: </span>
                                            <span>{caculatorVND(item.price)}</span>
                                        </div>
                                    </div>
                                    <div className="orderItem__icon__edit__wrapper" onClick={() => handleChangePage("Update", item._id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </div>
                                </div>
                            );
                        })}
                    {!isLoadingProduct && products.length === 0 && <div className="flex-center">Không có sản phẩm nào</div>}
                    {isLoadingProduct && (
                        <div className="flex-center skeleton__wrapper" style={{ marginTop: 20 }}>
                            <Skeleton count={4} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
