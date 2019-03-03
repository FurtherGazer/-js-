function test(a) {
    var _a = { func: function () { console.log(234); } };
    if (a.func) {
        _a.func = a.func;
    }
    _a.func();
}
var ab = { func: function () { return console.log(123); } };
var db = {};
test(db);
