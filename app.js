const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

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
	if(!ctx.cookies.get('user')&&!(ctx.request.url=='/'||ctx.request.url=='/signin'||ctx.request.url=='/reg'||ctx.request.url=='/wx')){
		console.log(`check ${ctx.cookies.get('user')},${ctx.request.url=="/signin"} ,${ctx.request.url=="/"}`);
		return ctx.response.redirect('/');
		 
	}
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
app.use(controller());

app.listen(80);
console.log('app started at port 80...');
