const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject); //执行器立即执行 --》这个执行器指的是调用promise的回调函数
  }
  status = PENDING;
  value = undefined;
  reason = undefined;
  successCallBack = [];
  failCallBack = [];
  resolve = (value) => {
    if (this.status !== PENDING) return;
    this.status = FULFILLED; //更改状态为成功
    this.value = value; //保存成功之后的值
    while (this.successCallBack.length)
      this.successCallBack.shift()(this.value); //存在成功回调则调用
  };
  reject = (reason) => {
    if (this.status !== PENDING) return;
    this.status = REJECTED; //更改状态为失败
    this.reason = reason; //保存失败之后的值
    while (this.failCallBack.length) this.failCallBack.shift()(this.reason); //存在失败回调则调用
  };
  then(successCallBack, failCallBack) {
    let newPromise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        let x = successCallBack(this.value);
        // resolve(x);
        resolvePromise(x, resolve, reject);
      } else if (this.status === REJECTED) {
        failCallBack(this.reason);
      } else {
        //异步情况 暂时储存 需要时再调用
        this.successCallBack.push(successCallBack);
        this.failCallBack.push(failCallBack);
      }
    });
    return newPromise;
  }
}
function resolvePromise(x, resolve, reject) {
  if (x instanceof MyPromise) {
    //promise 对象
    x.then(resolve, reject);
  } else {
    //普通值
    resolve(x);
  }
}
module.exports = MyPromise;
