'use strict';

const Subscription = require('egg').Subscription;

class MessageConsumer extends Subscription {
    async subscribe(message) {
        console.log('Please consume this message', message);
        this.app.model.models.People.create({id:message.value,name:'new guest'});
    }
}
module.exports = MessageConsumer;