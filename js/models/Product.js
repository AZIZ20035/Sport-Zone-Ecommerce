export class Product {
  constructor({ id, name, price, category, image, quantity, size }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.image = image;
    this.quantity = quantity;
    this.size = size;
  }

  getFormattedPrice() {
    return `$${this.price.toFixed(2)}`;
  }

  getDescription() {
    return `${this.name} — ${this.category} — ${this.getFormattedPrice()}`;
  }

  toEntries() {
    return Object.entries(this);
  }
}

export const createProductList = (rawProducts = [], ...extraProducts) => {
  const all = [...rawProducts, ...extraProducts];
  return all.map((p) => new Product(p));
};
