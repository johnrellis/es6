'use strict';


/*
Standard function invocation patterns in JS (see javascript the good parts page 27)
 */


console.log('----- function invocation pattern -----');

var standAloneFunction = function() {
  console.log(`when a function is not a property of an object and it is executed, "this" is the globalObject OR undefined if you are using strict mode, here it is -> ${this}`);
};

standAloneFunction(); //this === globalObject (in browser), this === undefined in strict mode


console.log('----- method invocation pattern -----');

var car = {
  manufacturer: 'Ferrari',
  model: '458',
  beep: function() {
    console.log(`when a function is invoked as a property of an object then "this" is the object ->  ${this} -> ${this.manufacturer} ${this.model}`);
  }
};

car.beep(); // this === car

console.log('----- constructor invocation pattern -----');

var Car = function(manufacturer, model) {
  this.manufacturer = manufacturer;
  this.model = model;
};

Car.prototype.start = function() {
  console.log(`when a function is invoked as a constructor with the "new" keyword, "this" is an object that is linked to the prototype -> ${this.manufacturer} ${this.model}`);
};

var focus = new Car('Ford', 'Focus');

focus.start();


try {
  console.log('calling a constructor without "new"  means that "this" is the globalObject, therefore this.model sets up a model member on the globalObject');
  var badCar = Car('Ford', 'Fiesta'); //will throw if run with strict mode
} catch (error) {
  console.log('remember globalObject  is undefined in strict mode, therefore "this" is undefined');
  console.log(error.message);
}

console.log('----- apply invocation pattern  -----');
console.log('provide an object to become "this", a second parameter can be supplied, it is an array of arguments for the function');

car.beep.apply({
  manufacturer: 'Fiat',
  model: 'panda'
}); //can take an additional parameter, an array of inputs for 'beep'


/*
arrow functions
 */

console.log('----- arrow functions -----');

var getMe = () => 'john';
console.log(getMe()); //'john'

var doubleMe = me => me * 2;
console.log(doubleMe(4)); //8

var add = (x, y) => x + y;
console.log(add(2, 3)); //5

var raise = (x, powerOf) => x ** powerOf;
console.log(raise(2, 4)); //16

var raiseLongHand = (x, powerOf) => {
  return x ** powerOf;
};

console.log(raiseLongHand(2, 5)); //32

console.log(`arrowFunction.hasOwnProperty('prototype') -> ${raiseLongHand.hasOwnProperty('prototype')}`);


console.log('----- function invocation pattern -----');

var standAloneArrowFunction = () => {
  console.log(`when using an arrow function, "this" now becomes the scope within which the funcion is written, or lexical scope, in the case of this, it is the module.exports object`);
  console.log(`this === module.exports -> ${this === module.exports}`);
  return this;
};



console.log('----- method invocation pattern -----');

var car = {
  manufacturer: 'Ferrari',
  model: '458',
  beep: () => {
    console.log(`when an arrow function is invoked as a property of an object then "this" is not the containing object, it is the lexical scope of the object ->  ${this} -> ${this.manufacturer} ${this.model}`);
    console.log(`this === module.exports -> ${this === module.exports}`);
  }
};


console.log('----- constructor invocation pattern -----');

var Van = (manufacturer, make) => {
  this.manufacturer = manufacturer;
  this.make = make;
};

try {
  new Van('Ford', 'Transit');
} catch (error) {
  console.log(`arrow functions cannot be used as a constructor -> ${error.message}`);
}

console.log('----- apply invocation pattern -----');