const mg = require('../mg');
var mongo = require('mongodb');
const fields = require('../fields');
const filer = require('../filer');
const img_base ='./img/';
const page_size=2
module.exports = {
  
	'GET /list/:cls': async (ctx, next) => {
		let cls=ctx.params.cls||'cls'
		let count= ctx.query.count;

		var query={}
		for (attr in ctx.query){
			console.log("attr:",attr);
			if(['page','count'].includes(attr)){
				continue;
			}
			query[attr]=ctx.query[attr];
		}
		console.log("query:",query);

		if(count<1){
		count = await mg.count(cls,query);
		}
		let page_total=Math.ceil(count/page_size);
		let page= ctx.query.page||0;
		page=Math.min(page,page_total);
		page=Math.max(page,1);
		let clses = await mg.find(cls,query,(page-1)*page_size,page_size);
	
		//console.log('find houses:'+JSON.stringify(houses));
        ctx.render('list.html', {
			tel:ctx.cookies.get('user'),
			clses:clses,
			count:count,
			page_total:page_total,
			page_current:page,
			pre:'/list/'+cls+'?page='+(page-1)+'&count='+count,
			nex:'/list/'+cls+'?page='+(page+1)+'&count='+count
        });
    }
	
};
