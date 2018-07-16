'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/postTicket', controller.ticket.getIndex);
    router.post('/postTicket', controller.ticket.getIndex);
};
