// creating the promises
let cart = ["shirt", "pant", "shoes"];

const promise = createOrder(cart); // this function is the part of consuming
console.log("promise status check", promise); // will be in pending as intial state
promise
  .then(function (orderId) {
    console.log("Order placed successfully", orderId);
    return orderId; // return is must , as it will be passed to next then
  })
  .then(function (orderId) {
    //this promise chaining whch helps from callback hell
    return proceedToPayment(orderId);
  })
  .then(function (paymentInfo) {
    console.log("Payment info", paymentInfo);
  })
  .catch(function (err) {
    // this catch block can be return after the then or we can keep at last also ,
    // but better to keep after every then bcs if we are having more chaining it would be easy to track the error
    /**
     * this catch handles all the then above the catch block , if we have ay then block below it cant handle that
     */
    console.log("Order failed", err);
  })
  .then(() => {
    console.log(
      "this would be called even if we have error in the above then blocks"
    );
  });

//let us crea ethe promises here

function createOrder(cart) {
  let pr = new Promise(function (resolve, reject) {
    if (!ValiditeCart(cart)) {
      const error = new Error("Invalid cart");
      reject(error);
      // reject("Cart is empty");
    }
    const someOrderId = "123456789";
    if (someOrderId) {
      resolve(someOrderId);
    }
  });

  return pr;
}

function proceedToPayment(orderId) {
  let paymentPromise = new Promise(function (resolve, reject) {
    if (orderId) {
      resolve("Payment successful");
    } else {
      reject("Payment failed");
    }
  });
  return paymentPromise;
}

function ValiditeCart(cart) {
  return true; // for now
}
