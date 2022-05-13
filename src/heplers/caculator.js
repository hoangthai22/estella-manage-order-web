export const caculatorSale = (salePercent, price) => {
    return price - (salePercent / 100) * price;
};
export const caculatorVND = (price) => {
    if (price !== null && price !== undefined) {
        var x = price.toLocaleString("it-IT", { style: "currency", currency: "VND" });
        return x.split("VND")[0] ? x.split("VND")[0] : x;
    } else {
        return price;
    }
};
