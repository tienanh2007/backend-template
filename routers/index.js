/**
 * Routes
 */

const Router = require('koa-router');
const post = require('./post');
const Redis = require('../utils/redis').redis;

const Routes = new Router();

Routes.get('/flush', async (ctx) => {
    const result = await Redis.flushdb();
    ctx.setSuccess(result);
});


Routes.use(post.routes(), post.allowedMethods());

module.exports = Routes;
