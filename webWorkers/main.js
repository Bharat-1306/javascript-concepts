document.addEventListener('DOMContentLoaded', () => {
    const myworker = new Worker('worker.js');
    const background = document.getElementById('background');
    const sum = document.getElementById('sumcal');
    background.addEventListener('click' , () => {
    if(document.body.style.backgroundColor !== 'red') {
        document.body.style.backgroundColor = 'red';
       
    } else {
        document.body.style.backgroundColor = 'blue';
    }
    })

    sum.addEventListener('click', () => {
        myworker.postMessage(1000000000);
        //all these calculations moving to the worker
        // let Total = 0;
        // for(i=0 ; i<1000000000 ; i++){
        //     Total += i;
        // }
        // alert(`The sum is ${Total}`);
    })

    //need to listen to the message event sent from the worker

    myworker.onmessage = function (message) {
        console.log("received val",message);
        alert(`The sum is ${message.data}`);
    }
    
})
//as sum is having the huge calculation it will block the main thread and the background color will not change until the sum is calculated
// so we will use web worker to do the calculation in background
// so we will create a web worker

// worker is a window object we can check in some browser it may not happen (window.worker)