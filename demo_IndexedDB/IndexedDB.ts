// 定义一个数据库对象
class ClassIndexedDB {
    _dbName: string; // 数据库表
    _DB: any; // 数据库对象
    _version: number; // 数据库版本
    _storesName: any[]; // 数据库 ObjectStore
    _N:object = function(){};
    // 初始化的时候传入数据库名 & 表名，完成数据库的初始化
    constructor(dbName:string, storesName: string[]){
        this._dbName = dbName;
        this._storesName = storesName;
        this._DB = {
            name: this._dbName,
            version: 1,
            db: null
        };
    }
    // 打卡数据库
    // 联合类型 number | null
    // 因为新建数据库的时候不需要 version，这块应该选择使用可选类型 version? 标识这个函数可选
    openDB(version?: number){
        if(typeof version == 'undefined'){
            if(this._version){
                var version = this._version;
            }else{
                var version = version || 1;
                this._version = version;
            }
        }
        var openDB_DB = this._DB;
        var openDB_stores = this._storesName;
        var request = window.indexedDB.open(this._dbName, version);
        request.onerror = function (e) {
            console.log(e.currentTarget.error.message);
            console.log('openDB Error!')
        };
        request.onsuccess = function (e) {
            openDB_DB.db = e.target.result;
            console.log('openDB Success!');
        };
        // 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件
        // 通常新建数据库以后，第一件事就是新建对象仓库（表）
        request.onupgradeneeded = function (e) {
            var db = e.target.result;
            for(let i in openDB_stores){
                if (!db.objectStoreNames.contains(openDB_stores[i])) {
                    var store = db.createObjectStore(openDB_stores[i], { autoIncrement: true });
                }
            }
            console.log('DB version changed to ' + version);
        };
    }
    // 关闭数据库
    closeDB(){
        this._DB.db.close();
    }
    // 删除数据库 - 删除数据库后，IndexedDB 中相应的数据库消失，但是会保留 a 对象中的数据
    deleteDB(){
        indexedDB.deleteDatabase(this._dbName);
    }
    // 添加数据
    addData(storeName: string, addObject: any){
        if(typeof storeName == 'undefined' || typeof addObject == 'undefined'){
            console.error('addData Error! storeName&addObject is necessary!');
            return false;
        }
        let db = this._DB.db;
        let stores = [];
        // push 返回值 - 把指定的值添加到数组后的新长度；
        stores.push(storeName);
        // console.log(stores, storeName);
        let request = db.transaction(stores, 'readwrite')
            .objectStore(storeName)
            .add(addObject);
        request.onsuccess = function (event) {
            console.log('addData Success!');
        };
        request.onerror = function (event) {
            console.log('addData Error!');
        };
    }
    // 读取数据 - 读取指定表中的数据
    getData(storeName: string, key: number, outData?:any){
        if(typeof storeName == 'undefined' || typeof key == 'undefined' ){
            console.error('readData Error! storeName&key is necessary!');
            return false;
        }
        var outData = outData || new Array();
        let db = this._DB.db;
        let stores = [];
        stores.push(storeName);
        let request = db.transaction(stores, 'readonly')
            .objectStore(storeName)
            .get(key);
        let _key = key;
        let _kV = {};
        request.onerror = function(event) {
            console.log('getData Error!');
        };
        request.onsuccess = function(event) {
            if (request.result) {
                console.log('request: ' + request.result);
                // 直接返回 result 会导致失败,必须得用一个承接数组来动态获取传值
                // return request.result
                _kV[_key] = request.result;
                outData.push(_kV);
                
            }else{
                console.log('not Found the key of ',key);
                return null
            }
        };
        return outData;
    }
    // 遍历数据
    readAllData(storeName: string, outDataArray?){
        if(typeof storeName == 'undefined'){
            console.error('readData Error! storeName is necessary!');
            return false;
        }
        var outDataArray = outDataArray || new Array();
        let db = this._DB.db;
        let stores = [];
        stores.push(storeName);
        let objectStore = db.transaction(stores, 'readonly')
            .objectStore(storeName);
        // openCursor 也是一个异步操作
        objectStore.openCursor().onsuccess = function (event) {
            let cursor = event.target.result;
            if (cursor) {
                let _key = cursor.key, _value = cursor.value;
                let _kV = {};
                _kV[_key] = _value;
                console.log('key: ' + _key);
                console.log('value: ' + _value);
                outDataArray.push(_kV);
                cursor.continue();
            }else{
                console.log('Finished, no more data!');
            }
        };
        return outDataArray;
    }
    // 更新数据 - updateDate 几乎可以拿来当 add 用
    updateData(storeName: string, key:number, value:any){
        if(typeof storeName == 'undefined' || typeof value == 'undefined' || typeof key == 'undefined'){
            console.error('readData Error! storeName&value&key is necessary!');
            return false;
        }
        let db = this._DB.db;
        let stores = [];
        stores.push(storeName);
        let request = db.transaction(stores, 'readwrite')
            .objectStore(storeName)
            .put(value,key);
        request.onsuccess = function(event){
            console.log('updateData Success!')
        }
        request.onerror = function(event){
            console.log('updateData Error!');
        }
    }
    // 删除数据 - 由于 W3C 中注明 delete() 返回值为 undefined. 所以需要先执行 get 当 get 到相关值的时候
    // 再执行删除,并返回删除的值.
    deleteData(storeName: string, key:number){
        if(typeof storeName == 'undefined' || typeof key == 'undefined'){
            console.error('readData Error! storeName&key is necessary!');
            return false;
        }
        // 这块的问题在于由于是异步的,无法使用这种阻塞式的方式去
        var _getData = this.getData(storeName,key); 
        let db = this._DB.db;
        let stores = [];
        stores.push(storeName);
        let request = db.transaction(stores, 'readwrite')
            .objectStore(storeName)
            .delete(key);
        request.onsuccess = function(event){
            console.log('delete Success!');
        }
        request.onerror = function(event){
            console.log('delete Error!');
        }
        return _getData;
    }
}


function TEST(){
    var _objectDB = new ClassIndexedDB('test',['done','ing','garbge']);
    _objectDB.openDB();
    return _objectDB
}

var a = TEST()
console.log('V0.02')