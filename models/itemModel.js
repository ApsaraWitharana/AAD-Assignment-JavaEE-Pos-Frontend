export default class itemModel{
    constructor(id,name,price,qty) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._qty = qty;
    }

    set id(value) {
        this._id = value;
    }

    set name(value) {
        this._name = value;
    }

    set price(value) {
        this._price = value;
    }

    set qty(value) {
        this._qty = value;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }

    get qty() {
        return this._qty;
    }
}