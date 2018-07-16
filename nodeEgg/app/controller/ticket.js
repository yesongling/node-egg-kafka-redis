"use strict";

const Controller = require('egg').Controller;

class PostTicketController extends Controller{

    async getIndex(){
        const {ctx,app} = this;
        ctx.service.service.requestHandler()
    }
}

module.exports = PostTicketController;