const RoleBasedAccessControlService = require('../services/role-based-access-control.service');

class RoleBasedAccessControlController {
    static async getAllRoles(req, res) {
        try {
            const roles = await RoleBasedAccessControlService.getAllRoles();
            return res.status(200).json({ roles });
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving roles', error: error.message });
        }
    }

    static async assignRole(req, res) {
        const { userId, role } = req.body;
        try {
            await RoleBasedAccessControlService.assignRole(userId, role);
            return res.status(200).json({ message: 'Role assigned successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error assigning role', error: error.message });
        }
    }
}

module.exports = RoleBasedAccessControlController;