'use strict';

//global variables
Product.myProducts = [];
Product.names = [];
Product.lastDisplayed = [];
Product.chartVotes = [];
Product.chartNames = [];
Product.ulEl = document.getElementById('results');
Product.sectEl = document.getElementById('sect-el');
Product.counter = 0;

//constructor
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.score = 0;
  this.timesDisplayed = 0;
  Product.myProducts.push(this);
  Product.names.push(this.name);
}

//product instances
new Product('bag', 'assets/bag.jpg');
new Product('banana', 'assets/banana.jpg');
new Product('bathroom', 'assets/bathroom.jpg');
new Product('boots', 'assets/boots.jpg');
new Product('breakfast', 'assets/breakfast.jpg');
new Product('bubblegum', 'assets/bubblegum.jpg');
new Product('chair', 'assets/chair.jpg');
new Product('cthulhu', 'assets/cthulhu.jpg');
new Product('dog-duck', 'assets/dog-duck.jpg');
new Product('dragon', 'assets/dragon.jpg');
new Product('pen', 'assets/pen.jpg');
new Product('pet-sweep', 'assets/pet-sweep.jpg');
new Product('scissors', 'assets/scissors.jpg');
new Product('shark', 'assets/shark.jpg');
new Product('sweep', 'assets/sweep.png');
new Product('tauntaun', 'assets/tauntaun.jpg');
new Product('unicorn', 'assets/unicorn.jpg');
new Product('usb', 'assets/usb.gif');
new Product('water-can', 'assets/water-can.jpg');
new Product('wine-glass', 'assets/wine-glass.jpg');

//access img eles from the DOM
Product.imgElementLeft = document.getElementById('img-element-left'); 
Product.imgElementCenter = document.getElementById('img-element-center');
Product.imgElementRight = document.getElementById('img-element-right');

Product.randomProduct = function() {
  do {
    var ranLeft = Math.floor(Math.random() * Product.myProducts.length);
    var ranCenter = Math.floor(Math.random() * Product.myProducts.length);
    var ranRight = Math.floor(Math.random() * Product.myProducts.length);
  } while (ranLeft === ranRight
      || ranLeft === ranCenter
      || ranRight === ranCenter
      || Product.lastDisplayed.includes(ranLeft)
      || Product.lastDisplayed.includes(ranRight)
      || Product.lastDisplayed.includes(ranCenter));
  Product.lastDisplayed[0] = ranLeft;
  Product.lastDisplayed[1] = ranCenter;
  Product.lastDisplayed[2] = ranRight;
  Product.imgElementLeft.src = Product.myProducts[ranLeft].filepath;
  Product.imgElementLeft.alt = Product.myProducts[ranLeft].name;
  Product.imgElementCenter.src = Product.myProducts[ranCenter].filepath;
  Product.imgElementCenter.alt = Product.myProducts[ranCenter].name;
  Product.imgElementRight.src = Product.myProducts[ranRight].filepath;
  Product.imgElementRight.alt = Product.myProducts[ranRight].name;
  Product.myProducts[ranLeft].timesDisplayed++;
  Product.myProducts[ranCenter].timesDisplayed++;
  Product.myProducts[ranRight].timesDisplayed++;
};

Product.showResults = function() {
  for (var i = 0; i < Product.myProducts.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${Product.myProducts[i].name} has ${Product.myProducts[i].score} votes and was displayed ${Product.myProducts[i].timesDisplayed} times.`;
    Product.ulEl.appendChild(liEl);
  }
};

// function to tally up votes for chart
Product.tallyVotesForChart = function() {
  for (var i = 0; i < Product.myProducts.length; i++) {
    Product.totalVotes[i] = Product.myProducts[i].score;
    Product.chartNames[i] = Product.myProducts[i].name;
  }
};

// event handler
Product.voteHandler = function(event) {
  Product.counter++;
  console.log(Product.counter);
  for (var i = 0; i < Product.myProducts.length; i++) {
    if (event.target.alt === Product.myProducts[i].name) {
      Product.myProducts[i].score++;
    }
  }
  // event remover
  if (Product.counter > 24) {
    Product.sectEl.removeEventListener('click', Product.voteHandler);
    Product.showResults();
    Product.tallyVotesForChart();
    alert('The survey is now completed, thank you for participating!');
  } else {
    Product.randomProduct();
  }
};

Product.sectEl.addEventListener('click', Product.voteHandler);
Product.randomProduct();