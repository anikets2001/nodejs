const os = require('os');
const {add} = require('./01_introduction/math');

console.log('Hello World!');

console.log(os.cpus().length);

const addition = add(2,3); 
// console.log(`The addition of 2 and 3 is ${addition}`);

