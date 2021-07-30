function Person(name){
  this.name=name
}
Person.say=function(){
  if(!this.instance){
    this.instance=new Person('Dmast')
  }
  console.log('军师你好');
  // 这个this指代Person这个构造函数
  console.log(this);
  return this.instance
   
}
Person.prototype.do=function(){
  console.log('军师爱打篮球');
  console.log(this);
  
}
let asd=new Person('Dmast')
Person.say()
asd.do()