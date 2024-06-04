const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define("Categories", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Categories
}