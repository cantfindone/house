// index:

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: 'Welcome',
			tel:13818180000
        });
    }
};
