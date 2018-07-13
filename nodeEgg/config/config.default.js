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

    config.kafkajs = {
        host : 'localhost:9092',
        sub : [
            {
                groupId : 'consumer-topic'+ new Date().valueOf(),
                topics: [
                    'topic_01'
                ],
                'topic_01-KEYS': [
                    'GET_TICKETS'
                ]
            }
        ],
        pub : {
            topics : [
                'topic_01'
            ],
            requireAcks: 1,
            ackTimeoutMs: 1000,
            partitionerType: 2,
            partition: 0,
            attributes: 0
        },
        env : 'dev',
        avroSchema: {}
    };

    return config;
};
