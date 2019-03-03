interface IndexedObjectStore {
    func?;
}

function test(a: IndexedObjectStore){
    let _a = {func: function(){console.log(234)},}
    if(a.func){
        _a.func = a.func;
    }
    _a.func()
}

let ab = {func: () => console.log(123) };
let db = {};
test(db);
