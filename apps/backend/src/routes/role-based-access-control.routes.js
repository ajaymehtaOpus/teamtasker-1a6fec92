const express = require('express');
const { checkRole } = require('../middlewares/auth.middleware');
const RoleBasedAccessControlController = require('../controllers/role-based-access-control.controller');

const router = express.Router();

// Route to get all roles
router.get('/roles', checkRole(['Admin']), RoleBasedAccessControlController.getAllRoles);

// Route to assign role to a user
router.post('/assign', checkRole(['Admin']), RoleBasedAccessControlController.assignRole);

module.exports = router;