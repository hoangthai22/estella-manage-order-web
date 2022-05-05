import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import ImageUploading from "react-images-uploading";
import Modal from "react-modal/lib/components/Modal";
import { AppContext } from "../context/AppContext";
import { storage } from "../firebase/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const AddProductPage = () => {
    const { setIsLoading } = useContext(AppContext);
    const [images, setImages] = React.useState([]);
    const [isError, setIsError] = useState(false);
    const [name, setName] = useState("");
    const [priceOrianal, setPriceOrianal] = useState("");
    const [price, setPrice] = useState("");
    // const [isCheckedSize, setIsCheckedSize] = useState("Number");
    // const [sizeFrom, setSizeFrom] = useState(25);
    // const [sizeTo, setSizeTo] = useState(42);
    // const [sizeSMLFrom, setSizeSMLFrom] = useState("S");
    // const [sizeSMLTo, setSizeSMLTo] = useState("4XL");
    // const [isError, setIsError] = useState(false);
    // const [isValid, setisValid] = useState(false);
    // let listSizeSML = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const handleSubmit = () => {
        const metadata = {
            contentType: "image/jpeg",
        };
        const storageRef = ref(storage, "images/" + images[0].file.name);
        const uploadTask = uploadBytesResumable(storageRef, images[0].file, metadata);
        uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
                // eslint-disable-next-line default-case
                switch (error.code) {
                    case "storage/unauthorized":
                        break;
                    case "storage/canceled":
                        break;

                    case "storage/unknown":
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                });
            }
        );
        // const uploadTask = storage.ref
        // setIsLoading(true);
        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 2000);
        // // console.log(images);
        // if (price === "" || priceOrianal === "" || images.length === 0 || name === "") {
        //     setIsError(true);
        // } else {
        //     setIsError(false);
        // }
    };
    // let subtitle;
    // const [modalIsOpen, setIsOpen] = React.useState(false);

    // function openModal() {
    //     setIsOpen(true);
    // }

    // function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     // subtitle.style.color = "#f00";
    // }
    // const getIndex = (list, el) => {
    //     for (let index = 0; index < list.length; index++) {
    //         if (el === list[index]) return index;
    //     }
    // };
    // function closeModal(e) {
    //     e.preventDefault();
    //     if (isCheckedSize === "Number") {
    //         if (parseInt(sizeFrom) >= parseInt(sizeTo)) {
    //             setIsError(true);
    //         } else {
    //             setIsError(false);
    //             setIsOpen(false);
    //         }
    //     } else {
    //         if (getIndex(listSizeSML, sizeSMLFrom) >= getIndex(listSizeSML, sizeSMLTo)) {
    //             setIsError(true);
    //         } else {
    //             setIsError(false);
    //             setIsOpen(false);
    //         }
    //     }
    //     setisValid(true);
    // }
    // const customStyles = {
    //     content: {
    //         top: "50%",
    //         left: "50%",
    //         right: "auto",
    //         bottom: "auto",
    //         marginRight: "-50%",
    //         transform: "translate(-50%, -50%)",
    //         width: "70%",
    //     },
    // };
    // function onCheckedSize(value) {
    //     setIsCheckedSize(value);
    // }
    // function onSelectedSizeFrom(value) {
    //     if (isCheckedSize === "Number") {
    //         setSizeFrom(value);
    //     } else {
    //         setSizeSMLFrom(value);
    //     }
    // }
    // function onSelectedSizeTo(value) {
    //     if (isCheckedSize === "Number") {
    //         setSizeTo(value);
    //     } else {
    //         setSizeSMLTo(value);
    //     }
    // }
    return (
        <div className="add__product__wrapper">
            <div className="add__product__container">
                <div className="add__product__image__wrapper">
                    <div className="add__product__image">
                        <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
                            {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">
                                    {imageList.length === 0 ? (
                                        <div className="add__product__image__review" onClick={onImageUpload} {...dragProps}>
                                            Thêm ảnh
                                        </div>
                                    ) : (
                                        imageList.map((image, index) => (
                                            <div key={index} className="image-item">
                                                <div className="image-item__icon">
                                                    <FontAwesomeIcon className="image-item__icon__item" icon={faCircleXmark} onClick={() => onImageRemove(index)} />
                                                </div>
                                                <img src={image["data_url"]} alt="" width="100" />
                                                <div className="image-item__btn-wrapper"></div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </ImageUploading>
                    </div>
                </div>
                <div className="add__product__info__wrapper">
                    <div className="add__product__info__container">
                        <label className="add__product__info__title">
                            Tên sản phẩm <span>*</span>
                        </label>
                        <input className="add__product__info__input" placeholder="Nhập tên sản phẩm" onChange={(val) => setName(val.target.value)} />
                    </div>
                    <div className="add__product__info__container">
                        <label className="add__product__info__title">
                            Giá gốc <span>*</span> ( giá tệ + phí vận chuyển )
                        </label>
                        <input type="number" className="add__product__info__input" placeholder="Nhập giá gốc sản phẩm" onChange={(val) => setPriceOrianal(val.target.value)} />
                    </div>
                    <div className="add__product__info__container">
                        <label className="add__product__info__title">
                            Giá bán <span>*</span> ( giá mà bán lời á bà )
                        </label>
                        <input type="number" className="add__product__info__input" placeholder="Nhập giá bán sản phẩm" onChange={(val) => setPrice(val.target.value)} />
                    </div>
                    {isError && (
                        <div className="add__product__info__container">
                            <span className="error">Điền đủ thông tin nghe bà</span>
                        </div>
                    )}

                    <div className="add__product__info__container" onClick={() => handleSubmit()}>
                        <button className="add__product__info__btn">Thêm sản phẩm</button>
                    </div>
                    {/* <div className="add__product__info__container">
                        <label className="add__product__info__title">
                            Size <span>*</span>
                        </label>
                        <div className="add__product__info__size__wrapper" onClick={openModal}>
                            <div className="add__product__info__size">+ Thêm</div>
                        </div>
                        <Modal ariaHideApp={false} isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Chọn Size</h2>
                            <form className="add__product__modal__form" onSubmit={(val) => console.log(val)}>
                                <div className="add__product__modal__input__radio" onClick={() => setIsCheckedSize("Number")}>
                                    <input type="radio" className="" name="size" checked={isCheckedSize === "Number" && true} value={"Number"} onChange={(val) => onCheckedSize(val.target.value)} />{" "}
                                    <span>Size theo số (VD: 35, 36, 37,...)</span>
                                </div>
                                <div className="add__product__modal__input__radio__content" style={{ display: isCheckedSize === "Number" ? "flex" : "none" }}>
                                    <select onChange={(val) => onSelectedSizeFrom(val.target.value)}>
                                        {[25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42].map((item) => {
                                            return (
                                                <option value={item} selected={item === parseInt(sizeFrom) ? true : false}>
                                                    {item}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select onChange={(val) => onSelectedSizeTo(val.target.value)}>
                                        {[25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42].map((item) => {
                                            return (
                                                <option value={item} selected={item === parseInt(sizeTo) ? true : false}>
                                                    {item}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="add__product__modal__input__radio" onClick={() => setIsCheckedSize("SML")}>
                                    <input type="radio" className="" name="size" checked={isCheckedSize === "SML" && true} value={"SML"} onChange={(val) => onCheckedSize(val.target.value)} />{" "}
                                    <span>Size theo kích cỡ (VD: S, M, L,...)</span>
                                </div>
                                <div className="add__product__modal__input__radio__content" style={{ display: isCheckedSize === "SML" ? "flex" : "none" }}>
                                    <select onChange={(val) => onSelectedSizeFrom(val.target.value)}>
                                        {listSizeSML?.map((item) => {
                                            return (
                                                <option value={item} selected={item === sizeSMLFrom ? true : false}>
                                                    {item}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select onChange={(val) => onSelectedSizeTo(val.target.value)}>
                                        {listSizeSML?.map((item) => {
                                            return (
                                                <option value={item} selected={item === sizeSMLTo ? true : false}>
                                                    {item}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div style={{ padding: 5 }}></div>
                                {isError && <span className="add__product__modal__error">Sao số sau lại lớn hơn, Bị ngu hả bà</span>}

                                <div className="add__product__modal__btn">
                                    <button onClick={(e) => closeModal(e)}>Xác nhận</button>
                                </div>
                            </form>
                        </Modal>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;
