// class Component {
// 	id: string;
// 	constructor(hookId: string) {
// 		this.id = hookId;
// 		console.log(hookId);
// 	}

// }

interface ProductInterface {
	img: string;
	title: string;
	price: number;
	category: string;
}

class Product implements ProductInterface {
	img;
	title;
	price;
	category;
	constructor(img: string, title: string, price: number, category: string) {
		this.img = img;
		this.title = title;
		this.price = price;
		this.category = category;
	}

	render() {
		const element = document.createElement("div") as HTMLDivElement;
		element.classList.add(
			"group",
			"w-64",
			"md:w-full",
			"bg-gray-300",
			"rounded-md",
			"overflow-hidden",
			"shadow-md"
		);

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
		button?.addEventListener("click", this.addToCart.bind(this));
		return element;
	}
	addToCart() {
		App.addProductCart(this);
	}
}

class ProductList {
	lists = [
		{
			img: "dumbells.jpg",
			title: "laptop repair",
			price: 30,
			category: "equipments",
		},
		{ img: "dumbells.jpg", title: "phone repair", price: 60, category: "kits" },
		{ img: "dumbells.jpg", title: "phone repair", price: 80, category: "food" },
		{ img: "dumbells.jpg", title: "phone repair", price: 90, category: "kits" },
	];
	constructor() {
		this.render(this.lists);
	}
	displayCategory() {
		const categories = document.querySelector<HTMLMenuElement>(".categories");
		categories?.addEventListener("click", (e) => {
			if (e.target && e.target.matches("li")) {
				if (e.target.innerText === "ALL") {
					console.log("show all products");
				}

				if (e.target.innerText === "EQUIPMENTS") {
					const selectedProducts = this.lists.filter(
						(product) => product.category === "equipments"
					);
					this.render(selectedProducts);
					console.log("show only equipments", selectedProducts);
				}

				if (e.target.innerText === "KITS") {
					console.log("show only kits");
				}

				if (e.target.innerText === "FOOD") {
					console.log("show only foods");
				}
			}
		});
	}

	render(products: ProductInterface[]) {
		const productSection = document.getElementById("product-list");
		products.forEach((product) => {
			const singleproduct = new Product(
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

interface CartInterface {
	cart: Product[];
	Qty: number;
	render(): void;
}

class Cart implements CartInterface {
	cart: Product[];

	constructor() {
		this.cart = [];
		this.render();
	}

	get Qty() {
		return this.cart.length || 0;
	}

	showCartTitle() {
		const title = document.querySelector("#cart h2") as HTMLHeadElement;
		if (this.cart.length === 0) {
			title.textContent = "No items in cart";
			return;
		}
		title.textContent = "cart items";
	}

	updateCartQty() {
		const cartButton = document.querySelector(
			"#cart-button"
		) as HTMLButtonElement;
		const quantity = cartButton.querySelector("span") as HTMLSpanElement;
		quantity.textContent = this.Qty.toString();
	}
	updateCartMenu() {
		const cartMenu = document.querySelector("#cart-menu") as HTMLMenuElement;
		const cartItem = document.createElement("li");
		cartItem.classList.add("flex", "bg-gray-300", "p-4");
		this.cart.forEach((product) => {
			cartItem.innerHTML = `
			<!-- cart items -->						
								<!-- image container -->
								<div class="w-40 mr-2">
									<img src=img/${product.img} alt="" />
								</div>
								<!-- end of image container -->
								<!-- product details -->
								<div class="flex-1">
									<h3 class="text-gray-800 capitalize mb-1">
										${product.title}
									</h3>
									<p class="mb-2 capitalize text-sm text-gray-600">
										price:<span>${product.price}</span>
									</p>
									<!-- counter -->
									<span
										class="
											px-2
											py-1
											bg-yellow-500
											cursor-pointer
											transition
											hover:bg-yellow-300
										"
										>+</span
									><span class="px-2 py-1 bg-yellow-100">2</span
									><span
										class="
											px-2
											py-1
											bg-yellow-500
											cursor-pointer
											hover:bg-yellow-300
										"
										>-</span
									>
									<!-- end of counter -->
								</div>
								<!-- end of product details -->
								<!-- delete product -->
								<div class="flex items-center">
									<button
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
		});
		cartMenu.append(cartItem);
		this.showCartTitle();
	}

	render() {
		const cartButton = document.querySelector(
			"#cart-button"
		) as HTMLButtonElement;
		this.updateCartQty();
		this.showCartTitle();
		cartButton.addEventListener("click", () => {
			const cart = document.querySelector("#cart");
			cart?.classList.toggle("trans100vw");
		});
	}

	addToCart(product: Product) {
		this.cart.push(product);
		console.log(this.cart);
		this.updateCartQty();
		this.updateCartMenu();
	}
}

class App {
	static cart: Cart;
	static init() {
		new ProductList();
		this.cart = new Cart();
	}

	static addProductCart(product: Product) {
		this.cart.addToCart(product);
	}
}

window.addEventListener("DOMContentLoaded", () => {
	App.init();
});
