var square = (x) => {
    var result = x * x;
    return result;
};

var squareExpression = (x) => x * x;

console.log(square(9));
console.log(squareExpression(9));

var user = {
    name: 'Andreas',
    sayHi: () => {
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}.`);
    },
    sayHiAlt() {
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}.`);
    }
};

user.sayHi(1, 2, 3);
user.sayHiAlt(1, 2, 3);