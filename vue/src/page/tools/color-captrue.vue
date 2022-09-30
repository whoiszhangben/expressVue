<template>
  <div class="container">
  
  <div class="inner">
    
    <h1 class="heading">EyeDropper API Demo</h1>
    
    <p class="info">Click the eye dropper button below and select a colour anywhere on your screen!</p>

    <button class="btn">
      <svg class="btn__icon" role="img" alt="eye dropper" height="100px" width="100px" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 50 50" x="0px" y="0px"><path d="M42.033 3.101c-1.284 0-2.474 0.493-3.381 1.4l-4.932 4.932-3.080-3.084-6.067 6.063 2.498 2.498-18.652 18.652c-1.397 1.397-1.925 3.384-1.449 5.253l0.118 0.46-3.992 3.996 3.634 3.634 3.996-3.992 0.46 0.118c1.871 0.476 3.855-0.054 5.253-1.453l18.652-18.652 2.498 2.498 6.063-6.063-3.084-3.084 4.932-4.932c1.87-1.87 1.87-4.893 0-6.763l-0.077-0.073-0.008-0.012c-0.907-0.907-2.097-1.396-3.381-1.396zM42.033 4.118c0.996 0 1.953 0.391 2.661 1.099l0.085 0.085c1.299 1.299 1.255 3.619 0.244 5.082l-0.244 0.24-4.932 4.936-5.412-5.412 4.932-4.932c0.709-0.709 1.669-1.099 2.665-1.099zM30.636 7.788l11.576 11.576-4.626 4.622-11.576-11.576 4.626-4.622zM27.787 15.625l6.58 6.58-18.648 18.656c-1.289 1.289-3.231 1.673-4.915 0.973l-0.313-0.13-3.764 3.764-2.193-2.201 3.76-3.764-0.13-0.313c-0.701-1.684-0.313-3.623 0.973-4.911l18.652-18.652z"></path></svg>
    </button>
    
    <p class="info">Selected colour:<br><strong><span class="hex-info">None!</span></strong></p>
    
  </div>
  
  <div class="palette">
    <div class="swatch"></div>
    <div class="swatch"></div>
    <div class="swatch"></div>
    <div class="swatch"></div>
    <div class="swatch"></div>
    <div class="swatch"></div>
  </div>
  
</div>
</template>

<script>
export default {
    data() {
        return{
            eyeDropper: null
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (window.EyeDropper) {
                this.eyeDropper = new window.EyeDropper();
                const $btn = document.querySelector('.btn');
                const $container = document.querySelector('.container');
                const $hexInfo = document.querySelector('.hex-info');
                
                const showResult = function(hex = '#FFFFFF') {
                    $container.style.backgroundColor = hex;
                    $hexInfo.innerText = hex;
                }
                let self = this;
                const openDropper = function() {
                    self.eyeDropper.open()
                    .then(res => {
                        if (res && res.sRGBHex) {
                            showResult(res.sRGBHex);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
                $btn.addEventListener('click', openDropper);
            } else {
                const $body = document.querySelector('body');
                const $message = document.createElement('p');
                $message.classList.add('error');
                $message.innerHTML = '😕 Your browser does not support the <a href="https://wicg.github.io/eyedropper-api/" target="_blank" rel="noopener">EyeDropper API.<a/>';
                $body.appendChild($message);
            }
        }
    }
}
</script>

<style scoped>
    * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

html {
  font-size: 16px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: hotpink;
  transition: background-color .5s ease-in-out;
  padding: 30px;
}

.inner {
  width: 100%;
  max-width: 560px;
  padding: 30px;
  text-align: center;
  background: #2D2736;
  border-radius: 15px;
}

.heading {
  font-size: 2.5rem;
  font-weight: 400;
  color: white;
}

@media only screen and (max-width: 42.5rem) {
  .heading {
    font-size: 1.5rem;
  }
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 32px auto 0 auto;
  background: white;
  border: 3px solid white;
  border-radius: 50%;
  outline: 0;
  cursor: pointer;
  color: #111111;
  transform: scale(1.001);
  transition: transform .35s ease-in-out, border-color .35s ease-in-out, background-color .35s ease-in-out;
}

.btn:focus-visible {
  border-color: #90CBFB;
}

.btn:hover {
  transform: scale(1.05);
}

.btn__icon {
  width: 50%;
  height: 50%;
  fill: currentColor;
}

.error {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  font-size: 1.25rem;
  text-align: center;
  background: white;
  color: red;
}

.error a {
  text-decoration: none;
  color: orange;
}

.info {
  margin-top: 32px;
  line-height: 1.5;
  color: white;
}

.info strong {
  text-transform: uppercase;
  font-size: 2rem;
}

.palette {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
  margin-top: 32px;
  width: 100%;
  max-width: 560px;
  padding: 30px;
  text-align: center;
  background: #FFFFFF;
  border-radius: 15px;
}

.swatch {
  height: 66px;
  aspect-ratio: 1 / 1;
  background: #F3FEB0;
  border-radius: 50%;
}

@supports (aspect-ratio: 1 / 1) {
  .swatch {
    height: auto;
  }
}

.swatch:nth-child(2) {
  background-color: #FEA443;
}

.swatch:nth-child(3) {
  background-color: #705E78;
}

.swatch:nth-child(4) {
  background-color: #A5AAA3;
}

.swatch:nth-child(5) {
  background-color: #812F33;
}

.swatch:nth-child(6) {
  background-color: #90CBFB;
}

</style>