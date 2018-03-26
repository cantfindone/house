const mg = require('../mg');

module.exports = {
    'POST /signin': async (ctx, next) => {
        var query,
            tel = ctx.request.body.tel || '',
            password = ctx.request.body.password || '';
		query = {'_id':tel, 'password':password};
		console.log('query:'+JSON.stringify(query));
		let user= await mg.find('User',query);
        if (user[0]) {
            return ctx.response.redirect('/home');
        } else {
            console.log('signin failed!');
            ctx.render('index.html', {
                title: '登录失败',
				msg:'登录失败，手机号或密码不匹配',
				tel:tel
            });
        }
    },
	
	 'GET /home': async (ctx, next) => {
       
            ctx.render('me.html', {
                tel:ctx.cookies.get('user')
            });
        
    },
	
	'GET /reg': async (ctx, next) => {
       
            ctx.render('register.html', {
                title: '',
                name: 'Mr Node'
            });
       
    },
	
	'POST /reg': async (ctx, next) => {
        var
            tel = ctx.request.body.tel ,
            password = ctx.request.body.password ;
        if (tel && password) {
			let query={'_id':tel};
			let user = await mg.find('User',query)
			if (user[0]) {
				console.log('手机号已被注册!');
				ctx.render('reg.html', {
					title: '手机号已被注册',
					msg:'注册失败,手机号已被注册',
					tel:tel
				});
				return;
			}
			user={'_id':tel, 'password':password};
			mg.insertOne('User',user);
            console.log('signin ok!');
			ctx.cookies.set('user', tel);
            ctx.render('index.html', {
                tel: tel                
            });
        } else {
            console.log('reg failed!');
            ctx.render('register.html', {
                title: '注册失败',
				msg:'注册失败,手机号或密码为空',
				tel:tel
            });
        }
    },
	
	'POST /favorite': async (ctx, next) => {
        var
            tel = ctx.cookies.get('user') ,
            _id = ctx.request.body._id ,
			favor=ctx.request.body.favor;
        
		console.log('favor:'+favor);
		console.log('_id:'+_id);
		if(favor=='true') {
			await mg.update('User',{'_id':tel},{'$addToSet':{'favorite':_id}});
		}else{
			await mg.update('User',{'_id':tel},{'$pull':{'favorite':_id}});
		}
		
		ctx.response.type = 'application/json';
		// 设置Response Body:
		ctx.response.body = {'favorite': favor};
        /*
			console.log('err:'+JSON.stringify(e)+e);
            ctx.response.type = 'application/json';
			// 设置Response Body:
			ctx.response.body = {'err': 'e'};
			*/
        
    }
};
