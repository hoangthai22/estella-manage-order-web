// @flow
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
export const DrawerContent = () => {
    // const history = useNavigate();
    const [isOpenCategory, setisOpenCategory] = useState(false);
    const hanldeOpenCategory = () => {
        setisOpenCategory(!isOpenCategory);
    };
    // const handleSubmitCategory = (id, slug, categoryName) => {
    //     history("/" + slug, { state: { id: id, categoryName: categoryName } });
    // };
    return (
        <div className="drawer__wrapper">
            <div className="drawer__wrapper__item">Thêm sản phẩm mới</div>
            <div className="drawer__wrapper__item" onClick={hanldeOpenCategory}>
                <span>Danh mục sản phẩm</span>
                <div>{"❯"}</div>
            </div>
            <div
                className="drawer__category__wrapper"
                style={{
                    display: isOpenCategory ? "block" : "none",
                    // visibility: isOpenCategory ? "visible" : "hidden",
                    // transform: isOpenCategory ? "translateY(0em)" : "translateY(-50em)",
                }}
            >
                <ul className="drawer__category__list"></ul>
            </div>
            <div className={`drawer__wrapper__item ${isOpenCategory && "border__top"}`}>Help me chooses!</div>
            <div className="drawer__wrapper__item">
                <span>Đăng nhập</span>
                <div>
                    <FontAwesomeIcon className="header__Mobile__menu__icon" style={{ fontSize: 14 }} icon={faSignIn} />
                </div>
            </div>
            <div className="drawer__wrapper__item">
                <span>Đăng xuất</span>
                <div>
                    <FontAwesomeIcon className="header__Mobile__menu__icon" style={{ fontSize: 14 }} icon={faSignOut} />
                </div>
            </div>
        </div>
    );
};
