### Day 3: JavaScript 101

1. **Introduction to JavaScript:**
   - Variables, data types, and operators.
   - Control flow: if statements, switch statements.
   - Loops: for, while, do-while.

```javascript
// Variables and Data Types
let name = "John";
const age = 25;
const isStudent = true;

// Control Flow - If Statement
if (age >= 18) {
    console.log(`${name} is an adult.`);
} else {
    console.log(`${name} is a minor.`);
}

// Control Flow - Switch Statement
let day = "Monday";
switch (day) {
    case "Monday":
        console.log("It's the start of the week.");
        break;
    // ... other cases ...
    default:
        console.log("It's a day of the week.");
}

// Loops - For Loop
for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i}`);
}

// Loops - While Loop
let counter = 0;
while (counter < 3) {
    console.log(`Counter: ${counter}`);
    counter++;
}
```

2. **Functions and Scope:**
   - Function declaration vs. expression.
   - Arrow functions.
   - Scope and closures.

```javascript
// Function Declaration
function greet(name) {
    console.log(`Hello, ${name}!`);
}
greet("Alice");

// Function Expression
const add = function (a, b) {
    return a + b;
};
console.log(add(3, 4));

// Arrow Function
const multiply = (x, y) => x * y;
console.log(multiply(2, 5));

// Scope and Closures
function outerFunction() {
    let outerVariable = "I'm outside!";
    function innerFunction() {
        console.log(outerVariable);
    }
    return innerFunction;
}
const closureExample = outerFunction();
closureExample(); // Prints: I'm outside!
```

3. **Arrays and Objects:**
   - Creating and manipulating arrays.
   - Object literals and properties.
   - Destructuring assignment.

```javascript
// Arrays
const fruits = ["apple", "banana", "orange"];
console.log(fruits[1]); // Prints: banana

// Array Methods
fruits.push("grape");
console.log(fruits); // Prints: ["apple", "banana", "orange", "grape"]

// Objects
const person = {
    name: "John",
    age: 30,
    isStudent: false,
};
console.log(person.name); // Prints: John

// Object Destructuring
const { name, age } = person;
console.log(`${name} is ${age} years old.`);
```

4. **ES6 Features:**
   - Template literals.
   - Spread/rest operator.
   - Default parameters.

```javascript
// Template Literals
const firstName = "Alice";
const lastName = "Smith";
const fullName = `${firstName} ${lastName}`;
console.log(fullName); // Prints: Alice Smith

// Spread Operator
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];
console.log(newNumbers); // Prints: [1, 2, 3, 4, 5]

// Rest Operator
const sum = (...args) => args.reduce((total, num) => total + num, 0);
console.log(sum(1, 2, 3)); // Prints: 6

// Default Parameters
const greetUser = (name = "Guest") => `Hello, ${name}!`;
console.log(greetUser()); // Prints: Hello, Guest!
```

5. **Asynchronous JavaScript:**
   - Callbacks and the callback hell problem.
   - Promises and the `async/await` syntax.

```javascript
// Callback Example
function fetchData(callback) {
    setTimeout(() => {
        const data = "Data from the server";
        callback(data);
    }, 2000);
}
fetchData((result) => {
    console.log(result); // Prints: Data from the server
});

// Promises
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = "Data from the server";
            resolve(data);
            // or reject("Error fetching data"); for error handling
        }, 2000);
    });
}
fetchDataPromise()
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

// Async/Await
async function fetchDataAsync() {
    try {
        const result = await fetchDataPromise();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
fetchDataAsync();
```