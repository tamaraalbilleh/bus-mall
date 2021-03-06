/// lab 12 ///


'use strict';
let products = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can','wine-glass','usb'];
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

for (let i =0;i<products.length;i++){
  new Product (products[i]);
}


///// array to hold last shown set of images /////
let lastSet = [];
/////////////////////////////////////////////////

function renderProduct (){
  lastSet = [];
  if (Product.counter >0){
    lastSet= [leftProductIndex,middleProductIndex,rightProductIndex];
  }
  let middleIndex ;
  let rightIndex ;

  //left image randomization//

  let leftIndex = randomNumber( 0,Product.all.length - 1 );
  leftImage.src = Product.all[leftIndex].img;
  leftImage.alt = Product.all[leftIndex].name;
  leftProductIndex = leftIndex;
  lastSet.push (leftIndex);

  //middle image randomization //

  do {
    middleIndex = randomNumber(0,Product.all.length -1);
  } while (leftIndex === middleIndex || middleIndex === rightIndex);

  middleImage.src = Product.all[middleIndex].img;
  middleImage.alt = Product.all[middleIndex].name;
  middleProductIndex = middleIndex;
  lastSet.push (middleIndex);
  //right image randomization //

  do {
    rightIndex = randomNumber (0,Product.all.length -1);
  } while (leftIndex === rightIndex || rightIndex === middleIndex);
  rightImage.src = Product.all[rightIndex].img;
  rightImage.alt = Product.all[rightIndex].name;
  rightProductIndex = rightIndex;
  lastSet.push (rightIndex);
  // shawn counters for each image //
  Product.all[leftIndex].shawn++;
  Product.all[middleIndex].shawn++;
  Product.all[rightIndex].shawn++;

}

function handleClick (event){
  if (Product.counter < clickCounter){
    // lastSet.push (leftProductIndex , middleProductIndex,rightProductIndex);
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
    section.removeEventListener ('click', handleClick);
  }
}

section.addEventListener ('click', handleClick);

function randomNumber( min, max ) {
  let indexNumber = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  // console.log (lastSet);
  for (let f = 0 ; f < lastSet.length ; f++){

    if (indexNumber === lastSet[f]){
      indexNumber = Math.floor( Math.random() * ( max - min + 1 ) ) + min;

    }
  }
  return (indexNumber);
}


let buttonClick = 0 ;


///// data arrays for the chart ////
let data1 = [];
let data2 = [];
///////////////////////////////////

/////////////////////local storage part /////////////////////////////////

localStorage;

renderProduct ();
document.getElementById('resultViewer').addEventListener('click', function() {
  localStorage.setItem ('product',JSON.stringify( Product.all));
  console.log (localStorage);
  buttonClick = buttonClick +1;
  const container = document.getElementById ('result-section');
  const ulElement =document.createElement ('ul');
  container.appendChild (ulElement);
  for (let u = 0 ; u < products.length ; u++){
    const liElement = document.createElement ('li');
    ulElement.appendChild (liElement);
    liElement.textContent = (`${products[u]} had ${Product.all[u].clicks } votes, and was seen ${Product.all[u].shawn} times.`);
    data1.push (Product.all[u].clicks);
    data2.push (Product.all[u].shawn);
  }

  let ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: products,
      datasets: [{
        label: 'Number of Votes',
        data: data1,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',

        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1
      }
      ,{
        label: 'Times Seen',
        data: data2,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  if (buttonClick >= 1){
    document.getElementById('resultViewer').style.visibility = 'hidden';
  }

});
function getData() {
  const updateData = localStorage.getItem('product');
  if(updateData) {
    const objData = JSON.parse(updateData);
    Product.all = objData;
    renderProduct();
  }
}
getData();

//-----------------------------------------------------------------------------------------------------------------------//
/// lab 12 ///


// 'use strict';
// let products = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can','wine-glass','usb'];
// let clickCounter = 25;
// let leftProductIndex =0;
// let middleProductIndex= 0;
// let rightProductIndex  =0;
// const section = document.getElementById ('image-section');
// const leftImage = document.getElementById ('leftImage');
// const middleImage = document.getElementById ('middleImage');
// const rightImage =document.getElementById ('rightImage');
// document.getElementById('resultViewer').style.visibility = 'hidden';


// function Product (name) {
//   this.name = name;
//   if (name ==='usb'){
//     this.img = `/img/${name}.gif`;}
//   else if (name === 'sweep'){
//     this.img = `/img/${name}.png`;
//   }else {
//     this.img = `./img/${name}.jpg`;
//   }
//   this.clicks = 0 ;
//   this.shawn = 0 ;
//   Product.all.push(this);
// }


// Product.all=[];
// Product.counter = 0;

// for (let i =0;i<products.length;i++){
//   new Product (products[i]);
// }


// ///// array to hold last shown set of images /////
// let lastSet = [];
// /////////////////////////////////////////////////

// function renderProduct (){
//   lastSet = [];
//   if (Product.counter >0){
//     lastSet= [leftProductIndex,middleProductIndex,rightProductIndex];
//   }
//   let middleIndex ;
//   let rightIndex ;

//   //left image randomization//

//   let leftIndex = randomNumber( 0,Product.all.length - 1 );
//   leftImage.src = Product.all[leftIndex].img;
//   leftImage.alt = Product.all[leftIndex].name;
//   leftProductIndex = leftIndex;
//   lastSet.push (leftIndex);

//   //middle image randomization //

//   do {
//     middleIndex = randomNumber(0,Product.all.length -1);
//   } while (leftIndex === middleIndex || middleIndex === rightIndex);

//   middleImage.src = Product.all[middleIndex].img;
//   middleImage.alt = Product.all[middleIndex].name;
//   middleProductIndex = middleIndex;
//   lastSet.push (middleIndex);
//   //right image randomization //

//   do {
//     rightIndex = randomNumber (0,Product.all.length -1);
//   } while (leftIndex === rightIndex || rightIndex === middleIndex);
//   rightImage.src = Product.all[rightIndex].img;
//   rightImage.alt = Product.all[rightIndex].name;
//   rightProductIndex = rightIndex;
//   lastSet.push (rightIndex);
//   // shawn counters for each image //
//   Product.all[leftIndex].shawn++;
//   Product.all[middleIndex].shawn++;
//   Product.all[rightIndex].shawn++;
// }

// function handleClick (event){
//   if (Product.counter < clickCounter){
//     // lastSet.push (leftProductIndex , middleProductIndex,rightProductIndex);
//     const clickedElement = event.target;
//     if (clickedElement.id === 'leftImage' || clickedElement.id === 'middleImage' || clickedElement.id === 'rightImage'){

//       if (clickedElement.id === 'leftImage'){
//         Product.all[leftProductIndex].clicks++;

//       }
//       if (clickedElement.id === 'middleImage'){
//         Product.all[middleProductIndex].clicks++;
//       }
//       if (clickedElement.id === 'rightImage'){
//         Product.all[rightProductIndex].clicks++;
//       }
//     }

//     Product.counter++;

//     renderProduct ();


//   }
//   if (Product.counter === clickCounter){
//     document.getElementById('resultViewer').style.visibility = 'visible';
//     section.removeEventListener ('click', handleClick);
//   }
// }

// section.addEventListener ('click', handleClick);

// function randomNumber( min, max ) {
//   let indexNumber = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
//   console.log (lastSet);
//   for (let f = 0 ; f < lastSet.length ; f++){

//     if (indexNumber === lastSet[f]){
//       indexNumber = Math.floor( Math.random() * ( max - min + 1 ) ) + min;

//     }
//   }
//   return (indexNumber);
// }


// let buttonClick = 0 ;


// ///// data arrays for the chart ////
// let data1 = [];
// let data2 = [];
// ///////////////////////////////////



// renderProduct ();
// document.getElementById('resultViewer').addEventListener('click', function() {
//   buttonClick = buttonClick +1;
//   const container = document.getElementById ('result-section');
//   const ulElement =document.createElement ('ul');
//   container.appendChild (ulElement);
//   for (let u = 0 ; u < products.length ; u++){
//     const liElement = document.createElement ('li');
//     ulElement.appendChild (liElement);
//     liElement.textContent = (`${products[u]} had ${Product.all[u].clicks} votes, and was seen ${Product.all[u].shawn} times.`);
//     data1.push (Product.all[u].clicks);
//     data2.push (Product.all[u].shawn);
//   }

//   let ctx = document.getElementById('chart').getContext('2d');
//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: products,
//       datasets: [{
//         label: 'Number of Votes',
//         data: data1,
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',

//         ],
//         borderColor: [
//           'rgba(75, 192, 192, 1)',
//         ],
//         borderWidth: 1
//       }
//       ,{
//         label: 'Times Seen',
//         data: data2,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 99, 132, 0.2)',

//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//         ],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: true
//           }
//         }]
//       }
//     }
//   });

//   if (buttonClick >= 1){
//     document.getElementById('resultViewer').style.visibility = 'hidden';
//   }

// });





























////// lab 11 ////

// 'use strict';
// let products = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can','wine-glass','usb'];
// // let images = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.jpg','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg','usb.gif'];
// let clickCounter = 25;
// let leftProductIndex =0;
// let middleProductIndex= 0;
// let rightProductIndex  =0;
// const section = document.getElementById ('image-section');
// const leftImage = document.getElementById ('leftImage');
// const middleImage = document.getElementById ('middleImage');
// const rightImage =document.getElementById ('rightImage');
// document.getElementById('resultViewer').style.visibility = 'hidden';


// function Product (name) {
//   this.name = name;
//   if (name ==='usb'){
//     this.img = `/img/${name}.gif`;}
//   else if (name === 'sweep'){
//     this.img = `/img/${name}.png`;
//   }else {
//     this.img = `./img/${name}.jpg`;
//   }
//   this.clicks = 0 ;
//   this.shawn = 0 ;
//   Product.all.push(this);
// }


// Product.all=[];
// Product.counter = 0;

// // const tester = new Product ('tester');
// // console.log (tester);


// for (let i =0;i<products.length;i++){
//   new Product (products[i]);
// }
// console.log (Product.all);


// function renderProduct (){

//   let middleIndex ;
//   let rightIndex ;

//   //left image randomization//

//   let leftIndex = randomNumber( 0,Product.all.length - 1 );
//   leftImage.src = Product.all[leftIndex].img;
//   leftImage.alt = Product.all[leftIndex].name;
//   leftProductIndex = leftIndex;

//   //middle image randomization //

//   do {
//     middleIndex = randomNumber(0,Product.all.length -1);
//   } while (leftIndex === middleIndex || middleIndex === rightIndex);

//   middleImage.src = Product.all[middleIndex].img;
//   middleImage.alt = Product.all[middleIndex].name;
//   middleProductIndex = middleIndex;

//   //right image randomization //

//   do {
//     rightIndex = randomNumber (0,Product.all.length -1);
//   } while (leftIndex === rightIndex || rightIndex === middleIndex);
//   rightImage.src = Product.all[rightIndex].img;
//   rightImage.alt = Product.all[rightIndex].name;
//   rightProductIndex = rightIndex;

//   // shawn counters for each image //
//   Product.all[leftIndex].shawn++;
//   Product.all[middleIndex].shawn++;
//   Product.all[rightIndex].shawn++;


// }
// function handleClick (event){
//   if (Product.counter < clickCounter){
//     const clickedElement = event.target;
//     if (clickedElement.id === 'leftImage' || clickedElement.id === 'middleImage' || clickedElement.id === 'rightImage'){
//       if (clickedElement.id === 'leftImage'){
//         Product.all[leftProductIndex].clicks++;
//       }
//       if (clickedElement.id === 'middleImage'){
//         Product.all[middleProductIndex].clicks++;
//       }
//       if (clickedElement.id === 'rightImage'){
//         Product.all[rightProductIndex].clicks++;
//       }
//     }
//     Product.counter++;
//     renderProduct ();
//   }
//   if (Product.counter === clickCounter){
//     document.getElementById('resultViewer').style.visibility = 'visible';
//     section.removeEventListener ('click', handleClick);
//   }
// }

// section.addEventListener ('click', handleClick);

// function randomNumber( min, max ) {
//   return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
// }


// let buttonClick = 0 ;

// renderProduct ();
// document.getElementById('resultViewer').addEventListener('click', function() {
//   buttonClick = buttonClick +1;
//   const container = document.getElementById ('result-section');
//   const ulElement =document.createElement ('ul');
//   container.appendChild (ulElement);
//   for (let u = 0 ; u < products.length ; u++){
//     const liElement = document.createElement ('li');
//     ulElement.appendChild (liElement);
//     liElement.textContent = (`${products[u]} had ${Product.all[u].clicks} votes, and was seen ${Product.all[u].shawn} times.`);

//   }

//   if (buttonClick >= 1){
//     document.getElementById('resultViewer').style.visibility = 'hidden';
//   }

// });





