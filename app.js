'use strict';

//global variables
Product.myProducts = parseInt(localStorage.getItem('products')) || [];
Product.names = [];
Product.lastDisplayed = [];
Product.chartVotes = [];
Product.chartNames = [];
Product.ulEl = document.getElementById('results');
Product.sectEl = document.getElementById('sect-el');
Product.counter = parseInt(localStorage.getItem('counter')) || 0;
Product.storageArr = [];

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
new Product('R2D2 Bag', 'assets/bag.jpg');
new Product('Banana', 'assets/banana.jpg');
new Product('Bathroom', 'assets/bathroom.jpg');
new Product('Boots', 'assets/boots.jpg');
new Product('Breakfast', 'assets/breakfast.jpg');
new Product('Bubblegum', 'assets/bubblegum.jpg');
new Product('Chair', 'assets/chair.jpg');
new Product('Cthulhu', 'assets/cthulhu.jpg');
new Product('Dog-duck', 'assets/dog-duck.jpg');
new Product('Dragon', 'assets/dragon.jpg');
new Product('Pen', 'assets/pen.jpg');
new Product('Pet-sweep', 'assets/pet-sweep.jpg');
new Product('Scissors', 'assets/scissors.jpg');
new Product('Shark', 'assets/shark.jpg');
new Product('Sweep', 'assets/sweep.png');
new Product('Tauntaun', 'assets/tauntaun.jpg');
new Product('Unicorn', 'assets/unicorn.jpg');
new Product('USB', 'assets/usb.gif');
new Product('Water-can', 'assets/water-can.jpg');
new Product('Wine-glass', 'assets/wine-glass.jpg');

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

Product.tallyVotesForChart = function() {
  for (var i = 0; i < Product.myProducts.length; i++) {
    Product.chartVotes[i] = Product.myProducts[i].score;
    Product.chartNames[i] = Product.myProducts[i].name;
  }
};

// event handler
Product.voteHandler = function(event) {
  Product.counter++;
  persistentClicks();
  persistentVotes();
  for (var i = 0; i < Product.myProducts.length; i++) {
    if (event.target.alt === Product.myProducts[i].name) {
      Product.myProducts[i].score++;
    }
  }

  // event remover
  if (Product.counter > 49) {
    Product.sectEl.removeEventListener('click', Product.voteHandler);
    Product.showResults();
    Product.tallyVotesForChart();
    Product.generateChart();
    Product.hideImages();
    localStorage.removeItem('counter');
    localStorage.removeItem('products');
    alert('The survey is now completed, thank you for participating!');
  } else {
    Product.randomProduct();
  }
};

// hides the pictures after the 25th vote
Product.hideImages = function() {
  Product.imgElementLeft.classList.add('hide');
  Product.imgElementCenter.classList.add('hide');
  Product.imgElementRight.classList.add('hide');
};


Product.sectEl.addEventListener('click', Product.voteHandler);
Product.randomProduct();

Product.generateChart = function() {
  var context = document.getElementById('chart').getContext('2d');
  var productChart = new Chart(context, { //eslint-disable-line
    type: 'bar',
    data : {
      labels: Product.chartNames,
      datasets: [{
        label: 'Votes Per Product',
        data: Product.chartVotes,
        backgroundColor: ['rgba(101,200,67,0.5)', 'rgba(220,20,60,0.5)', 'rgba(255,69,0,0.5)', 'rgba(127,255,0,0.5)', 'rgba(0,255,127,0.5)', 'rgba(255,215,0,0.5)', 'rgba(60,179,113,0.5)', 'rgba(47,79,79,0.5)', 'rgba(0,255,255,0.5)', 'rgba(30,144,255,0.5)', 'rgba(127,255,212,0.5)', 'rgba(0,0,139,0.5)', 'rgba(138,43,226,0.5)', 'rgba(139,0,139,0.5)', 'rgba(186,85,211,0.5)', 'rgba(255,0,255,0.5)', 'rgba(255,20,147,0.5)', 'rgba(112,128,144,0.5)', 'rgba(255,127,80,0.5)', 'rgba(210,105,30,0.5)'
        ],
        borderColor: []
      }],
    },
    options: {
      scales: {
        yAxes: [{
          tick: {
            beginAtZero: true,
          }
        }]
      }
    }
  });
};

// local storage click accumulator
var persistentClicks = function() {
  localStorage.setItem('counter', JSON.stringify(Product.counter));
};

// localstorage vote accumulator
var persistentVotes = function() {
  localStorage.setItem('products', JSON.stringify(Product.myProducts));
};