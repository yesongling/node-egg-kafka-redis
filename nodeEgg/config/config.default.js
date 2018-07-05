'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1530430712385_1139';

    // add your config here
    config.middleware = [];

    config.redis = {
        client: {
            port: 6379, // Redis port
            host: 'localhost', // Redis host
            password: '',
            db: 0,
        },
        agent: true,
    };

    config.sequelize = {
        dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
        database: 'test',
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: 'root',  // db password
        timezone: '+08:00'
    };

    config.views = {
        defaultViewEngine : 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        }
    };

    // config.kafka = {
    //     host : 'localhost:2181',
    //     sub : [
    //         {
    //             groupId : 'consumer-topic'+ new Date().valueOf(),
    //             topics: [
    //                 'topic1'
    //             ],
    //             'topic1-KEYS': [
    //                 'key1'
    //             ]
    //         }
    //     ],
    //     pub : {
    //         topics : [
    //             'topic1'
    //         ],
    //         requireAcks: 1,
    //         ackTimeoutMs: 1000,
    //         partitionerType: 2,
    //         partition: 0,
    //         attributes: 0
    //     },
    //     env : 'dev',
    //     avroSchema: {
    //         namespace: 'com.ecarx.protocol.model',
    //         type: 'record',
    //         name: 'S2sMessage',
    //         fields: [
    //             { name: 'env', type: 'string', doc: "环境变量,如:'development', 'testing', 'staging', 'production'" },
    //             { name: 'requestId', type: 'string', doc: '请求唯一标识' },
    //             { name: 'sysCode', type: 'string', doc: '发送方系统代码' },
    //             { name: 'requestType', type: 'string', doc: '请求操作类型' },
    //             { name: 'requestFlag', type: 'string', doc: '消息类型，0：请求，1：回复，2：ack' },
    //             { name: 'timestamp', type: 'string', doc: '请求操作时间' },
    //             { name: 'param', type: [{ type: 'map', values: 'string' }, 'null' ], doc: '系统级别扩展参数' },
    //             { name: 'payload', type: 'bytes', doc: '业务数据' },
    //         ],
    //     }
    // };

    return config;
};
