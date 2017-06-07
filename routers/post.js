const Router = require('koa-router');

const router = new Router({
    prefix: '/post'
});

router.get('/:postId', async function(ctx) {
    await ctx.render('post');
});

module.exports = router;
