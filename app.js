'use strict';

//global variables
Product.myProducts = [];

Product.imgElementOne = document.getElementById('product-pic-one'); 
Product.imgElementTwo = document.getElementById('product-pic-two');
Product.imgElementThree = document.getElementById('product-pic-three');
// var counter = 0;

//constructor
function Product(filepath) {
  this.filepath = filepath;
  this.score = 0;
  Product.myProducts.push(this);
}

//product instances
new Product('assets/bag.jpg');
new Product('assets/banana.jpg');
new Product('assets/bahtroom.jpg');
new Product('assets/boots.jpg');
new Product('assets/breakfast.jpg');
new Product('assets/bubblegum.jpg');
new Product('assets/chair.jpg');
new Product('assets/cthulu.jpg');
new Product('assets/dog-duck.jpg');
new Product('assets/dragon.jpg');
new Product('assets/pen.jpg');
new Product('assets/pet-sweep.jpg');
new Product('assets/scissors.jpg');
new Product('assets/shark.jpg');
new Product('assets/sweep.jpg');
new Product('assets/tauntaun.jpg');
new Product('assets/unicorn.jpg');
new Product('assets/usb.gif');
new Product('assets/water-can.jpg');
new Product('assets/wine-glass.jpg');

console.log(Product.myProduct);

Product.randomProduct = function() {
  // for (var i = 0; i < 2; i++) {
  var ranProductNum = Math.random() * Product.myProducts.length;
  var ranProductIndex = Math.floor(ranProductNum);
  var theProduct = Product.myProducts[ranProductIndex];
  Product.imgElementOne = theProduct;
  // }
};

// function counterUp() {
//   counter += 1;
//   console.log(counter);
// }

// productForm.addEventListener('submit', counterUp);
Product.imgElementOne.addEventListener('submit', Product.randomProduct);
// Product.imgElementTwo.addEventListener('submit', Product.randomProduct);
// Product.imgElementThree.addEventListener('submit', Product.randomProduct);

