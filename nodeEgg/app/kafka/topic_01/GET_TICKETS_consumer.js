'use strict';

const Subscription = require('egg').Subscription;

class MessageConsumer extends Subscription {
    async subscribe(message) {
        console.log('Please consume this message', JSON.stringify(message.value));
        // console.log('Please consume this message', message.value.toString());
        this.app.model.models.People.create({id:message.offset,name:'new guest'});
    }
}
module.exports = MessageConsumer;