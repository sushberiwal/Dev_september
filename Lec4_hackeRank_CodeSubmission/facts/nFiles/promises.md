# Promises

## Promise => initial state => Pending
## Promise => Settle => either resolve() or reject();
## then => sync function => attach scb to promise
## catch => sync function => attach fcb to promise
## then and catch also gives us a pending promise and pendingPromise of then/catch is always in sync with the scb/fcb