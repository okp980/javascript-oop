// class Component {
// 	id: string;
// 	constructor(hookId: string) {
// 		this.id = hookId;
// 		console.log(hookId);
// 	}

// }

// interface

interface ProductInterface {
	id: number;
	img: string;
	title: string;
	price: number;
	category: string;
}

interface CartItemInterface {
	id: number;
	img: string;
	title: string;
	price: number;
	category: string;
	quantity: number;
}

interface CartInterface {
	cart: CartItemInterface[];
	Qty: number;
	// render(): void;
}

class Component {
	getElem(
		selector: string
	): HTMLButtonElement | HTMLDivElement | HTMLMenuElement {
		const Element = document.querySelector(selector) as
			| HTMLButtonElement
			| HTMLDivElement;
		return Element;
	}

	createNewElem(
		element: string,
		cssClass: string[]
	): HTMLDivElement | HTMLUListElement {
		const elem = document.createElement(element) as HTMLDivElement;
		elem.classList.add(...cssClass);
		return elem;
	}
}

class Product extends Component implements ProductInterface {
	id;
	img;
	title;
	price;
	category;
	constructor(
		id: number,
		img: string,
		title: string,
		price: number,
		category: string
	) {
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
		const element = this.createNewElem("div", cssClasses) as HTMLDivElement;

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
		button?.addEventListener("click", this.addToCart.bind(this, this.id));
		return element;
	}
	addToCart(id: number) {
		App.addProductCart(id);
	}
}

class ProductList extends Component {
	lists = [
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
	constructor() {
		super();
		this.render(this.lists);
	}

	render(products: ProductInterface[]) {
		const productSection = this.getElem("#product-list");
		productSection.innerHTML = "";
		products.forEach((product) => {
			const singleproduct = new Product(
				product.id,
				product.img,
				product.title,
				product.price,
				product.category
			);
			const renderedProduct = singleproduct.render();

			productSection?.append(renderedProduct);
		});
	}
}

class Category extends Component {
	constructor() {
		super();
		this.render();
	}
	render() {
		const categories = this.getElem(".categories") as HTMLMenuElement;
		categories?.addEventListener("click", (e) => {
			const target = e.target as HTMLElement;
			if (target && target.matches("li")) {
				const allCategory = categories.querySelectorAll("li");
				allCategory.forEach((category) => {
					category.classList.remove("bg-yellow-500");
					category.classList.add("hover:bg-gray-700");
				});
				target.classList.add("bg-yellow-500");
				target.classList.remove("hover:bg-gray-700");
				let products: ProductInterface[] = [];
				if (target.innerText === "ALL") {
					products = App.productlist.lists;
				}

				if (target.innerText === "EQUIPMENTS") {
					products = App.productlist.lists.filter(
						(product) => product.category === "equipments"
					);
				}

				if (target.innerText === "KITS") {
					products = App.productlist.lists.filter(
						(product) => product.category === "kits"
					);
				}

				if (target.innerText === "FOOD") {
					products = App.productlist.lists.filter(
						(product) => product.category === "food"
					);
				}
				App.renderProducts(products);
			}
		});
	}
}

class CartItem extends Component {
	handleQuantity(id: number, action: "increase" | "decrease") {
		App.updateCartProductQty(id, action);
	}

	deleteCartItem(id: number) {
		App.removeCartUtil(id);
	}

	render(product: CartItemInterface) {
		const cartItem = this.createNewElem("li", [
			"flex",
			"bg-gray-300",
			"p-4",
		]) as HTMLUListElement;
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
		deleteBtn?.addEventListener(
			"click",
			this.deleteCartItem.bind(this, product.id)
		);
		decreaseBtn?.addEventListener(
			"click",
			this.handleQuantity.bind(this, product.id, "decrease")
		);
		increaseBtn?.addEventListener(
			"click",
			this.handleQuantity.bind(this, product.id, "increase")
		);
		return cartItem;
	}
}

class Cart extends Component implements CartInterface {
	cart: CartItemInterface[];

	constructor() {
		super();
		this.cart = [];
	}

	get Qty() {
		return this.cart.reduce(
			(prevItem, currItem) => prevItem + currItem.quantity,
			0
		);
	}

	get totalAmount() {
		return this.cart.reduce(
			(prevValue, currItem) => prevValue + currItem.price * currItem.quantity,
			0
		);
	}

	showCartTitle() {
		const title = this.getElem("#cart h2") as HTMLHeadElement;
		if (this.cart.length === 0) {
			title.textContent = "No items in cart";
			return;
		}
		title.textContent = "cart items";
	}

	// remove item from cart
	removeItemFromCart(id: number) {
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
		const cartButton = this.getElem("#cart-button") as HTMLButtonElement;
		const quantity = cartButton.querySelector("span") as HTMLSpanElement;
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
	updateSingleItemQty(id: number, action: "increase" | "decrease") {
		const product = this.cart.find((item) => item.id === id);
		if (product) {
			if (action === "increase" && product.quantity === 10) return;
			if (action === "decrease" && product.quantity === 1) return;
			this.cart = this.cart.map((item) =>
				item.id === product.id
					? {
							...item,
							quantity:
								action === "increase" ? item.quantity + 1 : item.quantity - 1,
					  }
					: item
			);
		} else {
			const productList = new ProductList();
			const product = productList.lists.find((item) => item.id === id);
			if (product) {
				this.cart.push({ ...product, quantity: 1 });
			}
		}
		this.updateCart();
	}

	renderItems() {
		const cartMenu = this.getElem("#cart-menu") as HTMLMenuElement;
		cartMenu.innerHTML = " ";

		const cartItem = new CartItem();
		for (const item of this.cart) {
			const cartItemElement = cartItem.render(item);
			cartMenu.append(cartItemElement);
		}
	}

	addToCart(id: number) {
		App.updateCartProductQty(id, "increase");
		this.updateCart();
	}
}

class App {
	static cart: Cart;
	static productlist: ProductList;
	static init() {
		new Category();
		this.productlist = new ProductList();
		this.cart = new Cart();
		App.showCart();
	}

	static addProductCart(id: number) {
		this.cart.addToCart(id);
	}

	static renderProducts(products: ProductInterface[]) {
		this.productlist.render(products);
	}

	static updateCartProductQty(id: number, action: "increase" | "decrease") {
		this.cart.updateSingleItemQty(id, action);
	}

	static removeCartUtil(id: number) {
		this.cart.removeItemFromCart(id);
	}

	static showCart() {
		const cartButton = document.querySelector(
			"#cart-button"
		) as HTMLButtonElement;
		cartButton.addEventListener("click", () => {
			const cart = document.querySelector("#cart");
			cart?.classList.toggle("trans100vw");
			document.body.classList.toggle("overflow-hidden");
		});
	}
}

window.addEventListener("load", () => {
	const loadScreen = document.querySelector(".loading-screen");
	loadScreen?.classList.add("hide-loader");
	App.init();
});
