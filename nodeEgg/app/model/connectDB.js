'use strict';
module.exports = app => {
    app.beforeStart(async function() {
        await app.model.sync({force:true});  // cover data or not
        // redis service
        let redisClient = app.redis;
        redisClient.on("error", function (err) {
            console.log("Error " + err);
            redisClient.end(true);
        });
        redisClient.set('counter',100);
        redisClient.watch('counter');
    });
};