// index:


var sha1 = require('sha1');
 
var config = {
  wechat:{
    appID:'wx97e2bad23693131d', //填写你自己的appID
    appSecret:'b62ef8b1881bf202cc5b6a0553eb5ae9', //填写你自己的appSecret
    token:'987654321' //填写你自己的token
  }
};
 

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: 'Welcome',
			tel:13818180000
        });
    },
	
	'GET /wx': async (ctx, next) => {
		console.log('body: '+JSON.stringify(ctx.query));
		var token = config.wechat.token;
		var signature = ctx.query.signature;
		var nonce = ctx.query.nonce;
		var timestamp = ctx.query.timestamp;
		var echostr = ctx.query.echostr;
		var str = [token,timestamp,nonce].sort().join(''); //按字典排序，拼接字符串
		var sha = sha1(str); //加密
        //ctx.response.type = 'application/json';
		// 设置Response Body:
		ctx.response.body = (sha === signature)? echostr + '' : 'failed'; //比较并返回结果
    }
};
