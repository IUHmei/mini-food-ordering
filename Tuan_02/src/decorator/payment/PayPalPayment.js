const Payment = require("../../context/payment");

class PayPalPayment extends Payment{
    pay(amount) {
        return `Thanh toán ${amount} bằng PayPal`;
    }
}

module.exports = PayPalPayment;