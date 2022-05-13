// @flow
import { faCloudShowersWater, faListCheck, faMoneyBillWave, faPiggyBank, faPlusCircle, faProcedures, faReorder, faShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pages } from "../../heplers/constanst";
// import { useNavigate } from "react-router-dom";
export const DrawerContent = (props) => {
    const history = useNavigate();
    // const [isOpenCategory, setisOpenCategory] = useState(false);
    // const hanldeOpenCategory = () => {
    //     setisOpenCategory(!isOpenCategory);
    // };
    // const categoryList = [1, 2];
    // const handleSubmitCategory = (id, slug, categoryName) => {
    //     // history("/" + slug, { state: { id: id, categoryName: categoryName } });
    // };
    const handleChangePage = (page) => {
        props.callbackFunc(true);
        if (page === Pages[0]) {
            history("/");
        } else if (page === Pages[1]) {
            history("/revenue");
        } else if (page === Pages[2]) {
            history("/add-product");
        } else if (page === Pages[3]) {
            history("/products");
        } else if (page === Pages[4]) {
            history("/add-order");
        }
    };
    return (
        <div className="drawer__wrapper">
            <div className="drawer__wrapper__item" onClick={() => handleChangePage(Pages[4])}>
                <span>Thêm đơn hàng mới</span>
                <div>
                    <FontAwesomeIcon className="header__Mobile__menu__icon" style={{ fontSize: 18 }} icon={faMoneyBillWave} />
                </div>
            </div>
            <div className="drawer__wrapper__item" onClick={() => handleChangePage(Pages[0])}>
                <span>Danh sách Đơn hàng</span>
                <div>
                    <FontAwesomeIcon className="header__Mobile__menu__icon" style={{ fontSize: 18 }} icon={faListCheck} />
                </div>
            </div>
            <div className="drawer__wrapper__item" onClick={() => handleChangePage(Pages[2])}>
                <span>Thêm sản phẩm mới</span>
                <div>
                    <FontAwesomeIcon className="header__Mobile__menu__icon" style={{ fontSize: 18 }} icon={faPlusCircle} />
                </div>
            </div>
            <div className="drawer__wrapper__item" onClick={() => handleChangePage(Pages[3])}>
                <span>Danh sách sản phẩm</span>
                <div>
                    <FontAwesomeIcon className="header__Mobile__menu__icon" style={{ fontSize: 18 }} icon={faShirt} />
                </div>
            </div>
            {/* <div
                className="drawer__category__wrapper"
                style={{
                    display: isOpenCategory ? "block" : "none",
                    // visibility: isOpenCategory ? "visible" : "hidden",
                    // transform: isOpenCategory ? "translateY(0em)" : "translateY(-50em)",
                }}
            > */}
            {/* <ul className="drawer__category__list">
                    {categoryList.map((item) => {
                        return (
                            <li key={item._id} onClick={() => handleSubmitCategory(item._id, item.slug, item.categoryName)}>
                                {item.categoryName}12312
                            </li>
                        );
                    })}
                </ul> */}
            {/* </div> */}
            <div className={`drawer__wrapper__item`} onClick={() => handleChangePage(Pages[1])}>
                <span>Doanh thu</span>
                <div>
                    <FontAwesomeIcon className="header__Mobile__menu__icon" style={{ fontSize: 18 }} icon={faPiggyBank} />
                </div>
            </div>
        </div>
    );
};
