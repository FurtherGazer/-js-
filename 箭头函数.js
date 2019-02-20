// 箭头函数的第一种
var a = x => x*x;
console.log(a(3))

// 箭头函数的第二种，没有{...}和 return。
var b = x => {
    if (x>0){
        return x*x
    }else{
        return x
    }
};
console.log(b(4));


// 多个函数
var c = (x,y) => x*y + y*y;
// () => 999
console.log(c(3,4));

// 可变参数
var d = (x,y,...rest) =>{
    var i,sum = x+y;
    for (i=0;i<rest.length;i++){
        console.log(rest[i]);
    }
    return sum;
}
console.log(d(3,4,[5,6,7]))

// 与匿名函数不同，this 指向词法作用域，也就是外层调用者的obj.
