'use strict';
module.exports = app => {
    app.beforeStart(async function() {
        await app.model.sync({force:true});  // cover data or not
    });
};