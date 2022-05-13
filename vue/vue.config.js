module.exports = {
	devServer: {
		proxy: {
			"/api": {
				target: "http://localhost:3000/",
				ChangeOrigin: true,
				pathRewrite: {
					"^/api": "/api",
				},
			},
		},
	},
	chainWebpack: (config) => {
		config.resolve.alias.set("vue$", "vue/dist/vue.esm.js");
	},
};
