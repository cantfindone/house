const mg = require('../mg');
var mongo = require('mongodb');
const filer = require('../filer');
const img_base ='./img/';
const page_size=2
module.exports = {
    'GET /house/new': async (ctx, next) => {
        ctx.render('house_new.html', {
            title: '房产录入',
			tel:ctx.cookies.get('user')
        });
    },
	'GET /house/list/:page/:count': async (ctx, next) => {
		let count= ctx.params.count;
		if(count<1){
		count = await mg.count('House',{'status':1});
		}
		let page_total=Math.ceil(count/page_size);
		let page= ctx.params.page;
		page=Math.min(page,page_total);
		page=Math.max(page,1);
		let houses = await mg.find('House',{'status':1},(page-1)*page_size,page_size);
		let user= await mg.find('User',{_id:ctx.cookies.get('user')});
		user=user[0];
		for ( let h of houses){
			h.photo= await filer.getPhoto(img_base,h._id)
			h.favorite= user.favorite? user.favorite.includes(h._id.toString()):false; 
			console.log('h.favorite:'+h.favorite)
		}
		//console.log('find houses:'+JSON.stringify(houses));
        ctx.render('houses.html', {
            houses:houses,
			count:count,
			page_total:page_total,
			page_current:page,
			pre:'/house/list/'+(page-1)+'/'+count,
			nex:'/house/list/'+(page+1)+'/'+count
        });
    },
	
	'GET /house/list/:tel/:page/:count': async (ctx, next) => {
		let count= ctx.params.count;
		if(count<1){
		count = await mg.count('House',{user:ctx.params.tel});
		}
		let page_total=Math.ceil(count/page_size);
		let page= ctx.params.page;
		page=Math.min(page,page_total);
		page=Math.max(page,1);
		let houses = await mg.find('House',{user:ctx.params.tel},(page-1)*page_size,page_size);
		let user= await mg.find('User',{_id:ctx.params.tel});
		user=user[0];
		for ( let h of houses){
			h.photo= await filer.getPhoto(img_base,h._id)
			h.favorite= user.favorite? user.favorite.includes(h._id.toString()):false; 
			console.log('h.favorite:'+h.favorite)
		}
		//console.log('find houses:'+JSON.stringify(houses));
        ctx.render('houses.html', {
            houses:houses,
			count:count,
			page_total:page_total,
			page_current:page,
			pre:'/house/list/'+ctx.params.tel+'/'+(page-1)+'/'+count,
			nex:'/house/list/'+ctx.params.tel+'/'+(page+1)+'/'+count
        });
    },
	
	'GET /house/favorite/:tel/:page/:count': async (ctx, next) => {
		//console.log('params: '+JSON.stringify(ctx.request));
		var tel = ctx.params.tel ;
		let user= await mg.find('User',{_id:tel});
		let ids=user[0].favorite
		ids = ids.map((x)=> new mongo.ObjectID(x));
		console.log('get house by: '+ids+ ids[0]);
		
		let count= ctx.params.count;
		if(count<1){
		count = await mg.count('House',{'_id':{$in : ids}});
		}
		let page_total=Math.ceil(count/page_size);
		let page= ctx.params.page;
		page=Math.min(page,page_total);
		page=Math.max(page,1);
		let houses = await mg.find('House',{'_id':{$in : ids}},(page-1)*page_size,page_size);
		
		for ( let h of houses){
			h.photo= await filer.getPhoto(img_base,h._id)
			h.favorite= true;			
		}
		ctx.render('houses.html', {
            houses:houses,
			count:count,
			page_total:page_total,
			page_current:page,
			pre:'/house/favorite/'+ctx.params.tel+'/'+(page-1)+'/'+count,
			nex:'/house/favorite/'+ctx.params.tel+'/'+(page+1)+'/'+count
        });
    },
	
	'GET /house/search/:q/:page/:count': async (ctx, next) => {
		let community= ctx.params.q,
			query={};
		if(community)
			query={$and: [{'community':new RegExp(community)},{'status':1}]};
		
		let count= ctx.params.count;
		if(count<1){
		count = await mg.count('House',query);
		}
		let page_total=Math.ceil(count/page_size);
		let page= ctx.params.page;
		page=Math.min(page,page_total);
		page=Math.max(page,1);
		let houses = await mg.find('House',query,(page-1)*page_size,page_size);
		
		//console.log(`query ${JSON.stringify(query)}`);
		let user= await mg.find('User',{_id:ctx.cookies.get('user')});
		user=user[0];
		for ( let h of houses){
			h.photo= await filer.getPhoto(img_base,h._id)
			h.favorite= user.favorite? user.favorite.includes(h._id.toString()):false; 
			console.log('h.favorite:'+h.favorite)
		}
		//console.log('find houses:'+JSON.stringify(houses));
        ctx.render('houses.html', {
            houses:houses,
			q:community,			
			count:count,
			page_total:page_total,
			page_current:page,
			pre:'/house/search/'+ctx.params.q+'/'+(page-1)+'/'+count,
			nex:'/house/search/'+ctx.params.q+'/'+(page+1)+'/'+count
        });
    },
	
	'GET /house/house/:_id': async (ctx, next) => {
		//console.log('params: '+JSON.stringify(ctx.request));
		var _id = ctx.params._id ;
		console.log('get house: '+_id);
		let house = await mg.find('House',{'_id':new mongo.ObjectID(_id)});
		house=house[0];
		house.photo= await filer.getPhoto(img_base, _id);		
		//console.log('find houses:'+JSON.stringify(houses));
        ctx.render('house.html', {
            h:house
        });
    },
	'POST /house/save': async (ctx, next) => {
        var body = ctx.request.body;
        body.user= ctx.cookies.get('user');
		body.cTime= new Date().getTime();
			
        console.log('body:'+JSON.stringify(body));
		var res= await mg.insertOne('House',body);
		console.log('body:'+JSON.stringify(body));
		console.log('res:'+res);
		console.log('res:'+JSON.stringify(res))
        ctx.render('img_new.html', {
            title: '上传图片',
            _id: body._id
        });
       
    },
	'POST /house/img/save': async (ctx, next) => {
        var
            path=_id = ctx.request.body._id ,
            imgs = ctx.request.body.img;
		//console.log('request body:'+ imgs);
		console.log('imgs.length:'+imgs.length);
		
		if(imgs.length>0){
			path=img_base+path;
			try{
				filer.exists(path);
			}catch(e)
			{
				console.log('path:'+path);
				filer.mds(path);
			}
			
			for(let i of imgs){
				console.log('saving img: '+path+'/'+new Date().getTime()+'.jpg');
				filer.write(path+'/'+new Date().getTime()+'.jpg',i);
			}	
			
		}
		ctx.response.redirect('/house/list/'+ctx.cookies.get('user')+'/0/0')
		/*
        ctx.response.type = 'application/json';
        // 设置Response Body:
		ctx.response.body = {'res': 'true'};
		*/
		/*ctx.render('house.html', {
                title: '房产详情',
                img: imgs[0]
            });
		*/
	}
};
