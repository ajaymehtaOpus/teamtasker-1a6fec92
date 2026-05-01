const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Project model definition
const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    manager_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users', // name of Target model
            key: 'id', // key in Target model that we're referencing
        },
        allowNull: false,
    }
}, {
    tableName: 'projects',
    timestamps: true,
});

// Task model definition
const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    project_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Project,
            key: 'id',
        },
        allowNull: false,
    },
    assigned_to: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        allowNull: true,
    }
}, {
    tableName: 'tasks',
    timestamps: true,
});

// Associations
Project.hasMany(Task, { foreignKey: 'project_id' });
Task.belongsTo(Project, { foreignKey: 'project_id' });

module.exports = { Project, Task };