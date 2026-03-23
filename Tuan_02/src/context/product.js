class Product {
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculateTax(price) {
    return this.strategy.calculate(price);
  }
}

module.exports = Product;