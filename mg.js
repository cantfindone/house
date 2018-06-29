var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/www';    
var dbName = 'www';
var db =null;
MongoClient.connect(DB_CONN_STR, function (err, dbb) {
    console.log('connected');
    db =dbb.db(dbName);
    //console.timeEnd('connection');// db.close();
}
);
var data = [{"name":'wilson001',"age":21},{"name":'wilson002',"age":22}];

module.exports = {
	insertOne: async (table,data) => {
		var c = db.collection(table);	
		var res = await c.insertOne(data);
		console.log('inserted: '+ res);

		return res;
		
	},
	update: async (table,q,upt) => {
		var c = db.collection(table);
		console.log('about to update : '+JSON.stringify(q)+','+JSON.stringify(upt));
		var res = await c.updateMany(q,upt,{upsert:1});
		console.log('updated: '+ res);

		return res;
		
	},
	find: async (table, data, skip=0,limit=5) => {
		//var client = await MongoClient.connect(DB_CONN_STR);
		//console.log('db:',db);
		var c = db.collection(table);
		return (async () => {
			console.log('table:'+table+' query:'+JSON.stringify(data)+' skip:'+skip+' limit:'+limit);
			var prom1 = c.find(data).skip(skip).limit(limit).toArray();
			var prom2 = c.count(data);
			var res={}
			await Promise.all([prom1,prom2]).then(function(r){console.log("prom1:",r);res.data=r[0];res.size=r[1];})
			console.log('found: '+ res);
			//client.close()
			return res;
		})()
	},
	count: async (table, data) => {
		var c = db.collection(table);
		return (async () => {
			var res = await c.count(data);
			console.log('found: '+ res);

			return res;
		})()
	},
	remove: async (table, data) => {
		var c = db.collection(table);
		return (async () => {
			var res = await c.remove(data);
			console.log('found: '+ res);

			return res;
		})()
	}
};