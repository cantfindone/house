const Koa = require('koa');
const https = require('https');
const fs = require('fs');
const bodyParser = require('koa-bodyparser');
const xml = require('koa-xml');
const xmlParser = require('koa-xml-body');
const koajwt = require('koa-jwt');
const serve = require('koa-static');
const path =require('path');
const controller = require('./controller');

const templating = require('./templating');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    console.log('begin:',ctx.header,ctx.header.authorization)
    var
    start = new Date().getTime(),
    execTime;
	// if(!ctx.cookies.get('user')&&!(ctx.request.url=='/'||ctx.request.url=='/signin'||ctx.request.url=='/reg'||ctx.request.url.startsWith('/wx')||ctx.request.url.startsWith('/api/')||ctx.request.url.startsWith('/admin/'))){
        // 	console.log(`check ${ctx.cookies.get('user')},${ctx.request.url=="/signin"} ,${ctx.request.url=="/"}`);
        // 	return ctx.response.redirect('/');
        
        // }
        //if(ctx.request.url.startsWith('/wx')){ctx.disableBodyParser = true;}
        await next();
        console.log('end:',ctx.header,ctx.header.authorization)
    execTime = new Date().getTime() - start;
    console.log("excecution time:",execTime);
    //ctx.response.set('X-Response-Time', `${execTime}ms`);
});
app.use(serve(path.resolve('dist')));
app.use(koajwt({ secret: 'lunar' }).unless({ path: [/\/wx/,/\/auth/,'/'] }));

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
       // ctx.status = 200;
        console.log('error caught:',err.status,err.message)
        ctx.body = err.message
        ctx.app.emit('error', err, ctx);
    }
});
  app.on('error', (err, ctx) => {
    /* centralized error handling:
    *   console.log error
    *   write error to log file
    *   save error and request information to database if ctx.request match condition
    *   ...
    */
   console.error(err);
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

app.listen(8888);

// var ssl = {
//     key: fs.readFileSync('./ssl/server.key'),  //ssl文件路径
//     cert: fs.readFileSync('./ssl/server.pem')  //ssl文件路径
// };
//https.createServer(ssl, app.callback()).listen(443);
console.log('app started at port 80...');
