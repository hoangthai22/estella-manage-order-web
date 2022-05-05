import { faBars, faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Pages } from "../../heplers/constanst";
const Header = (props) => {
    const history = useNavigate();
   
    const handleChangePage = (page) => {
        if (page === Pages[1]) {
            history("/revenue");
        } else if (page === Pages[0]) {
            history("/");
        }
    };
    return (
        <div className="header__wrapper">
            <div className="header__container">
                <div className="header__icon__wrapper">
                    <FontAwesomeIcon icon={faBars} onClick={() => props.callbackFunc(true)} />
                </div>
                <div className="header__logo" onClick={() => handleChangePage(Pages[0])}>
                    <span>Estella</span>
                </div>
                <div className="header__icon__wrapper" style={{ textAlign: "right" }}>
                    <FontAwesomeIcon icon={faPiggyBank} onClick={() => handleChangePage(Pages[1])} />
                </div>
            </div>
        </div>
    );
};

export default Header;
