self.onmessage = function (message) {
    console.log(message);
  let Total = 0;
  for (i = 0; i < message.data; i++) {
    Total += i;
  }
  //send the result back 
    self.postMessage(Total);
};
