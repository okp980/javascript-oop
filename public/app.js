"use strict";
// class Component {
// 	id: string;
// 	constructor(hookId: string) {
// 		this.id = hookId;
// 		console.log(hookId);
// 	}
class Component {
    getElem(selector) {
        const Element = document.querySelector(selector);
        return Element;
    }
    createNewElem(element, cssClass) {
        const elem = document.createElement(element);
        elem.classList.add(...cssClass);
        return elem;
    }
}
class Product extends Component {
    constructor(id, img, title, price, category) {
        super();
        this.id = id;
        this.img = img;
        this.title = title;
        this.price = price;
        this.category = category;
    }
    render() {
        const cssClasses = [
            "group",
            "w-64",
            "md:w-full",
            "bg-gray-300",
            "rounded-md",
            "overflow-hidden",
            "shadow-md",
        ];
        const element = this.createNewElem("div", cssClasses);
        element.innerHTML = `
					<!-- image container -->
					<div class="w-full overflow-hidden">
						<img
							src=img/${this.img}
							alt="dumbells"
							class="w-full transform transition group-hover:scale-125"
						/>
					</div>
					<!-- end of image container -->
					<!-- product content -->
					<div class="p-4">
						<h3 class="capitalize text-gray-800 mb-2">${this.title}</h3>
						<p class="text-gray-500 font-semibold mb-2">\$${this.price}</p>
						<button class="btn">add to cart</button>
					</div>
					<!-- end of product content -->
		`;
        const button = element.querySelector(".btn");
        button === null || button === void 0 ? void 0 : button.addEventListener("click", this.addToCart.bind(this, this.id));
        return element;
    }
    addToCart(id) {
        App.addProductCart(id);
    }
}
class ProductList extends Component {
    constructor() {
        super();
        this.lists = [
            {
                id: 1,
                img: "dumbells.jpg",
                title: "laptop repair",
                price: 30,
                category: "equipments",
            },
            {
                id: 2,
                img: "dumbells.jpg",
                title: "phone repair",
                price: 60,
                category: "kits",
            },
            {
                id: 3,
                img: "dumbells.jpg",
                title: "phone repair",
                price: 80,
                category: "food",
            },
            {
                id: 4,
                img: "dumbells.jpg",
                title: "phone repair",
                price: 90,
                category: "kits",
            },
            {
                id: 5,
                img: "dumbells.jpg",
                title: "phone repair",
                price: 90,
                category: "kits",
            },
            {
                id: 6,
                img: "dumbells.jpg",
                title: "phone repair",
                price: 90,
                category: "kits",
            },
            {
                id: 7,
                img: "dumbells.jpg",
                title: "phone repair",
                price: 90,
                category: "kits",
            },
            {
                id: 8,
                img: "dumbells.jpg",
                title: "phone repair",
                price: 90,
                category: "kits",
            },
            {
                id: 9,
                img: "dumbells.jpg",
                title: "phone repair",
                price: 90,
                category: "kits",
            },
            {
                id: 10,
                img: "dumbells.jpg",
                title: "phone repair",
                price: 90,
                category: "kits",
            },
        ];
        this.render(this.lists);
    }
    render(products) {
        const productSection = this.getElem("#product-list");
        productSection.innerHTML = "";
        products.forEach((product) => {
            const singleproduct = new Product(product.id, product.img, product.title, product.price, product.category);
            const renderedProduct = singleproduct.render();
            productSection === null || productSection === void 0 ? void 0 : productSection.append(renderedProduct);
        });
    }
}
class Category extends Component {
    constructor() {
        super();
        this.render();
    }
    render() {
        const categories = this.getElem(".categories");
        categories === null || categories === void 0 ? void 0 : categories.addEventListener("click", (e) => {
            const target = e.target;
            if (target && target.matches("li")) {
                const allCategory = categories.querySelectorAll("li");
                allCategory.forEach((category) => {
                    category.classList.remove("bg-yellow-500");
                    category.classList.add("hover:bg-gray-700");
                });
                target.classList.add("bg-yellow-500");
                target.classList.remove("hover:bg-gray-700");
                let products = [];
                if (target.innerText === "ALL") {
                    products = App.productlist.lists;
                }
                if (target.innerText === "EQUIPMENTS") {
                    products = App.productlist.lists.filter((product) => product.category === "equipments");
                }
                if (target.innerText === "KITS") {
                    products = App.productlist.lists.filter((product) => product.category === "kits");
                }
                if (target.innerText === "FOOD") {
                    products = App.productlist.lists.filter((product) => product.category === "food");
                }
                App.renderProducts(products);
            }
        });
    }
}
class CartItem extends Component {
    handleQuantity(id, action) {
        App.updateCartProductQty(id, action);
    }
    deleteCartItem(id) {
        App.removeCartUtil(id);
    }
    render(product) {
        const cartItem = this.createNewElem("li", [
            "flex",
            "bg-gray-300",
            "p-4",
        ]);
        cartItem.innerHTML = `
			<!-- cart items -->						
								<!-- image container -->
								<div class="w-40 mr-2">
									<img src=img/${product.img} alt=${product.title} />
								</div>
								<!-- end of image container -->
								<!-- product details -->
								<div class="flex-1">
									<h3 class="text-gray-800 capitalize mb-1">
										${product.title}
									</h3>
									<p class="mb-2 capitalize text-sm text-gray-600">
										unit price: $<span>${product.price}</span>
									</p>
									<!-- counter -->
									<div>
									<button
										id='decreaseBtn'
										data-action='decrease'
										class="
											px-2
											py-1
											bg-yellow-500
											cursor-pointer
											transition
											hover:bg-yellow-300
										"
										>-</button
									><span id='quantity' class="px-2 py-1 bg-yellow-100">${product.quantity}</span
									><button
									id='increaseBtn'
									data-action='increase'
										class="
											px-2
											py-1
											bg-yellow-500
											cursor-pointer
											hover:bg-yellow-300
										"
										>+</button
									>
									</div>
									<!-- end of counter -->
								</div>
								<!-- end of product details -->
								<!-- delete product -->
								<div class="flex items-center">
									<button
										id="delete-cart-item"
										class="
											btn
											text-xs
											rounded-full
											bg-red-600
											px-2
											py-1
											hover:bg-red-400
										"
									>
										remove
									</button>
								</div>
								<!-- end of delete product -->
							
							<!-- end of cart items -->
			`;
        const decreaseBtn = cartItem.querySelector("#decreaseBtn");
        const increaseBtn = cartItem.querySelector("#increaseBtn");
        const deleteBtn = cartItem.querySelector("#delete-cart-item");
        deleteBtn === null || deleteBtn === void 0 ? void 0 : deleteBtn.addEventListener("click", this.deleteCartItem.bind(this, product.id));
        decreaseBtn === null || decreaseBtn === void 0 ? void 0 : decreaseBtn.addEventListener("click", this.handleQuantity.bind(this, product.id, "decrease"));
        increaseBtn === null || increaseBtn === void 0 ? void 0 : increaseBtn.addEventListener("click", this.handleQuantity.bind(this, product.id, "increase"));
        return cartItem;
    }
}
class Cart extends Component {
    constructor() {
        super();
        this.cart = [];
    }
    get Qty() {
        return this.cart.reduce((prevItem, currItem) => prevItem + currItem.quantity, 0);
    }
    get totalAmount() {
        return this.cart.reduce((prevValue, currItem) => prevValue + currItem.price * currItem.quantity, 0);
    }
    showCartTitle() {
        const title = this.getElem("#cart h2");
        if (this.cart.length === 0) {
            title.textContent = "No items in cart";
            return;
        }
        title.textContent = "cart items";
    }
    // remove item from cart
    removeItemFromCart(id) {
        this.cart = this.cart.filter((item) => item.id !== id);
        this.updateCart();
    }
    // update total Amount
    updateTotalAmount() {
        const totalAmt = this.getElem("#total-amt");
        totalAmt.textContent = "TOTAL: $" + this.totalAmount;
    }
    // updates the total quantity in the cart
    updateCartQty() {
        const cartButton = this.getElem("#cart-button");
        const quantity = cartButton.querySelector("span");
        quantity.textContent = this.Qty.toString();
    }
    // updates the dom to current cart
    updateCart() {
        this.updateCartQty();
        this.updateTotalAmount();
        this.showCartTitle();
        this.renderItems();
    }
    // updates the quantity of a single item
    updateSingleItemQty(id, action) {
        const product = this.cart.find((item) => item.id === id);
        if (product) {
            if (action === "increase" && product.quantity === 10)
                return;
            if (action === "decrease" && product.quantity === 1)
                return;
            this.cart = this.cart.map((item) => item.id === product.id
                ? Object.assign(Object.assign({}, item), { quantity: action === "increase" ? item.quantity + 1 : item.quantity - 1 }) : item);
        }
        else {
            const productList = new ProductList();
            const product = productList.lists.find((item) => item.id === id);
            if (product) {
                this.cart.push(Object.assign(Object.assign({}, product), { quantity: 1 }));
            }
        }
        this.updateCart();
    }
    renderItems() {
        const cartMenu = this.getElem("#cart-menu");
        cartMenu.innerHTML = " ";
        const cartItem = new CartItem();
        for (const item of this.cart) {
            const cartItemElement = cartItem.render(item);
            cartMenu.append(cartItemElement);
        }
    }
    addToCart(id) {
        App.updateCartProductQty(id, "increase");
        this.updateCart();
    }
}
class App {
    static init() {
        new Category();
        this.productlist = new ProductList();
        this.cart = new Cart();
        App.showCart();
    }
    static addProductCart(id) {
        this.cart.addToCart(id);
    }
    static renderProducts(products) {
        this.productlist.render(products);
    }
    static updateCartProductQty(id, action) {
        this.cart.updateSingleItemQty(id, action);
    }
    static removeCartUtil(id) {
        this.cart.removeItemFromCart(id);
    }
    static showCart() {
        const cartButton = document.querySelector("#cart-button");
        cartButton.addEventListener("click", () => {
            const cart = document.querySelector("#cart");
            cart === null || cart === void 0 ? void 0 : cart.classList.toggle("trans100vw");
            document.body.classList.toggle("overflow-hidden");
        });
    }
}
window.addEventListener("load", () => {
    const loadScreen = document.querySelector(".loading-screen");
    loadScreen === null || loadScreen === void 0 ? void 0 : loadScreen.classList.add("hide-loader");
    App.init();
});
