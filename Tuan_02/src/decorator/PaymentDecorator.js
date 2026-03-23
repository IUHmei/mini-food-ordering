const Payment = require("../context/payment");

class PaymentDecorator extends Payment{
    constructor(payment) {
        super();
        this.payment = payment;
    }
    pay(amount) {
        return this.payment.pay(amount);
    }
}

module.exports = PaymentDecorator;