let somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve('Hey, that worked.');
        reject('Unable to fulfill promise');
    }, 2500);
});

somePromise.then((message) => {
    console.log(message);
}, (errorMessage) => {
    console.log('Error: ', errorMessage);
});
