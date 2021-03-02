'use strict';

// target our order form from the html
const orderForm = document.getElementById( 'order-form' );
const orders = document.getElementById( 'orders' );

// constructor function to create a basic drink
function Order( name, size, milk, isHot, drinkType ) {
  this.name = name;
  this.size = size;
  this.milk = milk;
  this.isHot = isHot;
  this.drinkType = drinkType;

  Order.all.push( this );
  localStorage.setItem( 'orders', JSON.stringify( Order.all ) );
}

// set the global array to empty
Order.all = [];

console.log(Order.prototype);
// event handler function to run every time the form is submitted
// get all the values from the form
// update the previous orders with the new order
function handleSubmit( event ) {
  event.preventDefault();

  const order = event.target;
  let name = order.name.value;
  let size = order.size.value;
  let isHot = order.isHot.checked;
  let drinkType = order.drinkType.value;
  let milk = order.milk.value;

  new Order( name, size, milk, isHot, drinkType );

  renderOrder();
}

function renderOrder() {
  orders.innerHTML = '';

  for( let i = 0; i < Order.all.length; i++ ) {
    const li = document.createElement( 'li' );
    let temp;
    if ( Order.all[i].isHot === true ) {
      temp = 'hot';
    } else {
      temp = 'cold';
    }
    li.textContent = `${Order.all[i].name} ordered a ${temp} ${Order.all[i].drinkType} with ${Order.all[i].milk}`;
    orders.appendChild( li );
  }
}

// clear all my current uls to prevent duplicate information
// go through the array and output the details of each drink in the array
function getData() {
  const data = localStorage.getItem('orders');
  if(data) {
    const objData = JSON.parse(data);
    Order.all = objData;
    renderOrder();
  }
}

// Add an event listener to the submit button
orderForm.addEventListener( 'submit', handleSubmit );
getData();

// let obj = {
//   'firstName': 'Neveen',
//   'class': 201,
//   'age': 24,
//   getAge: function() {
//     console.log( this.age );
//     return this.age;
//   }
// };

// console.log(obj.getAge())

// let objLocalStorage = JSON.stringify( obj );

// localStorage.setItem( 'firstName', objLocalStorage );
// console.log(localStorage.getItem('firstName'));

// let localObj = localStorage.getItem( 'firstName' );

// console.log( localObj );
// console.log( JSON.parse( localObj ) );
// console.log(typeof localStorage.getItem('firstName'));

// console.log(obj);