const User = require("./src/context/user");
const Product = require("./src/context/product");
const { AnimalFactory } = require("./src/factory");
const singleton = require("./src/singleton");
const Delivered = require("./src/states/Delivered");
const NewOrder = require("./src/states/NewOrder");
const Canceled = require("./src/states/Canceled");
const Processing = require("./src/states/Processing");
const VATTax = require("./src/Strategies/VATTax ");
const LuxuryTax = require("./src/Strategies/LuxuryTax ");
const ConsumptionTax = require("./src/Strategies/ConsumptionTax ");
const CreditCardPayment = require("./src/decorator/payment/CreditCardPayment");
const PayPalPayment = require("./src/decorator/payment/PayPalPayment");
const ProcessingDecorator = require("./src/decorator/ProcessingDecorator");
const Discountdecorator = require("./src/decorator/DiscountDecorator");

// Singleton
// const a = new singleton();
// const b = new singleton();
// console.log("Same instance:", a === b);

// Factory 
// const animal1 = AnimalFactory.createAnimal("dog");
// const animal2 = AnimalFactory.createAnimal("cat");
// animal1.speak();
// animal2.speak();

// State 
// const user = new User();
// user.setState(new NewOrder());
// user.showStatus();
// user.setState(new Canceled());
// user.showStatus();
// user.setState(new Processing());
// user.showStatus();
// user.setState(new Delivered());
// user.showStatus();


// Strategy
const product = new Product();
product.setStrategy(new VATTax());
console.log("VAT:", product.calculateTax(100));
product.setStrategy(new LuxuryTax());
console.log("Luxury Tax:", product.calculateTax(100));
product.setStrategy(new ConsumptionTax());
console.log("Consumption Tax:", product.calculateTax(100));

//Decorator
// let payment = new CreditCardPayment();

// payment = new ProcessingDecorator(payment);
// payment = new Discountdecorator(payment);

// console.log(payment.pay(100));

// let payment1 = new PayPalPayment();
// payment1 = new ProcessingDecorator(payment1);
// payment1 = new Discountdecorator(payment1);

// console.log(payment1.pay(200));
