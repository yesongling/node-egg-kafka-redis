const Service = require('egg').Service;

let serviceRes = null;

class newService extends Service {

    async getPeople() {
        // const counter = await this.ctx.mysql.query('select test from test;');
        const peo = await this.app.model.models.People.findAndCountAll();
        return peo;
    }

    async setPeople(val){
        this.app.model.models.People.create({id:val,name:'new guest'});
    }

    getBanlance(){
        // console.log('**this.ctx.service**',this.ctx.service.service.getPeople());
        console.log('------------loading mySQL data------------');
        return this.ctx.service.service.getPeople(); // get data from mySQL
    };

    async postData(uid){
        this.ctx.service.service.setPeople(uid);
    }

    async requestHandler(){
        const {ctx,app} = this;

        if(serviceRes===null){
            serviceRes = await this.getBanlance();
        }
        // console.log(serviceRes);

        let redisClient = app.redis;

        await redisClient.get("counter",function(err,reply){
            if(reply>0&&reply<=100){
                console.log('---------------------------------------',reply);
                let multi =  redisClient.multi();
                multi.decr('counter');
                multi.exec(function(err,replies){

                    if(!replies){
                        console.log('counter is not initial!');
                        ctx.app.controller.ticket.getIndex();
                    } else{
                        let payload = [ctx.kafka.Message('topic_01','GET_TICKETS',{
                            topic : 'GET_TICKETS',
                            // messages : new Buffer.from(count.toString(),'utf8'),
                            messages : {count:reply},
                            partition : 0
                        })
                        ];
                        ctx.kafka.send(payload);
                    }
                });
                ctx.body = 'Get one ticket';
            } else{
                let data = ctx.service.service.getBanlance();
                console.log('ctx',ctx);
                ctx.body = '活动结束，谢谢参与:\n'+data;
                ctx.res=data.toString();
                // redisClient.end(true);
            }
        });
    }
}

module.exports = newService;