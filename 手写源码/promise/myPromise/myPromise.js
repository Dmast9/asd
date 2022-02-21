/**
 * @promise三种状态
 * @pending
 * @fulfilled
 * @rejected
*/
let pending = 'pending'
let fulfilled = 'fulfilled'
let rejected = 'rejected'
class MyPromise {
  constructor(handle) {
    this.state = pending
    this.result = undefined
    // 保证单个的promise实例,可以非链式多次调用then,需要用数组存储起每一次的relove,reject
    this.resolveQue = []
    this.rejectQue = []
    handle(this._resolve.bind(this), this._reject.bind(this))
  }
  _resolve(val) {
    if(this.state!==pending)return
    this.state = fulfilled
    this.result = val
    // promise是微任务，用mutationObserver，不能用settimeout(宏任务)
    let observer = new MutationObserver(() => {
      let cb
      // while的条件为undefined时终止循环
      while (cb = this.resolveQue.shift()) {
        cb(this.result)
      }
    })
    let config = { attributes: true }
    observer.observe(document.body, config)
    document.body.setAttribute('name', 'Dmast')
  }
  _reject(val) {
    if(this.state!==pending)return
    this.state = rejected
    this.result = val
    let observer = new MutationObserver(() => {
      let cb
      while (cb = this.rejectQue.shift()) {
        cb(this.result)
      }
    })
    let config = { attributes: true }
    observer.observe(document.body, config)
    // 主动触发observer.observe,没有实际意义
    document.body.setAttribute('name', 'Dmast')
  }
  then(onResolved, onRejected) {
    return new MyPromise((resolve, reject) => {
      let resolveFn = (val) => {
        if(typeof onResolved !=='function'){
          //如果onResolved不是函数，直接返回上一层的函数
          return resolve(val)
        }
        let result=onResolved(val)
        if (result instanceof MyPromise) {
          result.then(res => {
            resolve(res)
          })
        } else {
          resolve(result)
        }
      }
      let rejectFn = (val) => {
        if(typeof onRejected !=='function'){
          //如果onRejected不是函数，直接返回上一层的函数
          return reject(val)
        }
        let result=onRejected(val)
        if (result instanceof MyPromise) {
          result.then(res => {resolve(res)},err=>{reject(err)})
        } else {
          resolve(result)
        }
      }
      this.resolveQue.push(resolveFn)
      this.rejectQue.push(rejectFn)
    })
  }
  catch(cb){
    return this.then(undefined,cb)
  }
  static resolve(val){
    return new MyPromise(res=>{res(val)})
  }
  static reject(val){
    return new MyPromise('',rej=>{rej(val)})
  }
  static all(list){
    return new Promise((resolve,reject)=>{
      let arr=[]
      console.log(list);
      list.forEach(p=>{
        p.then(res=>{
          arr.push(res)
          if(arr.length==list.length){
            resolve(arr)
          }
        },err=>{
          reject(err)
        })
      })
    })
  }
  static race(list){
    return new Promise((resolve,reject)=>{
      list.forEach(p=>{
        p.then(res=>{
         resolve(res)
        },err=>{
          reject(err)
        })
      })
    })
  }
}