// 模拟 DOMContentLoaded/ jquery ready
function _tmDomReady(callback){
    try{
        if(typeof callback != 'undefined'){
            if(document.readyState === "loading"){
                document.onreadystatechange = function (){
                    if (document.readyState === "interactive"){ 
                        callback()
                    }
                }
            }else if(document.readyState === "interactive" || document.readyState === "complete"){
                callback()
            }
        }
    }catch(err){console.log(err)}
}


// js 原生元素选择器
try{
    document.querySelectorAll('selector').forEach(function(e){
        e.addEventListener('click',function(){
            ga('TrueMetrics.send', 'event', 'ea', 'ec', 'el' + e.getAttribute('class'))
        })
    })
}catch(err){}

// 获取元素属性值
Element.getAttribute('attr');

// 获取节点文本内容
var text = Element.textContent;