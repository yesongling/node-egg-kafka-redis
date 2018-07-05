module.exports = app => {
    const {INTEGER, STRING} = app.Sequelize;
// const Sequelize = app.Sequelize;
    const People = app.model.define('People', {
        name: {
            type: STRING(20),
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        tableName: 'luckgays',
        timestamps: false,
    });
    return People;
}