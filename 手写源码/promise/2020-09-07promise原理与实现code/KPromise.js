export default class KPromise {
    constructor(handle) {
        this.state = "pending";
        this.result = undefined;
        // handle((val)=>{
        //     // console.log(this);
        //     // resolve
        //     this.state = "fulfilled";
        //     this.result = val;
        // },(val)=>{
        //     // reject
        //     this.state = "rejected";
        //     this.result = val;
        // });
        // this.resolveFn = undefined;
        // this.rejectFn = undefined;
        // [f1,f2,f3...]
        this.resolveFnQueue = [];
        this.rejectFnQueue = [];

        handle(this._resolve.bind(this), this._reject.bind(this));
    }
    _resolve(val) {
        this.state = "fulfilled";
        this.result = val;
        // 执行then里的回调
        // setTimeout(() => {
        //     // this.resolveFn(val);
        //     let cb;
        //     while(cb = this.resolveFnQueue.shift() ){
        //         cb && cb(val);
        //     }
        // }, 0);
        const run = () => {
            let cb;
            while (cb = this.resolveFnQueue.shift()) {
                cb && cb(val);
            }
        }
        const observer = new MutationObserver(run);

        observer.observe(document.body, {
            attributes: true
        })
        document.body.setAttribute("kkb", Math.random());
    }
    _reject(val) {
        // console.log(val)
        this.state = "rejected";
        this.result = val;
        // 执行 then里的回调
        // setTimeout(() => {
        //     // this.rejectFn(val);
        //     let cb;
        //     while(cb = this.rejectFnQueue.shift()){
        //         cb && cb(val);
        //     }
        // }, 0);

        const run = () => {
            let cb;
            while (cb = this.rejectFnQueue.shift()) {
                // console.log(cb);
                cb && cb(val);
            }
        }
        const observer = new MutationObserver(run);

        observer.observe(document.body, {
            attributes: true
        })
        document.body.setAttribute("kkb", Math.random());


    }
    then(onResolved, onRejected) {
        // console.log("then");
        // 判断执行 then里的参数；只能处理同步问题
        // if(this.state==="fulfilled"){
        //     onResolved && onResolved(this.result);
        // }else if(this.state==="rejected"){
        //     onRejected && onRejected(this.result);
        // }
        // 如果是异步 onResolved 及 onRejected 不是立刻执行；
        // 应该是 调取 _resolve 及 reject 在执行；
        // 函数保存；
        // this.resolveFn = onResolved;
        // this.rejectFn = onRejected;
        
        return new KPromise((resolve,reject)=>{
            // 上一个then的执行结果；
            // let res = onResolved();
            // resolve(res);
            let resolveFn = val=>{
                let res = onResolved && onResolved(val);
                // 判断是否是KPromise对象；
                if(res instanceof KPromise){
                // 方式一
                //    return res.then(res=>{
                //         resolve(res);
                //     })
                // 方式二
                    return res.then(resolve);
                }
                resolve(res);
            }

            let rejectFn = val=>{
                onRejected && onRejected(val);
                reject(val);
            }

            this.resolveFnQueue.push(resolveFn);
            this.rejectFnQueue.push(rejectFn);
        })
    }
    catch(cb){
        // console.log(this)
        return this.then(undefined,cb);
    }
    static all(lists){
        return new KPromise(reslove=>{
            let arr = [];
            let num = 0;
            lists.forEach(item=>{
                item.then(res=>{
                    arr.push(res);
                    num++;
                    if(num===lists.length){
                        reslove(arr);   
                    }
                })
            })
        })
    }
    static race(lists){
        return new KPromise((resolve,reject)=>{
            lists.forEach(item=>{
                item.then(res=>{
                    resolve(res);
                },err=>{
                    reject(err); 
                })
            })
        })
    }
    static resolve(val){
        return new KPromise(reslove=>{
            reslove(val)
        })
    }
    static reject(val){
        return new KPromise(undefined, reject=>{
            reject(val);
        })
    }

}