module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
				volkhoz: ["Volkhov", "serif"],
			},
			backgroundImage: {
				hero: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url('/public/img/hero.jpg')",
			},
			keyframes: {
				enter: {
					"0%": { transform: "translateX(100vw)" },
					"50%": { transform: "translateX(50vw)" },
					"100%": { transform: "translateX(0)" },
				},
				exit: {
					"0%": { transform: "translateX(0)" },
					"50%": { transform: "translateX(50vw)" },
					"100%": { transform: "translateX(100vw)" },
				},
			},
			animation: {
				"enter-animation": "enter 300ms ease-in-out forwards",
				"exit-animation": "exit 300ms ease-in-out forwards",
			},
		},
	},
	variants: {
		extend: {
			scale: ["group-hover"],
		},
	},
	plugins: [],
};
