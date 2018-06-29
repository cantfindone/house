const mg = require('../mg');
var mongo = require('mongodb');
const fields = require('../fields');
const filer = require('../filer');
const jwt = require('jsonwebtoken');
const img_base ='./img/';
const page_count=2
module.exports = {
	'POST /auth/signin': async (ctx, next) => {
		var body = ctx.request.body;
		let query= body;
		if(!(query._id && query.password)){
			console.log("exception:",query);
			ctx.throw(300,'用户名和密码不能为空');
		}
        //body.user= ctx.cookies.get('user');
		//body.cTime = new Date().getTime();
			
		console.log('body:'+JSON.stringify(query));

		let user = await mg.find('user',query);
		user=user.data[0]
		console.log('user:'+JSON.stringify(user));
		
		if(user){
			console.log('prv:'+JSON.stringify(user.prv));
			let prev = await mg.find('prv',{_id:user.prv});
			user = {_id:user._id};
			user.asst=prev.data[0].asst;
			user.tk=jwt.sign(user._id,"lunar");
			ctx.response.body = user;
		}else{
			ctx.throw(300,'用户名不存在或密码错误');	
		}
		ctx.response.type = 'application/json';
		// 设置Response Body:
        
        
	},
	'POST /api/reg/admin/': async (ctx, next) => {
        var body = ctx.request.body;
        //body.user= ctx.cookies.get('user');
		body.cTime= new Date().getTime();
		body.prv='2';	
        console.log('body:'+JSON.stringify(body));
		var res= await mg.insertOne('user',body);

		console.log('res:'+res);
		console.log('res:'+JSON.stringify(res))

		ctx.response.type = 'application/json';
		// 设置Response Body:
		ctx.response.body = res;
        
        
	},
	'POST /api/ins/:clss/': async (ctx, next) => {
        var body = ctx.request.body;
        //body.user= ctx.cookies.get('user');
		body.cTime= new Date().getTime();
			
        console.log('body:'+JSON.stringify(body));
		var res= await mg.insertOne(ctx.params.clss,body);
		console.log('body:'+JSON.stringify(body));
		console.log('res:'+res);
		console.log('res:'+JSON.stringify(res))

		ctx.response.type = 'application/json';
		// 设置Response Body:
		ctx.response.body = res;
        
        
	},
	'GET /api/ins/:clss/': async (ctx, next) => {
        //body.user= ctx.cookies.get('user');
		var start=ctx.query.start||0;
		var count=ctx.query.count||10;
		var query={}
		for (attr in ctx.query){
			console.log("attr:",attr);
			if(['start','count'].includes(attr)){
				continue;
			}
			if(attr.substr(0,4)=='reg_'){
				query[attr.substr(4)]=new RegExp(ctx.query[attr]);
			}else{
				query[attr]=ctx.query[attr];
			}
		}
		console.log("query:",query);

		let res = await mg.find( ctx.params.clss,query,parseInt(start),parseInt(count));
		//let size = query._id?1:await mg.count(ctx.params.clss,query);
		//let rs={'size':size,'data':res}
		console.log('res:'+res);
		//console.log('res:'+JSON.stringify(rs))

		ctx.response.type = 'application/json';
		// 设置Response Body:
		ctx.response.body = res;
	},
	'GET /api/ins/:clss/del/:_id/': async (ctx, next) => {
        

		let res = await mg.remove( ctx.params.clss,{_id:ctx.params._id});
		//let size = query._id?1:await mg.count(ctx.params.clss,query);
		//let rs={'size':size,'data':res}
		console.log('res:'+res);
		//console.log('res:'+JSON.stringify(rs))

		ctx.response.type = 'application/json';
		// 设置Response Body:
		ctx.response.body = res;
        
        
	},
	'GET /api/ins/:clss/:_id/': async (ctx, next) => {
        //body.user= ctx.cookies.get('user');
		var query={_id:new mongo.ObjectID(ctx.params._id)}
		let res = await mg.find( ctx.params.clss,query);
		console.log('res:'+res);
		console.log('res:'+JSON.stringify(res))
		ctx.response.type = 'application/json';
		// 设置Response Body:
		ctx.response.body = res[0];
        
        
	}

};
