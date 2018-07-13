"use strict";

const Controller = require('egg').Controller;
const redis = require('redis');
const mysql = require('mysql2');

let serviceRes = null;
let count = null;
let num = 0;

class PostTicketController extends Controller{

    getBanlance(){
        // console.log('**this.ctx.service**',this.ctx.service.service.getPeople());
        console.log('------------loading mySQL data------------');
        return serviceRes = this.ctx.service.service.getPeople(); // get data from mySQL
    };

    async postData(uid){
        this.ctx.service.service.setPeople(uid);
    }

    async getIndex(){
        const {ctx,app} = this;
        // const redisClient = redis.createClient();
        // const kafka = require('kafka-node');
        // const kafkaClient = new kafka.Client();
        // const Producer = kafka.Producer;
        // const producer = new Producer(kafkaClient,{
        //     requireAcks: 1
        // });
        // const Consumer = kafka.Consumer;
        // const consumer = new Consumer(
        //     kafkaClient,[
        //         {topic:'GET_TICKETS',partition:0}
        //     ],{
        //         autoCommit:true
        //     }
        // );

        if(serviceRes===null){
            serviceRes = await this.getBanlance();
            count = serviceRes.count;
        }

        // count!==null?count++:'';

        // redis service
        let redisClient = app.redis;
        redisClient.on("error", function (err) {
            console.log("Error " + err);
            redisClient.end(true);
        });
        redisClient.watch('counter');

        await redisClient.get("counter",function(err,reply){
            console.log(reply);
            // replyCount = reply;
            if(reply>0&&reply<=100){
                let multi =  redisClient.multi();
                multi.decr('counter');
                multi.exec(function(err,replies){
                    if(!replies){
                        console.log('counter is not initial!');
                        ctx.controller.ticket.getIndex();
                    } else{
                        let payload = [ctx.kafka.message('topic_01','GET_TICKETS',{
                                topic : 'GET_TICKETS',
                                messages : count,
                                partition : 0
                            })
                        ];
                        ctx.kafka.send(payload);
                        ctx.body = 'Get current counts:' + serviceRes.rows;
                    }
                });
            } else{
                // console.log('----------------banlance----------------',await this.getBanlance());
                // let data = this.getBanlance();
                ctx.body = '活动结束，谢谢参与:\n';
                // for(let i in data.rows){
                //     ctx.body += data.rows[i]
                // }
                redisClient.end(true);
            }
        });

                //this.postData();  // post data to mySQL
                // ctx.body = 'Get current counts:'+ replyCount + serviceRes.rows;
                // ctx.body = htmls;
        //     }
        // });

       // consumer.on('message',async function(message){  // on receive message to operate mySQL
       //     // console.log(message.value,++num);
       //     // console.log(ctx.app.controller);
       //     if(message.value == ++num){  //  I do not know why the message event fire times automatically increase, so i just add a condition here
       //         ctx.app.model.models.People.create({id:message.value,name:'new guest'});
       //     }
       //     console.log(message.value,num);
       // });

    }

    // async postIndex(){
    //     const {ctx,app} = this;
    //
    //     if(serviceRes===null){
    //         serviceRes = await this.getBanlance();
    //         count = serviceRes.count;
    //     }
    //
    //     count!==null?count++:'';
    //
    //     const redis = app.redis;
    //     redis.on("error", function (err) {
    //         console.log("Error " + err);
    //     });
    //
    //     let replyCount;
    //
    //     if(count !== null && count <= 100){
    //         await redis.set("counter",count);
    //         await redis.get("counter",function(err,reply){
    //             // console.log(reply);
    //             replyCount = reply;
    //         });
    //
    //         this.postData();
    //         ctx.body = 'Get current counts:'+ replyCount + serviceRes.rows;
    //         // ctx.body = htmls;
    //     } else{
    //         // console.log('----------------banlance----------------',await this.getBanlance());
    //         let data = await this.getBanlance();
    //         ctx.body = '活动结束，谢谢参与:\n';
    //         for(let i in data.rows){
    //             ctx.body += data.rows[i]
    //         }
    //     }
    // }
}

module.exports = PostTicketController;