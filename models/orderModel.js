export default class orderModel{
    constructor(total) {
        this._total = total;
    }

    set total(value) {
        this._total = value;
    }

    get total() {
        return this._total;
    }
}