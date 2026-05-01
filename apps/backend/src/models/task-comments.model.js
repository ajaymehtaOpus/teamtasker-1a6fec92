const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TaskComment = sequelize.define('TaskComment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tasks', // name of the target table
            key: 'id', // key in the target table that we're referencing
        },
        onDelete: 'CASCADE',
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // name of the target table
            key: 'id', // key in the target table that we're referencing
        },
        onDelete: 'CASCADE',
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'comments',
    timestamps: false,
});

module.exports = TaskComment;