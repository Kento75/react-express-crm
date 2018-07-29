'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {});
  
    User.generateHash = function generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    };
    
    User.prototype.validPassword = function validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    };
    
    return User;
};
