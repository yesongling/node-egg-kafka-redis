const Service = require('egg').Service;

class newService extends Service {

    async getPeople() {
        // const counter = await this.ctx.mysql.query('select test from test;');
        const peo = await this.app.model.models.People.findAndCountAll();
        return peo;
    }

    async setPeople(val){
        this.app.model.models.People.create({id:val,name:'new guest'});
    }

}

module.exports = newService;