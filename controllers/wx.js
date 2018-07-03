// index:

const wechat  = require('../wx/wechat'), 

sha1 = require('sha1');
 
var config = {
    appID:'wx97e2bad23693131d', //填写你自己的appID
    appSecret:'b62ef8b1881bf202cc5b6a0553eb5ae9', //填写你自己的appSecret
    token:'987654321',//填写你自己的token
	encodingAESKey:"afPsLj0rV0yGBtZRyWpGWTGFgsrvI40XBCZrnwUURFk",
    apiDomain:"https://api.weixin.qq.com/",
    apiURL:{
        accessTokenApi:"%scgi-bin/token?grant_type=client_credential&appid=%s&secret=%s",
        createMenu:"%scgi-bin/menu/create?access_token=%s"
    }
};

var wechatApp = new wechat(config); //实例wechat 模块

console.log('instanciate wechatapp....:'+ wechatApp) ;

module.exports = {
	'GET /wx': async (ctx, next) => {
		console.log('body: '+JSON.stringify(ctx.query));
		var token = config.token;
		var signature = ctx.query.signature;
		var nonce = ctx.query.nonce;
		var timestamp = ctx.query.timestamp;
		var echostr = ctx.query.echostr;
		var str = [token,timestamp,nonce].sort().join(''); //按字典排序，拼接字符串
		var sha = sha1(str); //加密
        //ctx.response.type = 'application/json';
		// 设置Response Body:
		ctx.response.body = (sha === signature)? echostr + '' : 'failed'; //比较并返回结果
    },
	
	'POST /wx': async (ctx, next) => {
		console.log('body: '+JSON.stringify(ctx.request));
		console.log('body: '+ctx.request.body);
		console.log('body: '+JSON.stringify(ctx.request.body));
		wechatApp.handleMsg(ctx);
		//ctx.response.body=ctx.request.body
    },
	
	'GET /wx/tk': async (ctx, next) => {
		console.log('body: '+JSON.stringify(ctx.query));
		var tk= await wechatApp.getAccessToken();
		ctx.response.body=tk;
    }
};
