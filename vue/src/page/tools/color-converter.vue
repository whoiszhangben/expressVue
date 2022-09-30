<template>
  <main :class="darkMode == 'dark' ? 'dark' : ''">
	<div id="app1" :style="{ boxShadow, borderColor }">

		<div id="swatch-container">
			<div id="swatch" :style="{ backgroundColor, borderColor }"></div>
			<form id="dark-mode-toggle">
				<input type="radio" v-model="darkMode" id="light" name="dark-mode" value="light">
				<label for="light"><span class="sr">Light mode</span></label>
				<input type="radio" v-model="darkMode" id="dark" name="dark-mode" value="dark">
				<label for="dark"><span class="sr">Dark mode</span></label>
			</form>
		</div>

		<form id="app-form" action="" :style="{ borderColor }">
			<h1>Automatic RGB/Hex color converter</h1>

			<div id="value-wrap" class="group">
				<label for="value">Enter a color:</label>
				<div>
					<input v-model="value" @input="validate" id="value" type="text" placeholder="Any RGB or hex value" />
				</div>
			</div>

			<div class="group">
				<ul>
					<li><strong>Format detected:</strong> {{ fromFormat }}</li>
					<li><strong>Converting to:</strong> {{ toFormat }}</li>
				</ul>
			</div>

			<div class="flex group">
				<label for="result">Converted value:</label>
			</div>

			<div class="flex">
				<input ref="output" id="result" tabindex="-1" type="text" :value="convertedValue" />
				<button @click.prevent="copy" :disabled="!convertedValue" type="button" ref="copyButton">{{ copyButtonText }}</button>
			</div>
		</form>
	</div>
</main>
</template>

<script>
  const noMethod = { from: null, to: null };
export default {
  data: () => ({
		base16: "0123456789abcdef",
		hexRange: [],
		value: "",
		method: noMethod,
		copied: false,
		darkMode: "light"
	}),

	created() {
		const digits = this.base16.split("");
		digits.forEach((outer) => {
			digits.forEach((inner) => {
				this.hexRange.push(outer + inner);
			});
		});
	},

	watch: {
		value(next) {
			if (
				next.match(/^rgba/) ||
				(next.match(/,/g) && next.match(/,/g).length == 3)
			) {
				this.method = { from: "RGBA", to: "Hex + alpha" };
			} else if (["r", "R"].includes(next.substr(0, 1)) || next.includes(",")) {
				this.method = { from: "RGB", to: "Hex" };
			} else if (next.match(/^#?([a-f0-9]{4}$|[a-f0-9]{8})/i)) {
				this.method = { from: "Hex + alpha", to: "RGBA" };
			} else if (next.match(/[a-f0-9]+/i)) {
				this.method = { from: "Hex", to: "RGB" };
			} else {
				this.method = noMethod;
			}
		}
	},

	methods: {
		convert(val) {
			if (val.match(/^rgb.*/) || val.match(/.*,.*/)) {
				return this.rgbToHex(val);
			} else {
				return this.hexToRGB(val);
			}
		},

		hexToRGB(val) {
			//Remove '#' from string if present
			if (val.substr(0, 1) === "#") {
				val = val.substr(1);
			}
			//Make sure we have the right number of characters
			if ([3, 4, 6, 8].includes(val.length)) {
				//Allow for hex shorthand (3 or 4 characters)
				const division = val.length >= 6 ? 2 : 1;
				const color = {
					r: { from: val.substr(0, division) },
					g: { from: val.substr(division, division) },
					b: { from: val.substr(division * 2, division) },
					a: { from: val.substr(division * 3, division) }
				};

				//Set single-character shorthands to double-character hexes
				if (division === 1) {
					["r", "g", "b", "a"].forEach((col) => {
						color[col].from += color[col].from;
					});
				}

				//Matches the hex values to their 0-255 counterparts
				this.hexRange.forEach((hex, index) => {
					Object.keys(color).forEach((key) => {
						if (color[key].from.toLowerCase() == hex) {
							color[key].to = index;
						}
					});
				});

				//See if an alpha value was provided (return RGBA or RGB)
				if (color.a.to) {
					return `rgba(${color.r.to}, ${color.g.to}, ${color.b.to}, ${(
						color.a.to / 255
					).toFixed(2)})`;
				} else {
					return `rgb(${color.r.to}, ${color.g.to}, ${color.b.to})`;
				}
			} else {
				return null;
			}
		},

		rgbToHex(val) {
			//Don't try to do stuff if we don't have two commas and a number
			if (!val.match(/.*,.*,[0-9\s]+/)) return;

			//Split up the RGB(A) string on commas and match numbers
			const rgba = val.split(",");
			const vals = rgba.map((color) => color && color.match(/[0-9.]+/));
			let invalid = false;

			//Make sure none of the numbers are larger than 255
			vals.forEach((val) => {
				if (val > 255) invalid = true;
			});

			//Make sure we have 3 or 4 numbers (RGB or RGBA)
			if ([3, 4].includes(vals.length)) {
				let finalHex = "";
				vals.forEach((color, colorIndex) => {
					//If we're dealing with the alpha value…
					if (colorIndex == 3)
						color = Math.ceil(color * 255 > 255 ? 255 : color * 255);
					this.hexRange.forEach((hex, hexIndex) => {
						if (color == hexIndex) finalHex += hex;
					});
				});
				return invalid ? null : `#${finalHex}`;
			}
		},

		validate() {
			//Only allow the characters that go into RGBA and/or hex volors
      // eslint-disable-next-line
			this.value = this.value.replace(/[^#a-f0-9rg\(\),\s\.]/, "");
		},

		copy() {
			this.$refs.output.select();
			document.execCommand("copy");
			this.copied = true;
			this.$refs.copyButton.focus();
			setTimeout(() => {
				this.copied = false;
			}, 1200);
		}
	},

	computed: {
		convertedValue() {
			return this.convert(this.value);
		},

		fromFormat() {
			return this.method && this.method.from ? this.method.from : "…";
		},

		toFormat() {
			return this.method && this.method.to ? this.method.to : "…";
		},

		copyButtonText() {
			return this.copied ? "Copied!" : "Copy";
		},

		boxShadow() {
			return `.5rem .5rem 0 ${this.convert(this.value) || "rgba(0,0,0,.25)"}`;
		},

		borderColor() {
			return this.convert(this.value) || "inherit";
		},

		backgroundColor() {
			return this.convert(this.value) || "";
		}
	}
}
</script>

<style scoped>
  *,
*:before,
*:after {
  box-sizing: inherit;
  color: #333;
  font-size: inherit;
  background: transparent;
  transition: color 0.3s, background 0.3s;
  font-family: inherit;
}

*:focus,
input[type=radio]:focus + label {
  outline: 2px dashed #dd8800;
  outline-offset: 2px;
}

.sr, #app1 #swatch-container #dark-mode-toggle input[type=radio] {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  width: 1px;
  height: 1px;
  left: -100vh;
  opacity: 0;
}

body {
  margin: 0;
}

main {
  display: grid;
  place-items: center;
  min-height: 100vh;
  font-family: "Spartan";
  font-size: 18px;
  box-sizing: border-box;
  color: #333;
  background: #ddd;
  text-align: left;
}

#app1 {
  width: 100%;
  max-width: 26rem;
  padding: 4rem 1rem;
  border: 2px solid;
  box-shadow: 0.5rem 0.5rem 0 rgba(0, 0, 0, 0.25);
  position: relative;
  background: #f8f8e8;
  margin: 3rem auto 0;
}
#app1 h1 {
  font-size: 1.8rem;
}
#app1 #swatch-container #dark-mode-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  position: relative;
  z-index: 2;
  background: transparent;
}
#app1 #swatch-container #dark-mode-toggle input[type=radio] + label {
  width: 1.25rem;
  height: 1.25rem;
  display: block;
  border-radius: 1.25rem;
  border: 2px solid;
  background: #f8f8e8;
  position: relative;
}
#app1 #swatch-container #dark-mode-toggle input[type=radio] + label[for=dark] {
  background: #333;
}
#app1 #swatch-container #dark-mode-toggle input[type=radio] + label:not(:last-child) {
  margin-right: 0.5rem;
}
#app1 #swatch-container #dark-mode-toggle input[type=radio]:checked + label:after {
  content: "";
  border-radius: 2rem;
  width: calc(1.5rem + 4px);
  height: calc(1.5rem + 4px);
  border: 2px solid;
  display: block;
  background: transparent;
  left: -6px;
  top: -6px;
  position: absolute;
}
#app1 #swatch {
  width: 8rem;
  height: 8rem;
  border-radius: 8rem;
  border: 2px solid;
  position: absolute;
  top: -4rem;
  left: calc(50% - 4rem);
  background-color: #f8f8e8;
}
#app1 ul {
  padding: 0;
  list-style-type: none;
}
#app1 ul li + li {
  margin-top: 0.5rem;
}
#app1 #app-form {
  margin: auto;
}
#app1 #app-form input,
#app1 #app-form button {
  padding: 0.5em;
  border-radius: 0.25em;
  border: 2px solid;
  font-size: 1rem;
}
#app1 #app-form input,
#app1 #app-form button {
  font-family: "Fira Code", monospace;
}
#app1 #app-form button {
  padding: 0.5em 1em;
  font-weight: bold;
}
#app1 #app-form button:disabled {
  opacity: 0.4;
}
#app1 #app-form label,
#app1 #app-form input,
#app1 #app-form .label {
  display: block;
  width: 100%;
}
#app1 #app-form input {
  padding: 0.75em;
}
#app1 #app-form label,
#app1 #app-form .label {
  margin: 0.25em 0;
  font-weight: bold;
}
#app1 #app-form #result {
  border: none;
  border-radius: 0;
  padding-left: 0;
  border-bottom: 2px solid;
}
#app1 #app-form .flex {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
}
@media (min-width: 440px) {
  #app1 #app-form .flex {
    flex-wrap: nowrap;
  }
  #app1 #app-form .flex > *:not(:last-child) {
    margin-right: 1rem;
  }
}
#app1 #app-form .group {
  margin-top: 3rem;
  text-align: left;
}
#app1 #app-form .method {
  font-weight: bold;
}
@media (min-width: 440px) {
  #app1 {
    padding: 4rem 3rem;
  }
}
@media (min-width: 768px) {
  #app1 {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 3rem;
    max-width: 768px;
    align-items: center;
    text-align: left;
    margin: 0 auto;
  }
  #app1 #swatch {
    position: relative;
    left: unset;
    top: unset;
    width: 12rem;
    height: 12rem;
    border-radius: 12rem;
  }
  #app1 #app-form {
    padding: 2rem 0 2rem 3rem;
    border-left: 2px dashed;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(2rem);
}

#dark-mode-switch {
  position: absolute;
  z-index: 3;
  width: 3rem;
  height: 2rem;
  border: 2px solid;
  left: 0.5rem;
  top: 0.5rem;
  border-radius: 3rem;
}

main.dark {
  color: #fff;
  background: #222;
}
main.dark * {
  color: #fff;
}
main.dark #app {
  background: #333;
  box-shadow: 0.5rem 0.5rem 0 rgba(0, 0, 0, 0.7);
}
main.dark #app #swatch-container #dark-mode-toggle input[type=radio]:checked + label:after {
  border: 2px solid #fff;
}
main.dark #app #swatch-container #swatch {
  background-color: #333;
}/*# sourceMappingURL=test1.css.map */
</style>