//async function tht always returns a promise
async function myAsyncFunction() {
  return "Hello";
}
//if you call this function we gt the promise
const myAsyncFunctionValue = myAsyncFunction();
console.log("async function always returns a promise", myAsyncFunctionValue);
//output : returns a promise
//explination : async function always returns a promise
//here in myAsyncFunction returning an value , but how it is getting converted to promise
// as we know async function always returns a promise, so here it wraps the value in a promise and returns it
// if myAsyncFunction returns a promise then it will return the same promise
// if myAsyncFunction throws an error then it will return a rejected promise
// if myAsyncFunction returns a value then it will return a resolved promise

//old way of resolving the promise is to use then and catch
const p = new Promise((resolve, reject) => {
  resolve("Hello");
});
p.then((value) => {
  console.log("this value is coming from using then and catch", value);
});
//output : Hello
//explination : here we are reading the value of the promise using then

// -----------------------------------------------------------------------------------------------------------------------------

//new way of resolving the promise is to use async and await
//async : async is a keyword that can be used to define an asynchronous function. It returns a promise.
// await : await is a keyword that can be used inside an async function to pause the execution of the function until the promise is resolved.
const newPromise = new Promise((resolve, reject) => {
  resolve(" Hello async await");
});
async function newFunction() {
  const val = await newPromise;
  console.log("this is from async and awit part :", val);
}
newFunction();
//output : this is async function resolved through await
//explination : here we are reading the value of the promise using await
//await can only be used inside an async function
//await pauses the execution of the async function until the promise is resolved
//await returns the resolved value of the promise
//if the promise is rejected, await throws an error

// -----------------------------------------------------------------------------------------------------------------------------
// How asyncawait and actual promise works ?
//asyncawait is just a syntactic sugar over promises
//asyncawait is built on top of promises
//asyncawait makes it easier to work with promises
//asyncawait makes the code look synchronous
//asyncawait makes the code more readable
//asyncawait makes the code easier to debug

//part 1: let check the use case of promises USING Then and catch

const somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("resolved");
  }, 2000);
});

function getPromiseData() {
  //NOTE: JS Engine doest wait fro the promise to resolve, it executes the synchronous code first

  somePromise.then((data) => {
    console.log(data); //prints after two seconds, even if we remove set timeout also it prints after the synchronous code
  });

  console.log("this is printed before the promise is resolved"); //prints first
}
getPromiseData();
//output : this is printed before the promise is resolved
//resolved
//explination : here we are reading the value of the promise using then
// the promise is resolved after 2 seconds
// the value of the promise is printed after the synchronous code is executed

//part 2: let check the use case of async await

const promisOne = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise 1");
  }, 2000);
  //scenarion 2 3000ms
  //scenarion 2 1000ms
});

const promisTwo = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise 2");
  }, 2000);
  //scenarion 2 2000ms
  //scenarion 2 3000ms
});

async function readingPromise() {
  //if the console.log is written here it will be printed first
  console.log("this is printed first");
  //JS Engine waits for the promise to resolve
  const valueOne = await promisOne;
  console.log(valueOne);
  console.log("this is printed after the execution of await");

  const valueTwo = await promisTwo;
  console.log(valueTwo);
}
readingPromise();
/**
 * scenario 1: 
        output : this is printed first
                 promise 1
                 this is printed after the execution of await
                 promise 2
        explination : here we are reading the value of the promise using await
                      the JS Engine waits for the promise to resolve
                      the value of the promise is printed after the synchronous code is executed
 */

/**
 * scenario 2: where Promisine one has 3000ms and promise two has 2000ms
 * 
 *  befor and after i have adde - which represents the console logs
 * 
 * Thinking : when the execution happens according to await , it should wait for the promise to resolve , so intially the line printed is : first - this is printed first - and later 
 *            promise 1 is printed after 3 seconds and then line : - this is printed after the execution of await - is printed and promise 2 will be printed after 2 seconds (Thinking only , not the real one)
 *            **point is mostly think like after 2 seconds the promise 2 prints but that is not the case , after entire 3seconds only the promise two prints **
 *            *** But the Execution  is different from thinking ***
 *              
 * execution: here p1 is 3000ms and p2 is 2000ms , while execution it waits for 3sec and prints the result in the same way the p2 is only 2seconds which is completed while the 3 seconds execution time 
 *             so without any delat the p2 is printed without any extra delay.
 *             *** we can understand this concept by eventloop ***
 * 
        output : this is printed first
                 promise 1
                 this is printed after the execution of await
                 promise 2
        explination : here we are reading the value of the promise using await
                      the JS Engine waits for the promise to resolve
                      the value of the promise is printed after the synchronous code is executed
 */

/**
 * scenario 3: where Promisine one has 1000ms and promise two has 3000ms
 * 
 *  befor and after i have adde - which represents the console logs
 * 
 * Thinking: here p1 is 1000ms and p2 is 3000ms , first prints: -this is printed first - and while execution it waits for 3sec and prints the result Promise 1 and then prints the line : - promise 1 -,  - this is printed after the execution of await - and then prints the - promise 2 -
 *           *** But the Execution  is different from thinking ***
 * 
 * Execution : when the execution happens according to await , it should wait for the promise to resolve , so intially the line printed is : first - this is printed first - and later 
 *            promise 1 is printed after 1 seconds and then line : - this is printed after the execution of await - is printed and promise 2 will be printed after 3 seconds.
 *            
        output : this is printed first
                 promise 1
                 this is printed after the execution of await
                 promise 2
 */

// errorHandling in async await
// use try and catch block to handle the error
// if the promise is rejected, await throws an error
// if the promise is rejected, the catch block is executed
// if the promise is resolved, the catch block is not executed

//or else with out try and and catch there is a old wat to handle is , we know that async functions return the promise
// example : myasyncfunction().catch((err) => console.log(err)) // this is the old way of handling the error
