const serve = require('koa-static');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Routes = require('./routers/index');
const views = require('koa-views');



const app = new Koa();

app.use(serve(`${__dirname}/public`));
app.use(views(`${__dirname}/public`, {
    map: {
        html: 'ejs'
    }
}));

const port = 3000;


async function init(ctx, next) {
    ctx.setError = (errorCode) => {
        ctx.body = { s: false, e: errorCode };
    };

    ctx.setSuccess = (data) => {
        ctx.body = { s: true, d: data };
    };

    await next();
}


if (app.env === "development") {
    app.use(async (ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;

        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
}
app.use(bodyParser());
app.use(init);
app.use(Routes.routes(), Routes.allowedMethods());

app.listen(port);

console.log(`ENV: ${app.env} localhost: ${port}`);
