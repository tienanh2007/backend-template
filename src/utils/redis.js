/**
 * Created by Bookmark on 5/17/17.
 */

const env = process.env.NODE_ENV || 'development';
const link = `../configs/${env}`;
const redisConfig = require(link).redisConnection;
const Redis = require('ioredis');
const event = require('ioredis-eventemitter');

const pubsub = event({
    port: 6379,
    host: '127.0.0.1'
    // prefix: 'production:',
    // password: 'mypassword'
    // in case you want to control Redis clients
    // creation you can specify pub/sub clients pair:
    // pub: pubClient,
    // sub: subClient
});


const redis = new Redis(redisConfig);

exports.getKeyTagNamePost = function getKeyTagNamePost(tagName) {
    return `t:${tagName}:p`;
};

exports.getKeyUserPost = function getKeyUserPost(userId) {
    return `u:${userId}:p`;
};

exports.getKeyPost = function getKeyPost(postId) {
    return `p:${postId}`;
};

exports.getPostVoted = function getPostVoted(postId) {
    return `p:${postId}:v`;
};

exports.getPostComment = function getPostComment(postId) {
    return `p:${postId}:c`;
};

exports.getCommentId = function getCommentId(commentId) {
    return `p:${commentId}:c`;
};

exports.getUserTag = function getUserTag(userId) {
    return `u:${userId}:t`;
};

exports.getTagUser = function getTagUser(tagName) {
    return `t:${tagName}:u`;
};

exports.getUserFeed = function getUserFeed(userId) {
    return `u:${userId}:f`;
};

exports.redis = redis;
exports.pubsub = pubsub;
