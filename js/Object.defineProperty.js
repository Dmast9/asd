var obj={}
Object.defineProperty(obj,'name',{
  value:'Dmast',
  enumerable:false,
  writable:true,
  configurable:true
})
/**
 * writable:属性是否可以重写。为true时可以通过直接赋值，也可以重新通过描述符定义,默认false。
 * configurable:true,所有的属性值，都可以通过描述符重新定义，也可以删除delete某个值，为false时不可以。
 * enumberable:true,数据可以枚举，会出现在Object.keys()中，也能出现for...in中，默认为false  
 */
 Object.defineProperty(obj,'name',{
  value:'Dmast',
  enumerable:true,
  writable:true
})


// /**
//  * 存取描述符 get set
//  */
//  var o = {}; // 创建一个新对象

//  // 在对象中添加一个属性与数据描述符的示例
//  Object.defineProperty(o, "a", {
//    value : 37,
//    writable : true,
//    enumerable : true,
//    configurable : true
//  });
 
//  // 对象 o 拥有了属性 a，值为 37
 
//  // 在对象中添加一个设置了存取描述符属性的示例
//  var bValue = 38;
//  Object.defineProperty(o, "b", {
//    // 使用了方法名称缩写（ES2015 特性）
//    // 下面两个缩写等价于：
//    // get : function() { return bValue; },
//    // set : function(newValue) { bValue = newValue; },
//    get() { return bValue; },
//    set(newValue) {bValue = newValue; },
//    enumerable : true,
//    configurable : true
//  });
