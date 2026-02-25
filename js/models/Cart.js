export class Cart {
    constructor() {
        this.items = Cart.#loadFromStorage();
    }

    static #loadFromStorage() {
        const data = localStorage.getItem('sportzone_cart');
        return data ? JSON.parse(data) : [];
    }

    #save() {
        localStorage.setItem('sportzone_cart', JSON.stringify(this.items));
    }

    addItem(product, qty = 1) {
        const { id, name, price, image, category } = product;
        const index = this.items.findIndex((item) => item.id === id);

        if (index !== -1) {
            this.items[index] = { ...this.items[index], qty: this.items[index].qty + qty };
        } else {
            this.items = [...this.items, { id, name, price, image, category, qty }];
        }
        this.#save();
    }

    removeItem(productId) {
        this.items = this.items.filter((item) => item.id !== productId);
        this.#save();
    }

    updateQuantity(productId, newQty) {
        if (newQty <= 0) {
            this.removeItem(productId);
            return;
        }
        const index = this.items.findIndex((item) => item.id === productId);
        if (index !== -1) {
            this.items[index] = Object.assign({}, this.items[index], { qty: newQty });
            this.#save();
        }
    }

    getTotal() {
        return this.items.reduce((sum, { price, qty }) => sum + price * qty, 0);
    }

    getCount() {
        return this.items.reduce((count, { qty }) => count + qty, 0);
    }

    hasItems() {
        return this.items.some((item) => item.qty > 0);
    }

    allItemsValid() {
        return this.items.every((item) => item.price > 0 && item.qty > 0);
    }

    getItemsSummary() {
        const summaries = [];
        for (const item of this.items) {
            summaries.push(`${item.name} x${item.qty} = $${(item.price * item.qty).toFixed(2)}`);
        }
        return summaries;
    }

    clear() {
        this.items = [];
        this.#save();
    }

    getItemValues() {
        return this.items.map((item) => Object.values(item));
    }

    static getItemKeys() {
        return Object.keys({ id: 0, name: '', price: 0, image: '', category: '', qty: 0 });
    }
}
