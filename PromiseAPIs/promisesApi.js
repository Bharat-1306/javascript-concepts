const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 1 is resolved");
  }, 3000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("Promise 2 is resolved");
    reject("Promise 2 is rejected");
  }, 1000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 3 is resolved");
  }, 2000);
});

// Promise.all() takes an array of promises and returns a single promise
// that resolves when all of the promises in the iterable argument have resolved
// or when the iterable argument contains no promises.
// It rejects with the reason of the first promise that rejects.
Promise.all([p1, p2, p3])
  .then((res) => {
    console.log("response from promise.all", res);
  })
  .catch((err) => {
    console.error("error from promise.all", err);
  });
// Output:
// Promise 2 is rejected
// Promise 2 is rejected because it is the first promise that rejects

//-----------------------------------------------------------------------------------------------

// Promise.allSettled() method returns a promise that resolves after all of the given promises have either resolved or rejected,
// with an array of objects that each describe the outcome of each promise.
// It is typically used when you have multiple asynchronous tasks that are not dependent on one another to complete successfully,
// or you'd always like to know the result of each promise.
Promise.allSettled([p1, p2, p3])
  .then((res) => {
    console.log("result from promise.allsetteled", res);
  })
  .catch((err) => {
    console.error("error from promise.allsetteled", err);
  });
// Output:
// result from promise.allsetteled [
//   { status: 'fulfilled', value: 'Promise 1 is resolved' },
//   { status: 'rejected', reason: 'Promise 2 is rejected' },
//   { status: 'fulfilled', value: 'Promise 3 is resolved' }
// ]

//-----------------------------------------------------------------------------------------------

// Promise.race() method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects,
// with the value or reason from that promise.
// It settles as soon as one of the promises settles, and it settles with the value or reason of the first promise that settles.
// If the iterable passed is empty, the promise returned will be forever pending.
Promise.race([p1, p2, p3])
  .then((res) => {
    console.log("response from promise.race", res);
  })
  .catch((err) => {
    console.error("error from promise.race", err);
  });
// Output:
// error from promise.race Promise 2 is rejected
// Promise 2 is rejected because it is the first promise that rejects.

//-----------------------------------------------------------------------------------------------

// Promise.any() method takes an iterable of Promise objects and, as soon as one of the promises in the iterable fulfills,
// returns a single promise that resolves with the value from that promise.
//returns the first success promise , here p2 is rejectred , but i t will wait for the other promises to get success here
// p3 is success so it will return the p3 promise

//Imp if all the promise failes in promise.any it will return the aggergate error
// output : AggregateError: All promises were rejected
//if we wanted to print the error when all are rejected , by doing console.error("error",err) we wont get them
//to print the error we need to use console.error("error",err.errors)....this will print all the errors.

Promise.any([p1, p2, p3])
  .then((res) => {
    console.log("response from promise.any", res);
  })
  .catch((err) => {
    console.error("error from promise.any", err);
  });
// Output:
// response from promise.any Promise 3 is resolved
// Promise 3 is resolved because it is the first promise that fulfills.
