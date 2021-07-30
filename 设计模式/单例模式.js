/**
 * 1111111
 */
// var single =(function(){
//   let instance
//   console.log('instance');
//   console.log(instance);

//   function Constructor(){

//   }
//   function getInstance(){
//     if(!instance){
//       instance=new Constructor()
//     }
//     return instance
//   }
//   return {getInstance}
// })()

// var a = single.getInstance()
// var b = single.getInstance()
// var c = single.getInstance()
// console.log(a===b);


/**
 * 22222
 */
// var single =(function(){
//   function Constructor(){

//   }
//   Constructor.getInstance=function(){
//     if(!this.instance){
//       this.instance=new Constructor()
//     }
//     return this.instance
//   }
//   // return {getInstance}
// })()
// var a = single.getInstance()
// var b = single.getInstance()
// console.log(a===b);

/**
 * 333333
 */

function SetManager(name) {
  this.manager = name;
}

SetManager.prototype.getName = function () {
  console.log(this.manager);
};

var SingletonSetManager = (function () {
  var manager = null;

  return function (name) {
    if (!manager) {
      manager = new SetManager(name);
    }

    return manager;
  }
})();

// SingletonSetManager('a').getName(); // a
// SingletonSetManager('b').getName(); // a
// SingletonSetManager('c').getName(); // a

function getSingleton(fn) {
  var instance = null;
  console.log('this1111');
  console.log(this);

  return function () {
    if (!instance) {
      console.log('this222222');
      console.log(this);
      instance = fn.apply(this, arguments);
    }

    return instance;
  }
}
// 获取单例
var managerSingleton = getSingleton(function (name) {
  var manager = new SetManager(name);
  return manager;
});

managerSingleton('a').getName(); // a
managerSingleton('b').getName(); // a
managerSingleton('c').getName(); // a