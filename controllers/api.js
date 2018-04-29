const mg = require('../mg');
var mongo = require('mongodb');
const fields = require('../fields');
const filer = require('../filer');
const img_base ='./img/';
const page_size=2
module.exports = {
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
		var size=ctx.query.size||10;
		var query={}
		for (attr in ctx.query){
			if(attr in['start','size']){
				continue;
			}
			query[attr]=ctx.query[attr];
		}

		let res = await mg.find( ctx.params.clss,query,start,size);
		console.log('res:'+res);
		console.log('res:'+JSON.stringify(res))

		ctx.response.type = 'application/json';
		// 设置Response Body:
		ctx.response.body = res;
        
        
	}

};
