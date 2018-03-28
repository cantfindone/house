var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/www';    
var dbName = 'www';

var insertData = function(db, callback) {  
    //连接到表  
    var collection = db.collection('House');
    //插入数据
    var data = [{"name":'wilson001',"age":21},{"name":'wilson002',"age":22}];
    collection.insert(data, function(err, result) { 
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    });
}

MongoClient.connect(DB_CONN_STR, function(err, client) {
    console.log("连接成功！");
	var db = client.db(dbName);
    insertData(db, function(result) {
        console.log(result);
        client.close();
    });
});