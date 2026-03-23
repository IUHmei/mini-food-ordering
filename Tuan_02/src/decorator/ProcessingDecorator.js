const PaymenDecorator = require("./PaymentDecorator");

class ProcessingDecorator extends PaymenDecorator{
    pay(amount) {
        const fee = amount * 0.1;
        const total = amount + fee;
        return this.payment.pay(total) + ` | Phí: ${fee}`;
    }
}

module.exports = ProcessingDecorator;