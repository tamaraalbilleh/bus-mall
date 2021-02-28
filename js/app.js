'use strict';
let products = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can','wine-glass','usb'];
// let images = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.jpg','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg','usb.gif'];
let clickCounter = 25;
let leftProductIndex =0;
let middleProductIndex= 0;
let rightProductIndex  =0;
const section = document.getElementById ('image-section');
const leftImage = document.getElementById ('leftImage');
const middleImage = document.getElementById ('middleImage');
const rightImage =document.getElementById ('rightImage');
document.getElementById('resultViewer').style.visibility = 'hidden';


function Product (name) {
  this.name = name;
  if (name ==='usb'){
    this.img = `/img/${name}.gif`;}
  else if (name === 'sweep'){
    this.img = `/img/${name}.png`;
  }else {
    this.img = `./img/${name}.jpg`;
  }
  this.clicks = 0 ;
  this.shawn = 0 ;
  Product.all.push(this);
}


Product.all=[];
Product.counter = 0;

// const tester = new Product ('tester');
// console.log (tester);


for (let i =0;i<products.length;i++){
  new Product (products[i]);
}
console.log (Product.all);


function renderProduct (){

  let middleIndex ;
  let rightIndex ;

  //left image randomization//

  let leftIndex = randomNumber( 0,Product.all.length - 1 );
  leftImage.src = Product.all[leftIndex].img;
  leftImage.alt = Product.all[leftIndex].name;
  leftProductIndex = leftIndex;

  //middle image randomization //

  do {
    middleIndex = randomNumber(0,Product.all.length -1);
  } while (leftIndex === middleIndex || middleIndex === rightIndex);

  middleImage.src = Product.all[middleIndex].img;
  middleImage.alt = Product.all[middleIndex].name;
  middleProductIndex = middleIndex;

  //right image randomization //

  do {
    rightIndex = randomNumber (0,Product.all.length -1);
  } while (leftIndex === rightIndex || rightIndex === middleIndex);
  rightImage.src = Product.all[rightIndex].img;
  rightImage.alt = Product.all[rightIndex].name;
  rightProductIndex = rightIndex;

  // shawn counters for each image //
  Product.all[leftIndex].shawn++;
  Product.all[middleIndex].shawn++;
  Product.all[rightIndex].shawn++;


}
function handleClick (event){
  if (Product.counter < clickCounter){
    const clickedElement = event.target;
    if (clickedElement.id === 'leftImage' || clickedElement.id === 'middleImage' || clickedElement.id === 'rightImage'){
      if (clickedElement.id === 'leftImage'){
        Product.all[leftProductIndex].clicks++;
      }
      if (clickedElement.id === 'middleImage'){
        Product.all[middleProductIndex].clicks++;
      }
      if (clickedElement.id === 'rightImage'){
        Product.all[rightProductIndex].clicks++;
      }
    }
    Product.counter++;
    renderProduct ();
  }
  if (Product.counter === clickCounter){
    document.getElementById('resultViewer').style.visibility = 'visible';
  }
}

section.addEventListener ('click', handleClick);

function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}




renderProduct ();
document.getElementById('resultViewer').addEventListener('click', function() {
  const container = document.getElementById ('result-section');
  const ulElement =document.createElement ('ul');
  container.appendChild (ulElement);
  for (let u = 0 ; u < products.length ; u++){
    const liElement = document.createElement ('li');
    ulElement.appendChild (liElement);
    liElement.textContent = (`${products[u]} had ${Product.all[u].clicks} votes, and was seen ${Product.all[u].shawn} times.`);

  }
});
