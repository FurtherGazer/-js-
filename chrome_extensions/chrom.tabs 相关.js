// 获取当前 Tab [object]
function getCurrentTab(callback) {
    chrome.tabs.query({
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
    }, function (tabs) {
        if (tabs && tabs[0]) {
            callback(tabs[0]);
        }
    });
}

getCurrentTab(function(e){
    // e --> Tab 类型
    // e.id / e.url / e.index / e.highlight / e.title / e.status(加载完成与否)
    console.log(e.url)
    // [out] 'www.xxxx.com/xxxx'
})
