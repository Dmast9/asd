// 猴子吃桃子问题
function a(n){
  if(n==1)return 1
  return (a(n-1)+2)*2
}
var total=a(10)
console.log(total);
// 
