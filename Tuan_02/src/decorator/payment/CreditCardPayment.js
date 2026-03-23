const Payment = require("../../context/payment");

class CreditcardPayment extends Payment{
    pay(amount) {
        return `Thanh toán ${amount} bằng Credit Card`;
    }
}

module.exports = CreditcardPayment;