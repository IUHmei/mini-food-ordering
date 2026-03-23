const PaymentDecorator = require("./PaymentDecorator");

class Discountdecorator extends PaymentDecorator{
    pay(amount) {
        const disount = amount * 0.2;
        const total = amount - disount;
        return this.payment.pay(total)  + ` | Giảm giá: ${disount}`;
    };
}

module.exports = Discountdecorator;