function Router(){
  //路由目录
  this.routes = {};
  //当前url地址
  this.currentUrl = '';
  this.init();
}
//添加路由规则
Router.prototype.route = function(path, cb){
  //存储path对应的回调函数
  this.routes[path] = cb || function(){};
}
//路由刷新
Router.prototype.refresh = function(){
  //获取当前url的hash值
  this.currentUrl = location.hash.slice(1) || '/';
  console.log(this, this.currentUrl)
  //执行当前路由回调函数
  this.routes[this.currentUrl] && this.routes[this.currentUrl]();
}
//窗口监视
Router.prototype.init = function(){
  //窗口监视hash变化事件，从而自动触发该路由规则
  window.addEventListener('load', this.refresh.bind(this), false);
  window.addEventListener('hashchange', this.refresh.bind(this), false);
}
