var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/www';    
var dbName = 'www';


var data = [{"name":'wilson001',"age":21},{"name":'wilson002',"age":22}];

module.exports = {
	insertOne: async (table,data) => {
		var client = await MongoClient.connect(DB_CONN_STR);
		var c = client.db(dbName).collection(table);
		
		var res = await c.insertOne(data);
		console.log('inserted: '+ res);
		client.close()
		return res;
		
	},
	update: async (table,q,upt) => {
		var client = await MongoClient.connect(DB_CONN_STR);
		var c = client.db(dbName).collection(table);
		console.log('about to update : '+JSON.stringify(q)+','+JSON.stringify(upt));
		var res = await c.updateMany(q,upt,{upsert:1});
		console.log('updated: '+ res);
		client.close()
		return res;
		
	},
	find: async (table, data, skip=0,limit=5) => {
		var client = await MongoClient.connect(DB_CONN_STR);
		var c = client.db(dbName).collection(table);
		return (async () => {
			console.log('table:'+table+' query:'+JSON.stringify(data)+' skip:'+skip+' limit:'+limit);
			var res = await c.find(data).skip(skip).limit(limit).toArray();
			console.log('found: '+ res);
			client.close()
			return res;
		})()
	},
	count: async (table, data) => {
		var client = await MongoClient.connect(DB_CONN_STR);
		var c = client.db(dbName).collection(table);
		return (async () => {
			var res = await c.count(data);
			console.log('found: '+ res);
			client.close()
			return res;
		})()
	}		
};