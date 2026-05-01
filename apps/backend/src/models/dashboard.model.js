const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dashboard = sequelize.define('Dashboard', {
    totalTasks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    tasksInProgress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    tasksDone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'dashboard',
    timestamps: false
});

module.exports = Dashboard;