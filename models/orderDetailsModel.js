export default class orderDetailsModel {
    constructor(orderId,orderDate,cusId,ItemId,qty,total,cash,discount) {
        this.itemId = ItemId;
        this._orderId = orderId;
        this._orderDate = orderDate;
        this._cusId = cusId;
        this._ItemId = ItemId;
        this._qty = qty;
        this._total = total;
        this._cash = cash;
        this._discount = discount;
    }

    set orderId(value) {
        this._orderId = value;
    }

    set orderDate(value) {
        this._orderDate = value;
    }

    set cusId(value) {
        this._cusId = value;
    }

    set ItemId(value) {
        this._ItemId = value;
    }

    set qty(value) {
        this._qty = value;
    }

    set total(value) {
        this._total = value;
    }

    set cash(value) {
        this._cash = value;
    }

    set discount(value) {
        this._discount = value;
    }

    get orderId() {
        return this._orderId;
    }

    get orderDate() {
        return this._orderDate;
    }

    get cusId() {
        return this._cusId;
    }

    get ItemId() {
        return this._ItemId;
    }

    get qty() {
        return this._qty;
    }

    get total() {
        return this._total;
    }

    get cash() {
        return this._cash;
    }

    get discount() {
        return this._discount;
    }
}