const myPromise = require("./myPromise.js");
const p = new myPromise((resolve, reject) => {
  resolve("success");
  // reject("fail");
});
p.then(
  (value) => {
    console.log(value);
    return 10;
  },
  (reason) => {
    console.log(reason);
  }
).then((value) => console.log(value));
