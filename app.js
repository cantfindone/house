const Koa = require('koa');
const https = require('https');
const fs = require('fs');
const bodyParser = require('koa-bodyparser');
const xml = require('koa-xml');
const xmlParser = require('koa-xml-body');



const controller = require('./controller');

const templating = require('./templating');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    var
        start = new Date().getTime(),
        execTime;
	if(!ctx.cookies.get('user')&&!(ctx.request.url=='/'||ctx.request.url=='/signin'||ctx.request.url=='/reg'||ctx.request.url.startsWith('/wx')||ctx.request.url.startsWith('/api/'))){
		console.log(`check ${ctx.cookies.get('user')},${ctx.request.url=="/signin"} ,${ctx.request.url=="/"}`);
		return ctx.response.redirect('/');
		 
	}
	//if(ctx.request.url.startsWith('/wx')){ctx.disableBodyParser = true;}
    await next();
    execTime = new Date().getTime() - start;
    //ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

const options = {
  normalize: true,
  firstCharLowerCase: true,
  explicitArray: false,
  ignoreAttrs: true
}

/*
app.use(xmlParser({
    limit: 128,
    encoding: 'utf8', // lib will detect it from `content-type`
    xmlOptions: {
        explicitArray: false
    },
    onerror: (err, ctx) => {
        ctx.throw(err.status, err.message);
    }
}));
*/
//app.use(xml(options))
app.use(xmlParser());
app.use(bodyParser());
// parse request body:

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
app.use(controller());

app.listen(80);

var ssl = {
    key: fs.readFileSync('./ssl/server.key'),  //ssl文件路径
    cert: fs.readFileSync('./ssl/server.pem')  //ssl文件路径
};
https.createServer(ssl, app.callback()).listen(443);
console.log('app started at port 80...');
