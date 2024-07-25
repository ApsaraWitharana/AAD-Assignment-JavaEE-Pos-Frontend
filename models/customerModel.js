export default class customerModel{
    constructor(id,name,address,salary) {
        this._id = id;
        this._name = name;
        this._address = address;
        this._salary = salary;
    }

    set id(value) {
        this._id = value;
    }

    set name(value) {
        this._name = value;
    }

    set address(value) {
        this._address = value;
    }

    set salary(value) {
        this._salary = value;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get address() {
        return this._address;
    }

    get salary() {
        return this._salary;
    }
}